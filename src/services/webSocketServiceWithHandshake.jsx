import axios from 'axios';
import { API_BASE_URL } from './apis';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.notificationSocket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // ms base
    this.messageCallbacks = [];
    this.notificationCallbacks = [];
    this.statusCallbacks = [];
    this.typingCallbacks = [];
    this.readReceiptCallbacks = [];
    this.currentRoomId = null;
    this.wsToken = null;
  }

  // Token helpers
  getAuthToken() {
    let token = localStorage.getItem('access_token');
    if (!token) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          token = parsed?.access_token;
        } catch {}
      }
    }
    return token;
  }


  // Build WS URL from API_BASE_URL and path
  buildWsUrl(path) {
    let wsProtocol = 'ws:';
    let wsHost = 'localhost:8000';
    try {
      const base = new URL(API_BASE_URL);
      wsProtocol = base.protocol === 'https:' ? 'wss:' : 'ws:';
      wsHost = base.host;
    } catch {}
    return `${wsProtocol}//${wsHost}${path}`;
  }

  // Handshake against backend for WS token/url
  async performHandshake(roomId) {
    const token = this.getAuthToken();
    if (!token) throw new Error('Missing auth token');

    const res = await axios.post(
      `${API_BASE_URL}websocket/handshake/`,
      { room_id: roomId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.data?.success) throw new Error(res.data?.error || 'Handshake failed');

    this.wsToken = res.data.websocket_token;
    this.currentRoomId = roomId;
    return res.data;
  }

  // Connect to chat room
  async connectToChat(roomId) {
    const { token: handshakeToken } = await this.performHandshake(roomId).then((d) => ({ token: d.websocket_token, data: d }));

    // Prefer API base URL host for WS
    const wsPath = `/ws/chat/${roomId}/?token=${handshakeToken}`;
    const primaryUrl = this.buildWsUrl(wsPath, true);
    const altUrl = this.buildWsUrl(wsPath, false);

    return await this._openSocketWithFallback(primaryUrl, altUrl, (userInfo) => ({ userInfo }));
  }

  async _openSocketWithFallback(primaryUrl, fallbackUrl, _metaFactory) {
    return new Promise((resolve, reject) => {
      let attempt = 0;
      const urls = [primaryUrl, fallbackUrl];

      const tryOpen = () => {
        const url = urls[attempt] || urls[0];
        this.socket = new WebSocket(url);

        const onOpen = () => {
          this.reconnectAttempts = 0;
          this._emitStatus({ type: 'connection', status: 'connected' });
          cleanup();
          resolve({ success: true });
        };

        const onMessage = (event) => {
          try {
            console.log('[Service] Raw WebSocket event:', event);
            const data = JSON.parse(event.data);
            console.log('[Service] Parsed WebSocket data:', data);
            this._handleMessage(data);
          } catch (err) {
            console.error('[Service] Error parsing WebSocket message:', err, event);
          }
        };

        const onClose = (event) => {
          this._emitStatus({ type: 'connection', status: 'disconnected', code: event.code });
          cleanup();

          // auth error range (custom): 4400-4499
          if (event.code >= 4400 && event.code < 4500) {
            reject(new Error('WebSocket auth error'));
            return;
          }

          // fallback attempt
          if (attempt === 0 && fallbackUrl) {
            attempt = 1;
            tryOpen();
            return;
          }

          // regular reconnect
          this._scheduleReconnect();
        };

        const onError = () => {
          cleanup();
          if (attempt === 0 && fallbackUrl) {
            attempt = 1;
            tryOpen();
          } else {
            reject(new Error('WebSocket connection failed'));
          }
        };

        const cleanup = () => {
          if (!this.socket) return;
          this.socket.removeEventListener('open', onOpen);
          this.socket.removeEventListener('message', onMessage);
          this.socket.removeEventListener('close', onClose);
          this.socket.removeEventListener('error', onError);
        };

        this.socket.addEventListener('open', (...args) => {
          console.log('[Service] WebSocket connection opened:', ...args);
          onOpen(...args);
        });
        this.socket.addEventListener('message', onMessage);
        this.socket.addEventListener('close', (...args) => {
          console.log('[Service] WebSocket connection closed:', ...args);
          onClose(...args);
        });
        this.socket.addEventListener('error', (...args) => {
          console.error('[Service] WebSocket error:', ...args);
          onError(...args);
        });
      };

      tryOpen();
    });
  }

  async disconnectFromChat() {
    if (this.socket) {
      try { this.socket.close(); } catch {}
      this.socket = null;
    }
    const token = this.getAuthToken();
    if (token) {
      try {
        await axios.post(
          `${API_BASE_URL}websocket/disconnect/`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {}
    }
    this.currentRoomId = null;
    this.wsToken = null;
  }

  async getConnectionStatus() {
    const token = this.getAuthToken();
    if (!token) return null;
    try {
      const res = await axios.get(
        `${API_BASE_URL}websocket/status/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch {
      return null;
    }
  }

  connectToNotifications() {
    const token = this.getAuthToken();
    if (!token) return;
    const url = this.buildWsUrl(`/ws/notifications/?token=${token}`, true);
    this.notificationSocket = new WebSocket(url);

    this.notificationSocket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'notification') {
          this.notificationCallbacks.forEach((cb) => cb(data.notification));
        }
      } catch {}
    };
  }

  disconnectFromNotifications() {
    if (this.notificationSocket) {
      try { this.notificationSocket.close(); } catch {}
      this.notificationSocket = null;
    }
  }

  // Sending helpers
  sendMessage(content, replyTo = null) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'message', content, reply_to: replyTo }));
    }
  }

  sendTyping(isTyping) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'typing', is_typing: isTyping }));
    }
  }

  sendReadReceipt(messageId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'read_receipt', message_id: messageId }));
    }
  }

  // Listeners
  onMessage(cb) { this.messageCallbacks.push(cb); return () => this._off('messageCallbacks', cb); }
  onNotification(cb) { this.notificationCallbacks.push(cb); return () => this._off('notificationCallbacks', cb); }
  onUserStatus(cb) { this.statusCallbacks.push(cb); return () => this._off('statusCallbacks', cb); }
  onTyping(cb) { this.typingCallbacks.push(cb); return () => this._off('typingCallbacks', cb); }
  onReadReceipt(cb) { this.readReceiptCallbacks.push(cb); return () => this._off('readReceiptCallbacks', cb); }

  _off(key, cb) {
    this[key] = this[key].filter((x) => x !== cb);
  }

  _handleMessage(data) {
    console.log('hiii:', data);
    switch (data.type) {
      case 'message':
        // Accept both {type: 'message', message: {...}} and {type: 'message', ...fields}
        if (data.message) {
          console.log('[Service] Emitting message:', data.message);
          this.messageCallbacks.forEach((cb) => cb(data.message));
        } else {
          // Defensive: treat the rest of the payload as the message
          const { type, ...msg } = data;
          if (msg.id || msg.content) {
            console.log('[Service] Emitting message (defensive):', msg);
            this.messageCallbacks.forEach((cb) => cb(msg));
          }
        }
        break;
      case 'typing':
        this.typingCallbacks.forEach((cb) => cb(data));
        break;
      case 'read_receipt':
        this.readReceiptCallbacks.forEach((cb) => cb(data));
        break;
      case 'user_status':
        this.statusCallbacks.forEach((cb) => cb(data));
        break;
      default:
        break;
    }
  }

  _emitStatus(payload) {
    this.statusCallbacks.forEach((cb) => cb(payload));
  }

  _scheduleReconnect() {
    if (!this.currentRoomId || this.reconnectAttempts >= this.maxReconnectAttempts) return;
    this.reconnectAttempts += 1;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    this._emitStatus({ type: 'connection', status: 'reconnecting', attempt: this.reconnectAttempts });
    setTimeout(() => {
      this.connectToChat(this.currentRoomId).catch(() => {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
          this._emitStatus({ type: 'connection', status: 'failed' });
        }
      });
    }, delay);
  }

  // Status helpers
  isConnectedToChat() { return !!this.socket && this.socket.readyState === WebSocket.OPEN; }
  isConnectedToNotifications() { return !!this.notificationSocket && this.notificationSocket.readyState === WebSocket.OPEN; }
  getConnectionState() { return this.socket?.readyState ?? null; }
}

const webSocketService = new WebSocketService();
export default webSocketService;

import React from 'react';

const ProfileListSkeleton = ({ count = 6 }) => {
  return (
    <div className="profile-list-container">
      <div className="profile-list-grid">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="profile-card-modern" style={{ pointerEvents: 'none' }}>
            <div className="profile-card-header">
              <div className="profile-image-container">
                <div className="skeleton" style={{ width: 120, height: 120, borderRadius: '50%' }} />
              </div>
              <div className="profile-basic-info-modern" style={{ width: '100%' }}>
                <div className="skeleton skeleton-title" style={{ width: '60%' }} />
                <div className="skeleton" style={{ width: 80, height: 20, borderRadius: 8 }} />
                <div className="skeleton skeleton-text" style={{ width: '50%' }} />
              </div>
            </div>
            <div className="profile-card-body-modern">
              <div className="skeleton skeleton-text" style={{ width: '90%' }} />
              <div className="skeleton skeleton-text" style={{ width: '85%' }} />
              <div className="skeleton skeleton-text" style={{ width: '80%' }} />
            </div>
            <div className="profile-card-footer-modern">
              <div className="skeleton" style={{ width: '40%', height: 36, borderRadius: 10 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileListSkeleton; 
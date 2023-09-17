import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';


export  function capitalizeFirstLetter(string) {
    if (string != null) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

export  function getPlatformIcon(platform) {
    if (platform) {
      switch (platform.toLowerCase()) {
        case 'facebook':
          return <FontAwesomeIcon className='' icon={faFacebookSquare} />;
        case 'twitter':
          return <FontAwesomeIcon className='' icon={faTwitterSquare} />;
        case 'instagram':
          return <FontAwesomeIcon className='' style={{ color: "#C13584" }} icon={faInstagram} />;
        case 'linkedin':
          return <FontAwesomeIcon className='' icon={faLinkedin} />;
        case 'youtube':
          return <FontAwesomeIcon className='' style={{ color: "#CD201F" }} icon={faYoutube} />;
        case 'whatsapp':
          return <FontAwesomeIcon className='' style={{ color: "#075e54	" }} icon={faWhatsapp} />;
        default:
          return <FontAwesomeIcon icon={faFacebookSquare} />; // Default to Facebook icon
      }
    }

  };
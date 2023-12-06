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

  export function formatDateTimeToDateString(datetimeString) {
    const datetimeObject = new Date(datetimeString);

    // Extract date components
    const day = datetimeObject.getDate().toString().padStart(2, '0');
    const month = (datetimeObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = datetimeObject.getFullYear();

    // Create a date string in the format "DD-MM-YYYY"
    const dateString = `${day}-${month}-${year}`;

    return dateString;
}

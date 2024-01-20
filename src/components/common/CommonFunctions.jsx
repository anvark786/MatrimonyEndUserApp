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

export const calculateTimeElapsed = (timestamp) => {
  const currentTime = new Date();
  const actionTime = new Date(timestamp);
  const timeDifference = currentTime - actionTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(currentTime.getMonth() - actionTime.getMonth() + (12 * (currentTime.getFullYear() - actionTime.getFullYear())));
  const years = Math.floor(months/12);
  
  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};
 
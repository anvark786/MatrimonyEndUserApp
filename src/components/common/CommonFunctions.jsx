import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookSquare,
	faTwitterSquare,
	faInstagram,
	faLinkedin,
	faWhatsapp,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';


export function capitalizeFirstLetter(string) {
	if (string != null) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

export function getPlatformIcon(platform) {
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
				return <FontAwesomeIcon icon={faFacebookSquare} />;
		}
	}

};

export function formatDateTimeToDateString(datetimeString) {
	const datetimeObject = new Date(datetimeString);
	
	const day = datetimeObject.getDate().toString().padStart(2, '0');
	const month = (datetimeObject.getMonth() + 1).toString().padStart(2, '0'); 
	const year = datetimeObject.getFullYear();

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
	const years = Math.floor(months / 12);

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

export const handleFieldChangeOnDistrict = (name, value, stateData, renderCityOptions) => {
	console.log(name, value, stateData, renderCityOptions);
	let defaultCityOption = { value: "", label: "Select Taluk" }
	let cityOptions = [defaultCityOption]
	if (renderCityOptions) {
		cityOptions = renderCityOptions;
	}
	let defaultLocationOption = { value: "", label: "Select Village" };
	let locationOptions = [defaultLocationOption]
	if (name == 'district') {
		let filteredDistrict = stateData?.districts && stateData?.districts.filter((item) => item?.district == value)

		cityOptions.length = 0;
		cityOptions.push(defaultCityOption)
		if (filteredDistrict.length > 0) {
			filteredDistrict[0]?.subDistricts.map((item) => {
				cityOptions.push({
					value: item?.subDistrict,
					label: item?.subDistrict,
					villages: item?.villages
				})
			})
		}
	}
	else if (name == 'city') {
		console.log(cityOptions);
		let filteredCity = cityOptions && cityOptions.filter((item) => item?.value == value)
		console.log(filteredCity);
		locationOptions.length = 0;
		locationOptions.push(defaultLocationOption);
		filteredCity[0]?.villages.map((item) => {
			locationOptions.push({
				value: item,
				label: item
			})
		})
	}
	return { cityOptions, locationOptions }
}

export function buildAdvancedQueryParams(filteredData, itemsPerPage, page) {
	const queryParams = {
	  limit: itemsPerPage,
	  page: page,
	  basic: true,
	  age__lte: filteredData?.age?.max,
	  age__gte: filteredData?.age?.min,
	  height__lte: filteredData?.height?.max,
	  height__gte: filteredData?.height?.min,
	  weight__lte: filteredData?.weight?.max,
	  weight__gte: filteredData?.weight?.min,
	  complexion__in: filteredData?.complexion?.join(','),
	  blood_group: filteredData?.bloodGroup,
	  community__name__in: filteredData?.community?.join(','),
	  marital_status: filteredData?.maritalStatus,
	  educations__name: filteredData?.education,
	  physical_status: filteredData?.physicalStatus,
	  occupation__profession_type__in: filteredData?.professionType?.join(','),
	  family__financial_status__in: filteredData?.financialStatus?.join(','),
	  is_locked_photos: filteredData?.showUnlockedPhotos === true ? false : undefined,
	  is_locked_social_accounts: filteredData?.showUnlockedSocial === true ? false : undefined,
	  address__district: filteredData?.district,
	  address__city: filteredData?.city,
	  address__location: filteredData?.location,
	};
  
	const queryString = Object.entries(queryParams)
	  .filter(([key, value]) => value !== undefined) 
	  .map(([key, value]) => `${key}=${value}`)
	  .join('&');
  
	return queryString ? `?${queryString}` : '';
  }
  

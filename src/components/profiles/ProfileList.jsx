import React from 'react';
import '../../assets/styles/ProfileList.css'; // Import your custom CSS for styling
import { Link } from 'react-router-dom';
import {capitalizeFirstLetter} from '../common/CommonFunctions';

const ProfileList = ({ profiles }) => {
    const dummyPhotoURL = 'https://shreedestinations.com/wp-content/uploads/2018/08/dummy450x450.jpg'
    return (
        <div className="row profile-list">
            {profiles.map((profile, index) => (
                <Link key={index} to={`/profile/details/${profile?.uuid}`} className="col-md-5 profile-card m-3 profile-card-link">
                    <div className="row">
                        <div className="col-md-4 profile-image">
                            <img src={profile.profile_pic?profile?.profile_pic?.image:dummyPhotoURL} alt="Profile" />
                        </div>
                        <div className="col-md-8 profile-details">
                            <div className="profile-username">{profile?.name+"("+profile?.profile_id+")"}</div>
                            <div className="profile-age">{profile?.age}</div>
                            <div className="profile-location">{profile?.location}</div>
                            <div className="profile-religion">{profile?.religion}</div>
                            <div className="profile-education">{capitalizeFirstLetter(profile?.education)}</div>
                            <div className="profile-occupation">{profile?.profession}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProfileList;

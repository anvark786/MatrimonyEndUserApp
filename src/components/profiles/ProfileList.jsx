import React from 'react';
import '../../assets/styles/ProfileList.css'; // Import your custom CSS for styling
import { Link } from 'react-router-dom';

const ProfileList = ({ profiles }) => {
    return (
        <div className="row profile-list">
            {profiles.map((profile, index) => (
                <Link key={index} to={`/profile/details/${profile.uuid}`} className="col-md-5 profile-card m-3 profile-card-link">
                    <div className="row">
                        <div className="col-md-4 profile-image">
                            <img src={profile.image} alt="Profile" />
                        </div>
                        <div className="col-md-8 profile-details">
                            <div className="profile-username">{profile.username+"("+profile.profile_id+")"}</div>
                            <div className="profile-age">{profile.age}</div>
                            <div className="profile-location">{profile.location}</div>
                            <div className="profile-religion">{profile.religion}</div>
                            <div className="profile-education">{profile.education}</div>
                            <div className="profile-occupation">{profile.occupation}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProfileList;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ProfileRoutes from './ProfileRoutes';
import ProfileHomePage from '../../pages/Profile/ProfileHomePage';
import ProfileBasic from '../../pages/Profile/ProfileUpdate/ProfileBasic';
import EducationalDetails from '../../pages/Profile/ProfileUpdate/EducationalDetails';
import OccupationalDetails from '../../pages/Profile/ProfileUpdate/OccupationalDetails';
import FamilyDetails from '../../pages/Profile/ProfileUpdate/FamilyDetails';
import Address from '../../pages/Profile/ProfileUpdate/Address';
import Preferences from '../../pages/Profile/ProfileUpdate/Preferences';
import withAuth from '../auth/AuthComponent';
import withCompleteAuth from '../auth/CompletedSignupAuth';

import ProfileDetails from '../../pages/Profile/ProfileDetails';
import ManagePhotos from '../../pages/Profile/PhotoGallery/ManagePhotos';
import SocialMediaManagement from '../../pages/Profile/ManageSocialAccounts/SocialMediaManagement';
import SocialRequests from '../../pages/Profile/ManageSocialAccounts/SocialRequests';
import ProfileSearch from '../../pages/Profile/ProfileSearch';
import ManageHideProfile from '../../pages/Profile/ManageHideProfile';
import EditPassword from '../../pages/EditPassword/EditPassword';
import HomePage from '../../pages/HomePage';
import ForgotPassword from '../../pages/ForgotPassword';
import SubscriptionPlans from '../../pages/Profile/SubscriptionPlans/SubscriptionPlans';

const MainRoutes = () => {
  const ProtectedProfilePage = withCompleteAuth(ProfileHomePage)
  const ProtectedProfileBasic = withAuth(ProfileBasic)
  const ProtectedEducationalDetails = withAuth(EducationalDetails)
  const ProtectedOccupationalDetails = withAuth(OccupationalDetails)
  const ProtectedFamilyDetails = withAuth(FamilyDetails)
  const ProtectedAddress = withAuth(Address)
  const ProtectedPreferences = withAuth(Preferences)
  const ProtectedProfileDetails = withCompleteAuth(ProfileDetails)
  const ProtectedManagePhotos= withCompleteAuth(ManagePhotos)
  const ProtectedSocialMediaManagement= withCompleteAuth(SocialMediaManagement)
  const ProtectedSocialRequests= withCompleteAuth(SocialRequests)
  const ProtectedProfileSearch= withCompleteAuth(ProfileSearch)
  const ProtectedManageHideProfile= withCompleteAuth(ManageHideProfile)
  const ProtectedEditPassword = withAuth(EditPassword)
  const ProtectedSubscriptionPlans = withCompleteAuth(SubscriptionPlans)

  
  return (
    <Routes>
      {/* Routes accessible to all users */}
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />

     
       {/* Protected routes */}
      <Route exact path="/profile" element={<ProtectedProfilePage/>} />
      <Route exact path="/profile/update/basic-info" element={<ProtectedProfileBasic/>}/>
      <Route exact path="/profile/update/educational-info" element={<ProtectedEducationalDetails/>}/>
      <Route exact path="/profile/update/occupational-info" element={<ProtectedOccupationalDetails/>}/>
      <Route exact path="/profile/update/family-info" element={<ProtectedFamilyDetails/>}/>
      <Route exact path="/profile/update/address" element={<ProtectedAddress/>}/>
      <Route exact path="/profile/update/preferences" element={<ProtectedPreferences/>}/>
      <Route exact path="/profile/details/:uuid" element={<ProtectedProfileDetails/>}/>
      <Route exact path="/profile/manage-photos" element={<ProtectedManagePhotos/>}/>
      <Route exact path="/profile/manage-social" element={<ProtectedSocialMediaManagement/>}/>
      <Route exact path="/profile/handle-access-requests" element={<ProtectedSocialRequests/>}/>
      <Route exact path="/profile/search-profile" element={<ProtectedProfileSearch/>}/>
      <Route exact path="/profile/hide-profile" element={<ProtectedManageHideProfile/>} />
      <Route exact path="/profile/edit-password" element={<ProtectedEditPassword />} />
      <Route exact path="profile/subscription-plans" element={<ProtectedSubscriptionPlans />} />

    </Routes>
  );
};

export default MainRoutes;

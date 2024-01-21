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

import ProfileDetails from '../../pages/Profile/ProfileDetails';
import ManagePhotos from '../../pages/Profile/PhotoGallery/ManagePhotos';
import SocialMediaManagement from '../../pages/Profile/ManageSocialAccounts/SocialMediaManagement';
import SocialRequests from '../../pages/Profile/ManageSocialAccounts/SocialRequests';
import ProfileSearch from '../../pages/Profile/ProfileSearch';


const MainRoutes = () => {
  const ProtectedProfilePage = withAuth(ProfileHomePage)
  const ProtectedProfileBasic = withAuth(ProfileBasic)
  const ProtectedEducationalDetails = withAuth(EducationalDetails)
  const ProtectedOccupationalDetails = withAuth(OccupationalDetails)
  const ProtectedFamilyDetails = withAuth(FamilyDetails)
  const ProtectedAddress = withAuth(Address)
  const ProtectedPreferences = withAuth(Preferences)
  const ProtectedProfileDetails = withAuth(ProfileDetails)
  const ProtectedManagePhotos= withAuth(ManagePhotos)
  const ProtectedSocialMediaManagement= withAuth(SocialMediaManagement)
  const ProtectedSocialRequests= withAuth(SocialRequests)
  const ProtectedProfileSearch= withAuth(ProfileSearch)







  return (
    <Routes>
      {/* Routes accessible to all users */}
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
     

     
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




    </Routes>
  );
};

export default MainRoutes;

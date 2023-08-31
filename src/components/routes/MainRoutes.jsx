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


const MainRoutes = () => {
  const ProtectedProfilePage = withAuth(ProfileHomePage)
  const ProtectedProfileBasic = withAuth(ProfileBasic)
  const ProtectedEducationalDetails = withAuth(EducationalDetails)
  const ProtectedOccupationalDetails = withAuth(OccupationalDetails)
  const ProtectedFamilyDetails = withAuth(FamilyDetails)
  const ProtectedAddress = withAuth(Address)
  const ProtectedPreferences = withAuth(Preferences)
  const ProtectedProfileDetails = withAuth(ProfileDetails)



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

    </Routes>
  );
};

export default MainRoutes;

import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import ProfileHomePage from '../../pages/Profile/ProfileHomePage';

const ProfileRoutes = () => {
  return (
    <div>
      <h1>Profile Update</h1>
      <Routes>
        <Route path="/" component={ProfileHomePage} />
        {/* <Route path="/profile/update/education" component={DOBUpdate} /> */}
        {/* <Route path="/profile/update/occupation" component={HeightWeightUpdate} />
        <Route path="/profile/update/family-details" component={HeightWeightUpdate} />
        <Route path="/profile/update/address" component={ComplexionUpdate} />
        <Route path="/profile/update/preferences" component={ComplexionUpdate} />
        <Route path="/profile/update/photos" component={ComplexionUpdate} /> */}

      </Routes>
    </div>
  );
};

export default ProfileRoutes;

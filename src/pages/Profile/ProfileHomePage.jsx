import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import '../../assets/styles/Style.css';
import ProfileList from '../../components/profiles/ProfileList';
import { toast } from 'react-toastify';
import Footer from '../../components/common/Footer';
import callCommonInternalApiService from '../../services/callCommonInternalApiService';
import CustomizedPagination from '../../components/common/CustomizedPagination';
import { buildAdvancedQueryParams } from '../../components/common/CommonFunctions';
import ProfileListSkeleton from '../../components/profiles/ProfileListSkeleton';


const ProfileHomePage = () => {
  const [profileData, setProfileData] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [page, setPage] = useState(1);
  const [dataCount, setDataCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let itemsPerPage = 10;
  const totalPages = Math.ceil(dataCount / itemsPerPage);

  useEffect(() => {
    const basicFilter = JSON.parse(sessionStorage.getItem('profile_id'));
    const filtered_data = JSON.parse(sessionStorage.getItem('filteredData'));

    const queryParams = new URLSearchParams(window.location.search);
    let filtered = queryParams.get('filtered')
    if ((basicFilter?.profile_id || filtered_data?.age) && filtered == 'true') {
      handleSearch(basicFilter?.profile_id, filtered_data);
    }
    else {
      getProfileData();
    }
  }, [userData.profile_id, page]);

  const getProfileData = async () => {
    try {
      setIsLoading(true);
      let apiUrl = `profiles/${userData.profile_id}/matching_profiles/?page=${page}&limit=${itemsPerPage}&basic=true`
      const response = await callCommonInternalApiService(apiUrl, 'get');

      console.log('profile--data:', response);
      if (response) {
        setProfileData(response?.results)
        setDataCount(response?.count)
      }

    } catch (error) {
      toast.error("somthing went wrong!,try again..");

    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (profile_id, filtered_data) => {
    try {
      setIsLoading(true);
      let apiUrl = `profiles/`
      if (profile_id) {
        apiUrl += `search-by-id/?profile_id=` + profile_id
      }
      else if (filtered_data?.age) {
       let query_parames =  buildAdvancedQueryParams(filtered_data,itemsPerPage,page)
        apiUrl += query_parames
      }
      const response = await callCommonInternalApiService(apiUrl, 'get');
      console.log(response);
      if (response) {
        console.log('test1');
        if (response?.results) {
          setProfileData(response?.results)
          setDataCount(response?.count)         

        }
        else {
          console.log('t3');
          setProfileData(response)
        }
      }

    } catch (error) {
      console.log('t55');
      console.error('error:', error);
      toast.error(error[0])
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-page-container">
        <div className="profile-main-content">
          <div className="profile-content">
            {isLoading ? (
              <ProfileListSkeleton count={itemsPerPage} />
            ) : profileData&&profileData.length > 0 ? (
              <div>
                <ProfileList profiles={profileData} />
                <CustomizedPagination totalPages={totalPages} setPage={setPage} />
              </div>
            ) : (
              <p>no profile data found...</p>
            )}
          </div>
        </div>
        
        <div className="profile-sidebar">
          <Sidebar/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileHomePage;

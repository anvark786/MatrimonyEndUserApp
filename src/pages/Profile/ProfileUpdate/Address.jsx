import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import { toast } from 'react-toastify';
import { handleFieldChangeOnDistrict } from '../../../components/common/CommonFunctions';
import RenderOptions from '../../../components/common/RenderOptions';
import callCommonInternalApiService from '../../../services/callCommonInternalApiService';

const Address = () => {

    const profileData = JSON.parse(sessionStorage.getItem('profileData')) || {};
    const [saved,setSaved] = useState(profileData.address?true:false)

    const [renderCityOptions, setRenderCityOptions] = useState([{ value: "", label: "Select Taluk" }]);;
    const [renderLocationOptions, setRenderLocationOptions] = useState([{ value: "", label: "Select Village" }]);


    const { stateData, districtOptions } = RenderOptions();    

    
    useEffect(() => {
        if (address) {
            let state = require('../../../data/kerala.json');
            const updateOptions = (field) => {
                const { cityOptions, locationOptions } = handleFieldChangeOnDistrict(field, address[field], state, renderCityOptions);
                setRenderCityOptions(cityOptions);
                setRenderLocationOptions(locationOptions);
            };
            if (address.district) {
                updateOptions('district');
            }
            if (address.city) {
                updateOptions('city');
            }
        }
    }, []);

    const handleFieldChange = (name, value) => {
        if (name == 'district' || name == 'city') {
            const { cityOptions, locationOptions } = handleFieldChangeOnDistrict(name, value, stateData, renderCityOptions);
            setRenderCityOptions(cityOptions);
            setRenderLocationOptions(locationOptions);
        }
    }
    const fields = [
        { name: 'district', label: 'District', placeholder: 'Select District', type: "select", options: districtOptions },
        { name: 'city', label: 'Taluk', placeholder: 'Select Taluk', type: "select", options: renderCityOptions },
        { name: 'location', label: 'Village', placeholder: 'Select Village', type: "select", options: renderLocationOptions },
        { name: 'street', label: 'Street', placeholder: 'Enter street', type: "text" },
        { name: 'post_code', label: 'Post Code', placeholder: 'Enter Post Code', type: "number" },
        { name: 'address', label: 'Full Address', placeholder: 'Enter Full Address', type: "textarea" },

    ];

    const initialValues = {
        district: '',
        city: '',
        street: '',
        location: '',
        post_code: '',
        address: ''


    };
    
    const [address, setAddress] = useState(profileData.address || initialValues);


    const validationSchema = Yup.object({
        district: Yup.string().required('District is required'),
        city: Yup.string().required('Taluk is required'),
        street: Yup.string().required('Street is required'),
        location: Yup.string().required('Village is required'),
        post_code: Yup.string().required('Post Code is required'),
        address: Yup.string().required('Address is required'),

    });


    const handleSubmit = async (values) => {
        try {
            let method, url,message,form_data;

            [method, url,message,form_data] = profileData.address ? ["patch", "/address/"+address?.id+"/","updated",values] : ["post", "/address/","saved",{...values,"profile":profileData?.id}];
      
            const response = await callCommonInternalApiService(url,method,form_data)
            if (response) {
                setSaved(true)
                sessionStorage.setItem('profileData', JSON.stringify({...profileData,address:response}));
                toast.success(`${message} successfully`);

            }
        } catch (error) {
            toast.error("somthing went wrong!,try again..");

        }
    };


    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={3} style={{ backgroundColor: "#f4f4f4" }}>
                        <Sidebar />
                    </Col>
                    <Col md={9} className="profile-content">
                        <h2 className='mb-4'>Address</h2>
                        <div>
                            <ProfileForm
                                fields={fields}
                                initialValues={address}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                saved={saved}
                                url="/profile/update/preferences"
                                urlBack="/profile/update/family-info"
                                onFieldChange={handleFieldChange}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Address;

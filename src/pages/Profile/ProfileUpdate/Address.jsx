import React, { useState,useEffect } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import profileUpdateService from '../../../services/profileUpdateService';
import { toast } from 'react-toastify';

const Address = () => {

    const [saved,setSaved] = useState(false)
    const [stateData,setStateData] = useState({})

    useEffect(() => {
        setStateData(require('../../../data/kerala.json'))
      }, []);
      let districtOptions = [{value:"",label:"Select District"}]
      stateData?.districts&&stateData?.districts.map((item)=>{
        districtOptions.push({
            value:item?.district,
            label:item?.district
        })
      })
      let cityOptions = [{value:"",label:"Select Taluk"}]
      let locationOptions = [{value:"",label:"Select Village"}]

    const handleFieldChange = (name,value)=>{
        if(name=='district'){
            let filteredDistrict = stateData?.districts&&stateData?.districts.filter((item)=>item?.district == value)
            cityOptions.length = 0;
            if(filteredDistrict){
                filteredDistrict[0].subDistricts.map((item)=>{
                    cityOptions.push({
                    value:item?.subDistrict,
                    label:item?.subDistrict,
                    villages:item?.villages
                    })
                })
            }
        }
        else if(name=='city'){
            let filteredCity = cityOptions&&cityOptions.filter((item)=>item?.value == value)
            console.log(filteredCity);
            locationOptions.length = 0;
            filteredCity[0].villages.map((item)=>{
                locationOptions.push({
                    value:item,
                    label:item
                })
            })
        }

    }

    const fields = [
        { name: 'district', label: 'District', placeholder: 'Select District', type: "select", options: districtOptions},
        { name: 'city', label: 'Taluk', placeholder: 'Select Taluk', type: "select",options: cityOptions },
        { name: 'location', label: 'Village', placeholder: 'Select Village', type: "select",options:locationOptions},
        { name: 'street', label: 'Street', placeholder: 'Enter street', type: "text"},        
        { name: 'post_code', label: 'Post Code', placeholder: 'Enter Post Code', type: "number"},
        { name: 'address', label: 'Full Address', placeholder: 'Enter Full Address', type: "textarea"},

    ];

    const initialValues = {
        district: '',
        city: '',
        street: '',
        location: '',
        post_code: '',
        address:''


    };

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
          const response = await profileUpdateService.createAddress(values);
          console.log('profile--save:', response);
          if(response){
            setSaved(true)
            toast.success("Saved successfully");
          }
          
          // Redirect or perform any other action after successful login
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
                            initialValues={initialValues}
                            validationSchema={validationSchema} 
                            onSubmit={handleSubmit}
                            saved={saved}
                            url="/profile/update/preferences"
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

import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import ProfileForm from '../../../components/profiles/ProfileForm';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';
import { toast } from 'react-toastify';
import callCommonInternalApiService from '../../../services/callCommonInternalApiService';

const EducationalDetails = () => {
    const [saved, setSaved] = useState(false);
    const profileData = JSON.parse(sessionStorage.getItem('profileData')) || {};
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const educationOptions = [
        { label: 'Select Highest Education', value: '' },
        { label: 'SSLC', value: 'sslc' },
        { label: 'Plus Two', value: 'pls_two' },
        { label: 'Bachelor Degree', value: 'degree' },
        { label: 'Master Degree', value: 'pg' },
    ];

    const initialEducation = {
        name: '',
        institution: '',
        details: '',
    };

    const [educationList, setEducationList] = useState(profileData.education || [initialEducation]);

    const fields = [
        { name: 'name', label: 'Education', placeholder: 'Select Highest Education', type: "select", options: educationOptions },
        { name: 'institution', label: 'Institution Name', placeholder: 'Enter Institution Name', type: "text" },
        { name: 'details', label: 'Institution Details', placeholder: 'Example: address...etc', type: "textarea" },
    ];

    const validationSchema = Yup.object().shape({
        educationList: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Highest Education is required'),
                institution: Yup.string().required('Institution is required'),
                details: Yup.string(),
            })
        )
    });

    useEffect(() => {
        if (profileData.education) {
            setSaved(true)
            setEducationList(profileData.education);
        }
        console.log(userData?.profile_id, 'userData in EducationalDetails');

    }, []);

    const handleSubmit = async (values) => {
        try {
            const method = "post";
            const url = `/educations/`;
            const payload = {
                educationList: JSON.stringify(values.educationList),
                profile_id: userData.profile_id ? userData.profile_id : ''
            };
            const response = await callCommonInternalApiService(url, method, payload);

            if (response) {
                setSaved(true);
                let message = profileData?.education ? "Updated" : "Saved"
                toast.success(`${message} successfully`);
                sessionStorage.setItem('profileData', JSON.stringify({ ...profileData, education: response }));

            }
        } catch (error) {
            toast.error("Something went wrong, try again.");
        }
    };

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={8} className="profile-content">
                        <h2 className='mb-4'>Educational Details</h2>
                        <ProfileForm
                            fields={fields}
                            initialValues={{ educationList }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            saved={saved}
                            url="/profile/update/occupational-info"
                            urlBack="/profile/update/basic-info"
                            isEducation={true}
                            profileId={userData?.profile_id || ''}
                        />
                    </Col>
                    <Col md={3} style={{ backgroundColor: "#f4f4f4" }}>
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EducationalDetails;

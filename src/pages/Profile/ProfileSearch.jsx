import React, { useState } from 'react';
import { Tab, Tabs, Form, Button, Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';
import callCommonInternalApiService from '../../services/callCommonInternalApiService';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState('basic');
    const [profileId, setProfileId] = useState(null);
    const [advancedSearchData, setAdvancedSearchData] = useState({
        age: { min: '', max: '' },
        height: { min: '', max: '' },
        complexion: [],
        bloodGroup: '',
        community: [],
        maritalStatus: '',
        physicalStatus: '',
        isLockedPhotos: false,
        isLockedSocialAccounts: false,
        educations: '',
        occupation: '',
        address: {
            district: '',
            city: '',
            location: '',
        },
        familyFinancialStatus: '',
    });
    const navigate = useNavigate();

    const handleSearchSubmit = async () => {
        sessionStorage.setItem('filteredData', JSON.stringify({ profile_id: profileId }));
        navigate('/profile/?filtered=true');
    };

    const searchValidationSchema = Yup.object({
        profile_id: Yup.string().required('Profile id is required'),
    });

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={3} style={{ backgroundColor: "#f4f4f4" }}>
                        <Sidebar />
                    </Col>
                    <Col md={9} className="profile-content">
                        <Container fluid>
                            <Tabs
                                id="search-tabs"
                                activeKey={activeTab}
                                onSelect={(key) => setActiveTab(key)}
                                transition={false}
                            >
                                <Tab eventKey="basic" title="Search with Profile ID">
                                    <Formik initialValues={{
                                        profile_id: profileId
                                    }} validationSchema={searchValidationSchema} onSubmit={handleSearchSubmit}>
                                        {({
                                            handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            values,
                                            touched,
                                            isValid,
                                            errors,
                                        }) => (
                                            <Form noValidate onSubmit={handleSubmit} className='pt-4 text-start'>
                                                <Form.Group as={Row} controlId="formBasicId">
                                                    <Form.Label column sm="2" className='text-start fw-light'>
                                                        Profile ID
                                                    </Form.Label>
                                                    <Col sm="6">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Profile id here"
                                                            onChange={
                                                                (e) => {
                                                                    setProfileId(e.target.value)
                                                                    handleChange(e)
                                                                }
                                                            }
                                                            name="profile_id"
                                                            isInvalid={touched.profile_id && errors.profile_id}
                                                        />
                                                        <Form.Control.Feedback type="invalid">{errors.profile_id}</Form.Control.Feedback>
                                                    </Col>
                                                    <Col sm={2}>
                                                        <Button variant="danger" type="submit">
                                                            Search
                                                        </Button>
                                                    </Col>
                                                </Form.Group>

                                            </Form>)}
                                    </Formik>
                                </Tab>
                                <Tab eventKey="advanced" title="Advanced Search">
                                    <Form className='pt-4'>
                                        <Form.Group as={Row} controlId="formAdvancedAge">
                                            <Form.Label column sm="2" className='text-start fw-light'>
                                                Age Range
                                            </Form.Label>
                                            <Col sm="4" className='mb-2'>
                                                <Form.Control
                                                    as="select"
                                                    value={advancedSearchData.age.min}
                                                    onChange={(e) =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            age: { ...advancedSearchData.age, min: e.target.value },
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Min Age</option>
                                                </Form.Control>
                                            </Col>
                                            <Col sm="4" className='mb-2'>
                                                <Form.Control
                                                    as="select"
                                                    value={advancedSearchData.age.max}
                                                    onChange={(e) =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            age: { ...advancedSearchData.age, max: e.target.value },
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Max Age</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formAdvancedHeight">
                                            <Form.Label column sm="2" className='text-start fw-light'>
                                                Height Range
                                            </Form.Label>
                                            <Col sm="4" className='mb-2'>
                                                <Form.Control
                                                    as="select"
                                                    value={advancedSearchData.height.min}
                                                    onChange={(e) =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            height: { ...advancedSearchData.height, min: e.target.value },
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Min Height</option>
                                                    {/* Add height options here */}
                                                </Form.Control>
                                            </Col>
                                            <Col sm="4" className='mb-2'>
                                                <Form.Control
                                                    as="select"
                                                    value={advancedSearchData.height.max}
                                                    onChange={(e) =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            height: { ...advancedSearchData.height, max: e.target.value },
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Max Height</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formAdvancedComplexion">
                                            <Form.Label column sm="2" className='text-start fw-light'>
                                                Complexion
                                            </Form.Label>
                                            <Col sm="10" className='mb-2'>
                                                <Row>
                                                    {['Very Fair', 'Fair', 'Wheatish', 'Dark'].map((option) => (
                                                        <Col md={2}>
                                                            <Form.Check
                                                                key={option}
                                                                label={option}
                                                                type="checkbox"

                                                                checked={advancedSearchData.complexion.includes(option)}
                                                                onChange={(e) => {
                                                                    const updatedComplexion = e.target.checked
                                                                        ? [...advancedSearchData.complexion, option]
                                                                        : advancedSearchData.complexion.filter((item) => item !== option);
                                                                    setAdvancedSearchData({
                                                                        ...advancedSearchData,
                                                                        complexion: updatedComplexion,
                                                                    });
                                                                }}
                                                            />
                                                        </Col>
                                                    ))}
                                                </Row>

                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formAdvancedBloodGroup">
                                            <Form.Label column sm="2" className='text-start fw-light'>
                                                Blood Group
                                            </Form.Label>
                                            <Col sm="4" className='mb-2'>
                                                <Form.Control
                                                    as="select"
                                                    value={advancedSearchData.bloodGroup}
                                                    onChange={(e) =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            bloodGroup: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Blood Group</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formAdvancedCommunity">
                                            <Form.Label column sm="2" className='text-start fw-light'>
                                                Community
                                            </Form.Label>
                                            <Col sm="4" className='mb-2'>
                                                <Form.Control
                                                    as="select"
                                                    value={advancedSearchData.height.max}
                                                    onChange={(e) =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            height: { ...advancedSearchData.height, max: e.target.value },
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Community</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formAdvancedMaritalStatus">
                                            <Form.Label column sm="2" className='text-start fw-light'>
                                                Marital Status
                                            </Form.Label>
                                            <Col sm="4" className='mb-2'>
                                                <Form.Control
                                                    as="select"
                                                    value={advancedSearchData.maritalStatus}
                                                    onChange={(e) =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            maritalStatus: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Marital Status</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formAdvancedPhysicalStatus">
                                            <Form.Label column sm="2" className='text-start fw-light'>
                                                Physical Status
                                            </Form.Label>
                                            <Col sm="4" className='mb-2'>
                                                <Form.Control
                                                    as="select"
                                                    value={advancedSearchData.physicalStatus}
                                                    onChange={(e) =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            physicalStatus: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Physical Status</option>
                                                </Form.Control>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formAdvancedIsLockedPhotos">
                                            <Form.Label column sm="6" className='text-start fw-light'>
                                                Show only unloacked photo profiles
                                            </Form.Label>
                                            <Col sm="2">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="isLockedPhotos"
                                                    checked={advancedSearchData.isLockedPhotos}
                                                    onChange={() =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            isLockedSocialAccounts: true,
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formAdvancedIsLockedSocialAccounts">
                                            <Form.Label column sm="6" className='text-start fw-light'>
                                                Show only unloacked social profiles
                                            </Form.Label>
                                            <Col sm="2">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="isLockedSocialAccounts"
                                                    checked={advancedSearchData.isLockedSocialAccounts}
                                                    onChange={() =>
                                                        setAdvancedSearchData({
                                                            ...advancedSearchData,
                                                            isLockedSocialAccounts: true,
                                                        })
                                                    }
                                                />
                                            </Col>
                                        </Form.Group>
                                        <div className='text-end'>
                                            <Button variant="danger" onClick={handleSearchSubmit} className=''>
                                                Search
                                            </Button>
                                        </div>

                                    </Form>
                                </Tab>
                            </Tabs>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default SearchPage;
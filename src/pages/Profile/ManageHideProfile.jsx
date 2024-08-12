import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import Footer from '../../components/common/Footer';
import CustomModal from '../../components/common/CustomModal';
import CustomToggleSwitch from '../../components/common/CustomToggleSwitch';
import callCommonInternalApiService from '../../services/callCommonInternalApiService';
import { toast } from 'react-toastify';

const ManageHideProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [isModalOpen, setModalOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(userData?.is_hidden);

    const handleToggleSwitch = () => {
        setModalOpen(true);
    };

    const hideOrUnhideProfile = async () => {
        try {
            let method, url;
            url = `profiles/${userData.profile_id}/hide-or-unhide-profile/`
            method = 'patch'
            const response = await callCommonInternalApiService(url, method)
            if (response) {
                setIsHidden(response?.is_hidden);
                toast.success(response?.message);
                const updatedUserData = {
                    ...userData,
                    is_hidden: response?.is_hidden
                };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
                setModalOpen(false)

            }
        } catch (error) {
            toast.error(error?.message);


        };
    }
    let customTitle = isHidden ? 'Unhide your profile' : 'Hide your profile'

    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={3} style={{ backgroundColor: "#f4f4f4" }}>
                        <Sidebar />
                    </Col>
                    <Col md={9} className="profile-content p-4">
                        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '80vh' }}>
                            <h4 className="mb-4 text-dark">Hide/UnHide Profile</h4>
                            <p className="mb-4 text-muted">
                                Use the toggle switch below to hide or unhide your profile from other users.
                            </p>
                            <CustomToggleSwitch isLocked={isHidden} handleToggleSwitch={handleToggleSwitch} title={customTitle}/>

                            <CustomModal
                                isOpen={isModalOpen}
                                onClose={() => setModalOpen(false)}
                                title="Confirm Action"
                                footer={
                                    <>
                                        <button
                                            onClick={() => setModalOpen(false)}
                                            className="btn btn-secondary me-2"
                                        >
                                            Cancel
                                        </button>
                                        <button onClick={() => hideOrUnhideProfile()} className="btn btn-success">
                                            Confirm
                                        </button>
                                    </>
                                }
                            >
                                <p>{`Are you sure you want to ${isHidden ? 'unhide' : 'hide'} your profile?`}</p>
                            </CustomModal>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default ManageHideProfile;

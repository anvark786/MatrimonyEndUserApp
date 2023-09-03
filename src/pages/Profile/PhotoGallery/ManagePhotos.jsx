import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import profileUpdateService from '../../../services/profileUpdateService';
import managePhotos from '../../../services/managePhotos';
import Sidebar from '../../../components/common/Sidebar';
import Header from '../../../components/common/Header';
import { Container, Row, Col } from 'react-bootstrap';
import PhotosSection from '../../../components/profiles/ManagePhotos/PhotosSection';

const ManagePhotos = ({ match }) => {
    const [images, setImages] = useState([]);
    const [imagesId,setImagesId] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        getPhotos();
    }, []);
    const getPhotos = async () => {
        let images = []
        let imagesIds = []
        try {
            const response = await profileUpdateService.getPhotos(userData?.profile_id);
            response.map((item)=>{
                images.push(item?.image)
                imagesIds.push(item?.id)
            })
            setImages(images)
            setImagesId(imagesIds)
        } catch (error) {
           console.log("No data found")
        }
    };
    const handleImageUpload = async (event, index) => {
        const selectedImage = event.target.files[0];    
        const updatedImages = [...images];
        console.log("selectedImage",selectedImage)
        if (selectedImage) {
            try {
                const response = await managePhotos.uploadImage({'image':selectedImage});
                console.log("respp",response);
                if (response) {                    
                    const imageUrl = response?.image;          
                    const updatedImages = [...images];
                    updatedImages[index] = imageUrl;
                    setImages(updatedImages);
                    toast.success("Photo Added Successfully!",{autoClose: 1000})

                  }
                } catch (error) {
                    toast.error('Error uploading image')                 
                }        
        }
      };
    const handleRemoveImage = async (index,image_pk) => {
        try {
            const response = await managePhotos.deleteImage(image_pk);
            console.log("respp",response);
            const updatedImages = [...images];
                updatedImages[index] = null;
                setImages(updatedImages);
                toast.success("Photo Deleted Successfully!",{autoClose: 1000})
            } catch (error) {
                toast.error('Error uploading image')                 
            }
       
    };

    const handleUpdateImage = async (event,index,image_pk) => {
        const selectedImage = event.target.files[0]; 
        try {
            const response = await managePhotos.updateImage({'image':selectedImage},image_pk);
            console.log("respp",response);
            if (response) {                    
                const imageUrl = response?.image;          
                const updatedImages = [...images];
                updatedImages[index] = imageUrl;
                setImages(updatedImages);
                toast.success("Photo Updated Successfully!",{autoClose: 1000})
              }
            } catch (error) {
                toast.error('Error uploading image')                 
            }
       
    };

    return (
       
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Sidebar />
                    </Col>
                    <Col md={9} className="profile-content">
                        <h4>Manage Photos</h4>
                        <PhotosSection images={images} handleImageUpload={handleImageUpload} handleRemoveImage={handleRemoveImage} handleUpdateImage={handleUpdateImage} imagesId={imagesId}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ManagePhotos;

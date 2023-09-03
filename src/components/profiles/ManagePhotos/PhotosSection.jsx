import React, { useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Image } from 'react-bootstrap';

const PhotosSection = ({ images,handleImageUpload,handleRemoveImage,handleUpdateImage,imagesId }) => {
    const fileInputs = useRef(Array(6).fill(null));


    const handleIconClick = (index) => {
        // Trigger a click on the hidden file input element
        fileInputs.current[index].click();
       
    };
    
    const placeholders = Array(6).fill(null);

    return (
        <div className="row">
            {placeholders.map((_, index) => (
                <Col md={4}>
                    <Card key={index} className="m-2">
                        <Card.Body>
                            {images[index] ? (
                                <Row className='manage-photos'>
                                    <Col md={8}>
                                        <Card.Img src={images[index]} alt={`Image ${index}`} />
                                    </Col>
                                    <Col md={4} className='text-center'>
                                        <FontAwesomeIcon
                                            icon={faEdit} // Edit icon
                                            className='text-primary me-3'
                                            onClick={() => handleIconClick(index)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                         <input
                                            type="file"
                                            id={`image-edit-${index}`}
                                            style={{ display: 'none' }}
                                            ref={(input) => (fileInputs.current[index] = input)}
                                            onChange={(event) => handleUpdateImage(event,index,imagesId[index])}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className='text-danger'
                                            onClick={() => handleRemoveImage(index,imagesId[index])}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Col>
                                </Row>
                            ) : (
                                <Row className='manage-photos'>
                                    <Col md={6}>
                                        <Card.Img src={'https://shreedestinations.com/wp-content/uploads/2018/08/dummy450x450.jpg'} alt={`Image ${index}`} className='me-4' />
                                    </Col>
                                    <Col md={4}>
                                        <div className='add-icon-wrapper'>
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className='text-success fw-bold mt-2'
                                                onClick={() => handleIconClick(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>

                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            id={`image-upload-${index}`}
                                            style={{ display: 'none' }}
                                            ref={(input) => (fileInputs.current[index] = input)}
                                            onChange={(event) => handleImageUpload(event, index)}
                                        />
                                    </Col>

                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </div>
    );
};

export default PhotosSection;

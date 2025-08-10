import React, { useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Image } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const PhotosSection = ({ images,handleImageUpload,handleRemoveImage,handleUpdateImage,imagesId }) => {
    const fileInputs = useRef(Array(6).fill(null));
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleIconClick = (index) => {
        fileInputs.current[index].click();
    };

    const placeholders = Array(6).fill(null);

    const sliderSettings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 400,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentIndex(next),
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 1 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };

    const lightboxSlides = placeholders.map((_, idx) => ({ src: images[idx] || '' })).filter(s => s.src);

    return (
        <div className="manage-photos-slider">
            <Slider {...sliderSettings}>
                {placeholders.map((_, index) => (
                    <div key={index} className="manage-slider-item">
                        <Card className="m-1">
                            <Card.Body className="p-2">
                                {images[index] ? (
                                    <div className='manage-slider-image-wrapper'>
                                        <img
                                            src={images[index]}
                                            alt={`Image ${index}`}
                                            className='manage-slider-image'
                                            onClick={() => { setCurrentIndex(index); setIsLightboxOpen(true); }}
                                            style={{ cursor: 'zoom-in' }}
                                        />
                                        <div className='manage-slider-overlay'>
                                            <FontAwesomeIcon
                                                icon={faEdit}
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
                                        </div>
                                    </div>
                                ) : (
                                    <div className='manage-add-tile' onClick={() => handleIconClick(index)}>
                                        <div className='manage-add-icon'>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                        <div className='manage-add-text'>Add photo</div>
                                        <input
                                            type="file"
                                            id={`image-upload-${index}`}
                                            style={{ display: 'none' }}
                                            ref={(input) => (fileInputs.current[index] = input)}
                                            onChange={(event) => handleImageUpload(event, index)}
                                        />
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Slider>

            <Lightbox
                open={isLightboxOpen}
                close={() => setIsLightboxOpen(false)}
                index={currentIndex}
                slides={lightboxSlides}
            />
        </div>
    );
};

export default PhotosSection;

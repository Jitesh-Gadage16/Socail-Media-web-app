// src/components/Stories/StoryViewer.js

import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import './StoryViewer.css';

const StoryViewer = ({ stories, currentIndex, onClose }) => {
    const settings = {
        initialSlide: currentIndex,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto p-4">
                <button
                    className="absolute top-4 right-4 text-white text-3xl z-50"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <Slider {...settings}>
                    {stories.map((story) => (
                        <div key={story._id} className="story-slide">
                            <div className="flex flex-col items-center justify-center h-full">
                                {story.mediaType === 'image' ? (
                                    <img src={story.media} alt="Story" className="max-h-screen" />
                                ) : (
                                    <video src={story.media} controls className="max-h-screen" />
                                )}
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                {story.user.name}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default StoryViewer;

import React from 'react';
import { Slide } from 'react-slideshow-image';
import image1 from './img/image1.jpg';
import image2 from './img/image2.jpg';
import image3 from './img/image3.jpg';
import './Slide.css';


const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}

const Slideshow = () => {
    return (
        <div className="containerSlide">
            <Slide {...properties}>
                <div className="each-slide">
                    <div>
                        <img src={image1} alt="image1" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={image2} alt="image2" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={image3} alt="image3" />
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Slideshow;
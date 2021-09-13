import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import feedback_1 from '../../images/feedback_1.png';
import feedback_2 from '../../images/feedback_2.png';
import feedback_3 from '../../images/feedback_3.png';
import feedback_4 from '../../images/feedback_4.png';
import feedback_5 from '../../images/feedback_5.png';
import "./CustomSlider.scss"

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


export default class CustomSlider extends Component {
    constructor() {
        super();
        this.state = {
            totalSlides: 5,
            currentSlide: 0
        };
    }
    componentDidMount() {
        setInterval(() => {
            let currentSlide = this.state.currentSlide + 1;
            if (currentSlide === 3) currentSlide = 0;
            this.setState({ currentSlide });
        }, 6000);
    }

    render() {
        return (

            <CarouselProvider
                naturalSlideWidth={1}
                naturalSlideHeight={0.4}
                totalSlides={this.state.totalSlides}
                currentSlide={this.state.currentSlide}
                id="home"
            > <h1 >Отзывы учеников</h1>
                <div className="carousel-inner">
                <Slider>

                    <Slide index={0}> <img src={feedback_1} className="slider-item" alt="" /></Slide>
                    <Slide index={1}> <img src={feedback_2} className="slider-item" alt=""/></Slide>
                    <Slide index={2}> <img src={feedback_3} className="slider-item" alt=""/></Slide>
                    <Slide index={3}> <img src={feedback_4} className="slider-item" alt=""/></Slide>
                    <Slide index={4}> <img src={feedback_5} className="slider-item" alt=""/></Slide>
                </Slider>
                </div>
            </CarouselProvider>
        );
    }
}

import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Link as WebLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoLarge from '../../img/logo-large.png';
import slideshow1 from '../../img/landing1.jpeg';
import slideshow2 from '../../img/landing2.jpeg';
import slideshow3 from '../../img/landing3.jpeg';
import slideshow4 from '../../img/landing4.jpeg';
import slideshow5 from '../../img/landing5.jpeg';
import LoginLogo from './LoginLogo'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated) {
       return <Redirect to='/dashboard' />
    }
    const images = [slideshow1, slideshow2, slideshow3, slideshow4, slideshow5]

    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());


    return (
        <ScrollContainer>
            <ScrollPage page={0}>
            <section className="landing">
                <AliceCarousel
                autoPlay
                autoPlayInterval="2500"
                autoPlayDirection="ltr"
                animationType="fadeout"
                fadeOutAnimation={true}
                animationDuration="900"
                disableButtonsControls={true}>
                {images.map((each, index) => <img key={index} src={each} className="sliderimg"/>)}
                </AliceCarousel>
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <img src={logoLarge} className="logo-image"/>
                        <h4>repiensa | renueva | revive</h4>
                        <i className="landing-arrow fas fa-chevron-down fa-5x" />
                    </div>
                </div>
            </section>
            </ScrollPage>

            <ScrollPage page={1}>
            <Animator animation={ZoomInScrollOut}>
                    <h1 className="x-large">PIDE TU CONCIERTO</h1>
                    <WebLink to="/concert/request" className="btn btn-primary">AQUÍ</WebLink>
            </Animator>
            <LoginLogo />
            </ScrollPage>
        </ScrollContainer>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

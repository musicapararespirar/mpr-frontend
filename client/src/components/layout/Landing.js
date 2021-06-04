import React, { Fragment, useRef } from 'react';
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
import NavbarDropdown from 'react-navbar-dropdown';
import landingTranslation from '../translation/landing';
import titlesTranslation from '../translation/titles';
import { Provider, Translate } from 'react-translated';
import ConcertInfo from '../information/Concerts';
import Contribute from '../information/Contribute';
import { Parallax, Background } from 'react-parallax';

const Landing = ({
    isAuthenticated,
    language: { languageCode }
}) => {
    const scrollRef = useRef(null);
    const executeScroll = () => scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    if(isAuthenticated) {
       return <Redirect to='/dashboard' />
    }
    const images = [slideshow1, slideshow2, slideshow3, slideshow4, slideshow5]
    const images_mobile = [slideshow2, slideshow3, slideshow4]
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn(), MoveOut());

    // Combine translation files
    const allTranslations = {
        ...landingTranslation,
        ...titlesTranslation
    }

    return (<Provider language={languageCode} translation={allTranslations}>
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
                infinite={true}
                disableButtonsControls={true}>
                {/* Different photos for mobile */}
                {window.innerWidth > 700 ? (
                    images.map((each, index) => <img key={index} src={each} className="sliderimg"/>)
                    ) : (
                    images_mobile.map((each, index) => <img key={index} src={each} className="sliderimg"/>))
                }
                </AliceCarousel>
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <img src={logoLarge} className="logo-image"/>
                        <h4><Translate text="repiensa" /> | <Translate text="renueva" /> | <Translate text="revive" /></h4>
                            <i ref={scrollRef} onClick={executeScroll} className="landing-arrow fas fa-chevron-down fa-5x hide-sm" />
                    </div>
                </div>
            </section>
            </ScrollPage>

            <ScrollPage page={1}>
            <Parallax className="landing-container"
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    bgImage={slideshow3}>
            <div className='inner-landing-container'>
            <h1 className="x-large"><Translate text="pideConcierto" /></h1>
            <Fragment>
                <NavbarDropdown>
                    <NavbarDropdown.Toggle className="reqmenu__item">
                    <NavbarDropdown.Open>
                        <div className="btn btn-primary"><Translate text="HERE" /></div>
                    </NavbarDropdown.Open>
                    <NavbarDropdown.Close>
                        <div className="btn btn-danger"><Translate text="HERE" /></div>
                    </NavbarDropdown.Close>
                    </NavbarDropdown.Toggle>
                    <NavbarDropdown.Menu className="reqmenu-menu">
                        <div className="reqmenu-menu__row">
                            <WebLink to='/request/personal'>
                                <NavbarDropdown.Item className="reqmenu-item">
                                    <div className="reqmenu-item__text"><Translate text="Personal" /></div>
                                </NavbarDropdown.Item>
                            </WebLink>
                            <WebLink to='/request/institution'>
                                <NavbarDropdown.Item className="reqmenu-item">
                                    <div className="reqmenu-item__text"><Translate text="Institution" /></div>
                                </NavbarDropdown.Item>
                            </WebLink>
                        </div>
                    </NavbarDropdown.Menu>
                </NavbarDropdown>
            </Fragment>
            <div ref={scrollRef} />
            <LoginLogo /></div></Parallax>
            </ScrollPage>

            <ScrollPage page={2}>
                <Parallax
                    className='landing-container'
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    bgImage={slideshow4}>
                        <ConcertInfo />
                </Parallax>
            </ScrollPage>

            <ScrollPage page={3}>
            <Parallax
                className='landing-container'
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                bgImage={slideshow5}>
                    <Contribute />
                </Parallax>
            </ScrollPage>
        </ScrollContainer></Provider>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    language: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    language: state.language
});

export default connect(mapStateToProps)(Landing);

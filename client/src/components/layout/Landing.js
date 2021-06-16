import React, { Fragment, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoLarge from '../../img/logo-large.png';
import slideshow1 from '../../img/landing1.jpeg';
import slideshow2 from '../../img/landing2.jpeg';
import slideshow3 from '../../img/landing3.jpeg';
import slideshow4 from '../../img/landing4.jpeg';
import slideshow5 from '../../img/landing5.jpeg';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import landingTranslation from '../translation/landing';
import titlesTranslation from '../translation/titles';
import { Provider, Translate } from 'react-translated';
import ConcertInfo from '../information/Concerts';
import Contribute from '../information/Contribute';
import { Parallax, Background } from 'react-parallax';
import PideConcierto from './PideConcierto';

const Landing = ({
    scrollRef,
    isAuthenticated,
    language: { languageCode }
}) => {
    const thisRef = useRef(scrollRef);
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
            <div id="concert-info" />
            <Parallax
                strength={500}
                bgImageStyle={{opacity: 0.2, height: '120vh'}}
                style={{boxShadow: "inset 0px 0px 50px -60px #000000, inset 0px -940px 90px -60px #000000"}}
                bgImage={slideshow3}>
                <section className="landing">
                <img src={logoLarge} className="logo-image"/>
                </section>

            <div id="concert-pide" />
            <Parallax
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    style={{background: '#4a2c75', clipPath: "polygon(0% 0%, 40% 0%, 50% 5%, 60% 0%, 100% 0%, 100% 100%, 0% 100%)"}}
                    >
                    <section className="inner-landing-container">
                    <div style={{ height: '50vw' }}><PideConcierto />
                    </div>
                    </section>
            </Parallax></Parallax>
                <Parallax
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    style={{boxShadow: "inset 0px 60px 50px -60px #000000, inset 0px -60px 50px -60px #000000"}}
                    bgImage={slideshow4}>
                    <section className="inner-landing-container">
                        <div style={{height: '50vw' }}><ConcertInfo /></div>
                    </section>
                </Parallax>
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                bgImage={slideshow5}>
                    <div style={{height:'50vw'}}>
                    <section className="inner-landing-container">
                        <Contribute />
                    </section>
                    </div>
                </Parallax>
        </Provider>
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

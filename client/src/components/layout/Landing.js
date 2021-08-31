import React, { Fragment, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import aboutTranslation from '../translation/about';
import landingTranslation from '../translation/landing';
import titlesTranslation from '../translation/titles';
import { Provider, Translate } from 'react-translated';
import Contribute from '../information/Contribute';
import { Parallax, Background } from 'react-parallax';
import PideConcierto from './PideConcierto';
import RequestPersonal from '../concerts/RequestPersonal';
import Supporters from '../information/Supporters';
import AboutUs from '../information/AboutUs';
import Impact from '../information/ImpactLanding';
import Seasons from '../information/Seasons';
import Donate from '../information/Donate';
import Footer from '../information/Footer';
import ImageGrid from '../information/ImageGrid';
// import ImageGallery from '../information/ImageGallery';
import { Textfit } from 'react-textfit';


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
        ...aboutTranslation,
        ...landingTranslation,
        ...titlesTranslation
    }

    return (<Provider language={languageCode} translation={allTranslations}>
            <div id="concert-info" />
            <Parallax
                strength={500}
                bgImageStyle={{opacity: 0.2, height: '70%'}}
                style={{boxShadow: "inset 0px 0px 50px -60px #000000, inset 0px -940px 90px -60px #000000"}}
                bgImage={slideshow3}>
                <section className="inner-landing-container" style={{
                    minHeight: '1vh',
//                     height:
                    marginBottom: '35vh',
                    textAlign: 'center',
                    display: 'block',
                    marginTop: '15vh'
                    }}>
                    <img src={logoLarge}/><br/>
                </section>
                <section className='wide-landing-container' style={{
                    textAlign: 'center',
                    backgroundPosition: 'center',
                    marginBottom: '10vh',
                    height: '1vh'
                }}>
                    <h1 style={{fontSize: '0.9rem'}}>ESTA ES LA SEMANA DE MÚSICA PARA RESPIRAR 24/7, UNETE A</h1>
                    <h1 style={{fontSize: '0.9rem'}}>NOSOTROS Y DISFRUTA DE MÚSICA EN VIVO DONDE SEA QUE ESTÉS</h1>
                </section>

            <div id="request-concert" />
            <Parallax
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    style={{background: '#4a2c75', clipPath: "polygon(0% 0%, 40% 0%, 50% 5%, 60% 0%, 100% 0%, 100% 100%, 0% 100%)"}}
                    >
                    <section className="landing-container">
                        <Router>
                        <Switch>
                            <Route exact path="/" component={PideConcierto} />
                            <Route exact path="/request/personal" component={RequestPersonal} />
                            </Switch>
                        </Router>
                    </section>
            </Parallax></Parallax>

            {/*<div id="gallery" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}>

                    <ImageGrid />
            </Parallax>*/}

            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#ea9d28'}}>
                    <section className="landing-container">
                        <Impact />
                    </section>
            </Parallax>

            <div id="about-us" />
                <Parallax
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    style={{
                        minHeight: '1050px'
                    }}
                    bgImage={slideshow4}>
                    <section className="landing-container">
                        <AboutUs />
                    </section>
                </Parallax>

            <div id="seasons" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#f2e9ec'}}>
                    <section className="landing-container">
                            <Seasons />
                    </section>
            </Parallax>

            <div id="donate" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#4a2c75'}}>
                    <section className="landing-container">
                    <Donate />
                    </section>
            </Parallax>

            <div id="supporters" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#ea9d28'}}>
                    <section>
                    <Supporters />
                    </section>
            </Parallax>
            <div id="footer" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                style={{background: '#4a2c75'}}>
                <section >
                    <Footer />
                </section>
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

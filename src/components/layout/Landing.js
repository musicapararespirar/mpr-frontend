import React, { Fragment, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoLarge from '../../img/logo-large.png';
import slideshow2 from '../../img/landing2.jpeg';
import slideshow4 from '../../img/landing4.jpeg';
import slideshow5 from '../../img/landing5.jpeg';
import aboutTranslation from '../translation/about';
import landingTranslation from '../translation/landing';
import titlesTranslation from '../translation/titles';
import { Provider, Translate } from 'react-translated';
import Contribute from '../information/Contribute';
import { Parallax, Background } from 'react-parallax';
import PideConcierto from './PideConcierto';
import Supporters from '../information/Supporters';
import Support from '../information/Support';
import AboutUs from '../information/AboutUs';
import Contact from '../information/Contact';
import Impact from '../information/Impact';
import Footer from '../information/Footer';
import ImageGrid from '../information/ImageGrid';
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
                bgImageStyle={
                    window.innerWidth > 1030 ? {
                        opacity: 0.2, height: '100vh', minWidth: '100vw'
                    } : {
                        opacity: 0.2, height: '88vh', minWidth: '80vw'
                    }}
                style={{
                    boxShadow: "inset 0px 0px 50px -60px #000000, inset 0px -940px 90px -60px #000000"}}
                bgImage={slideshow2}>
                <section className="inner-landing-container" style={{
                    marginBottom: '0vh',
                    marginTop: '40vh',
                    textAlign: 'center',
                    display: 'block',
                    }}>
                    <img src={logoLarge} style={{width: '70%'}}/><br/>
                </section>
                <section className='wide-landing-container' style={{
                    textAlign: 'center',
                    backgroundPosition: 'center',
                    marginBottom: '30px',
                    height: '1vh'
                }}>
                </section>

            {/* <div id="request" />
            <Parallax
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    style={{
                        background: '#4a2c75',
                        minHeight: '90vh',
                        clipPath: "polygon(0% 0%, 40vw 0%, 50vw 7vw, 60vw 0%, 100% 0%, 100% 100%, 0% 100%)"}}
                    >
                    <section className="landing-container" style={{minHeight: '100vh'}}>
                        <PideConcierto />
                    </section>
            </Parallax> */}
        </Parallax>
            <div id="impact" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#ea9d28'}}>
                    <section className="landing-container" style={{minHeight: '85vh'}}>
                        <Impact />
                    </section>
            </Parallax>

            <div id="about" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{
                    opacity: 0.2,
                    height: '80vh',
                    minWidth: '100vw',
                    minHeight: '120%'}}
                bgImage={slideshow4}>
                <section className="landing-container" style={{minHeight: '95vh'}}>
                    <AboutUs />
                </section>
            </Parallax>

            <div id="support" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#4a2c75'}}>
                    <section className="landing-container" style={{minHeight: '50vh'}}>
                    <Support />
                    </section>
            </Parallax>

            <div id="contact" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{
                    opacity: 0.2,
                    height: '80vh',
                    minWidth: '100vw',
                    minHeight: '120%'}}
                bgImage={slideshow5}>
                <section className="landing-container" style={{minHeight: '50vh'}}>
                    <Contact />
                </section>
            </Parallax>

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

import React, { Fragment, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoLarge from '../../img/logo-large.png';
// import slideshow1 from '../../img/landing1.jpeg';
// import slideshow2 from '../../img/landing2.jpeg';
import slideshow3 from '../../img/landing3.jpeg';
import slideshow4 from '../../img/landing4.jpeg';
import slideshow5 from '../../img/landing5.jpeg';
import aboutTranslation from '../translation/about';
import landingTranslation from '../translation/landing';
import titlesTranslation from '../translation/titles';
import { Provider, Translate } from 'react-translated';
import Contribute from '../information/Contribute';
import { Parallax, Background } from 'react-parallax';
import PideConcierto from './PideConcierto';
import RequestPersonal from '../concerts/RequestPersonal';
import Supporters from '../information/Supporters';
import Support from '../information/Support';
import AboutUs from '../information/AboutUs';
import Contact from '../information/Contact';
import Impact from '../information/Impact';
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
                    marginBottom: '27vh',
                    textAlign: 'center',
                    display: 'block',
                    marginTop: '15vh'
                    }}>
                    <img src={logoLarge}/><br/>
                </section>
                <section className='wide-landing-container' style={{
                    textAlign: 'center',
                    backgroundPosition: 'center',
                    marginBottom: '18vh',
                    height: '1vh'
                }}>
                    <h1 style={{fontSize: '0.9rem'}}><Translate text="thisisP1" /></h1>
                    <h1 style={{fontSize: '0.9rem'}}><Translate text="thisisP2" /></h1>
                </section>

            <div id="request" />
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

            {/*<div id="media" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}>

                    <ImageGrid />
            </Parallax>*/}
            <div id="impact" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#ea9d28'}}>
                    <section className="landing-container">
                        <Impact />
                    </section>
            </Parallax>

            <div id="about" />
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

            <div id="support" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#4a2c75'}}>
                    <section className="landing-container">
                    <Support />
                    </section>
            </Parallax>

            <div id="contact" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2, height: '110%'}}
                bgImage={slideshow5}>
                <section className="landing-container">
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

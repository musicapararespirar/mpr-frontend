import React, { Fragment, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Contribute from '../information/Contribute';
import { Parallax, Background } from 'react-parallax';
import PideConcierto from './PideConcierto';
import RequestPersonal from '../concerts/RequestPersonal';
import Gallery from '../information/Gallery';
import Seasons from '../information/Seasons';
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
                <section className="inner-landing-container" style={{
                    height: '20vw',
                    width: '30vw',
                    textAlign: 'center',
                    display: 'block',
                    marginTop: '50vh',
                    }}>
                    <Textfit mode='single' forceSingleModeWidth={true} max={200}>
                        <h1 className='mpr-header' style={{ fontFamily: 'sans-serif' }}>
                            <Translate text='MUSICA' />
                        </h1></Textfit>
                        <Textfit mode='single' forceSingleModeWidth={true} max={200}>
                        <h1 className='mpr-header' style={{ fontFamily: 'sans-serif' }}><Translate text="PARA" /> <Translate text="RESPIRAR" /></h1>
                    </Textfit>
                    <Textfit mode='single' forceSingleModeWidth={true} max={200}><h1 className="mpr-header gold" style={{ fontFamily: 'sans-serif' }}><i className='line-gold' style={{marginLeft: 0, marginRight: 0, width: '8rem'}}/>24/7<i className='line-gold' style={{marginLeft: 0, marginRight: 0, width: '8rem'}}/></h1></Textfit>
                </section>

            <div id="request-concert" />
            <Parallax
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    style={{background: '#4a2c75', clipPath: "polygon(0% 0%, 40% 0%, 50% 5%, 60% 0%, 100% 0%, 100% 100%, 0% 100%)"}}
                    >
                    <section className="inner-landing-container" style={{ height: '50vw' }}>
                        <Router>
                        <Switch>
                            <Route exact path="/" component={PideConcierto}/>
                            <Route exact path="/request/personal" component={RequestPersonal} />
                            </Switch>
                        </Router>
                    </section>
            </Parallax></Parallax>

            <div id="gallery" />
                <Parallax
                    strength={500}
                    blur={10}
                    bgImageStyle={{opacity: 0.2}}
                    style={{boxShadow: "inset 0px 60px 50px -60px #000000, inset 0px -60px 50px -60px #000000"}}
                    bgImage={slideshow4}>
                    <section className="inner-landing-container">
                        <div style={{height: '50vw' }}><Gallery /></div>
                    </section>
                </Parallax>

            <div id="seasons" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}
                    style={{background: '#f2e9ec'}}>
                    <section className="inner-landing-container">
                    <div style={{height:'50vw'}}>
                            <Seasons />
                    </div>
                    </section>
                </Parallax>

                        <div id="seasons" />
            <Parallax
                strength={500}
                blur={10}
                bgImageStyle={{opacity: 0.2}}>                    <section className="inner-landing-container">
                    <div style={{height:'50vw'}}>

                    </div>
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

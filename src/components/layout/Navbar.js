import React, { Fragment, useRef, useState, useEffect, useCallback } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import { setLanguage } from '../../actions/language';
import titlesTranslation from '../translation/titles';
import navbarTranslation from '../translation/navbar';
import { Provider, Translate } from 'react-translated';
import { HashLink, NavHashLink } from 'react-router-hash-link';


const Navbar = ({
    scrollRef,
    click,
    auth: {
        isAuthenticated,
        loading: authLoading
    },
    logout,
    setLanguage,
    language: {
        languageCode,
        loading: languageLoading
    }
}) => {
    const history = useHistory();
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1030);

    const updateMedia = () => { setDesktop(window.innerWidth > 1030); }
    const siteLocation = useLocation();
    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [])

    const [mobileNavbarIsOpen, setMobileNavbarIsOpen] = useState(false);
    const [languageSelected, setLanguageSelected] = useState(false);
    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldShowShadow, setShouldShowShadow] = useState(false);
    const MINIMUM_SCROLL = 80;
    const TIMEOUT_DELAY = 100;

    const shadowStyle = shouldShowShadow ? 'shadow' : '';
    const hiddenStyle = shouldHideHeader ? 'hidden' : '';
    const navbarLinks = [{title: 'ABOUT', link: '/#about'},
                         {title: 'REQUEST A CONCERT', link: '/#request'},
                         {title: 'IMPACT', link: '/#impact'},
//                          {title: 'MEDIA', link: '/#media'},
                         {title: 'SUPPORT US', link: '/#support'},
                         {title: 'CONTACT US', link: '/#contact'},
                         ]
    const desktopNavbar = (
        <Fragment>
           {navbarLinks.map((item, idx) => (
                <div className="dropdown"><button className="dropbtn">
                    <HashLink smooth to={item.link}>
                        <Translate text={item.title} />
                    </HashLink>
                </button>
                </div>
            ))}

            <div className="dropdown" style={{marginTop: '12px'}}>
                <button className="dropbtn"><Translate text="LANGUAGE" />
                <div style={{
                    position: 'relative',
                    fontSize: '0.7rem',
                    margin: 'auto',
                    left: 0,
                    right: 0
                }}>
                        <Translate text="currentLanguage"/>
                </div></button>

                <div className="dropdown-content">
                    <div onClick={() => setLanguage("en")} href="#!">
                        <a href="#!">English</a></div>
                    <div onClick={() => setLanguage("es")} href="#!">
                        <a href="#!">Español</a></div>
                    <div onClick={() => setLanguage("pt")} href="#!">
                        <a href="#!">Português</a></div>
                </div>
            </div>
        </Fragment>
    );

    function clickMenu() {
        if (window.scrollY > 0) {
            history.push('/');
            setMobileNavbarIsOpen(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
        setMobileNavbarIsOpen(!mobileNavbarIsOpen);
        }
    }

    function clickLink(input) {
        if (input === 'en') {
            setLanguage("en");
            setLanguageSelected(false);
        } else if (input === 'es') {
            setLanguage("es");
            setLanguageSelected(false);
        } else if (input === 'pt') {
            setLanguage("pt");
            setLanguageSelected(false);
        } else {
            history.push(input);
        }
        setMobileNavbarIsOpen(false);
    }
    const languageLinks = (
        <Fragment>
            <a onClick={() => clickLink("en")}>ENGLISH</a>
            <a onClick={() => clickLink("es")}>ESPAÑOL</a>
            <a onClick={() => clickLink("pt")}>PORTUGUÊS</a>
        </Fragment>
    );
    const mobileNavbar = (
        <Fragment>
        {mobileNavbarIsOpen ?
            <div className="topnav">
                <a style={{background: 'transparent'}} />
                    <div>
                     {navbarLinks.map((item, idx) => (
                        <a href={item.link} onClick={e => {setMobileNavbarIsOpen(false)}}><Translate text={item.title} /></a>
                        ))}
                        {languageSelected ? languageLinks :
                        <a onClick={() => setLanguageSelected(true)} href="#!">
                        <Translate text="LANGUAGE" /></a>}

                    </div>
                </div>
                : null }
            <i
            className="navmenu fas fa-bars fa-3x"
            onClick={ e => (clickMenu())} />

        </Fragment>);

    return <Provider language={languageCode} translation={navbarTranslation}>
        {isDesktop ? (
            <nav className={`navbar ${hiddenStyle}`}>
                { desktopNavbar }
            </nav>
                ) : (
            <nav>{ mobileNavbar }</nav>
        )}
    </Provider>
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    language: state.language
});

export default connect(mapStateToProps, { logout, setLanguage })(Navbar);

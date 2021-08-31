import React, { Fragment, useRef, useState, useEffect, useCallback } from 'react'
import { Link, useHistory,useLocation } from 'react-router-dom';
import { HashLink, NavHashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import NavbarDropdown from 'react-navbar-dropdown';
import { setLanguage } from '../../actions/language';
import titlesTranslation from '../translation/titles';
import navbarTranslation from '../translation/navbar';
import { Provider, Translate } from 'react-translated';
import useDocumentScrollThrottled from './useDocumentScrollThrottled';
import NavbarMenu from './NavbarMenu'

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

    const [mobileNavbarIsOpen, setMobileNavbarIsOpen] = useState(true);

    const scroll = (location) => {
        const section = document.querySelector( `#${location}` );
        if (section && siteLocation.pathname == '/') {
            console.log(section);
            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
        } else {
            console.log(location);
            history.push(`/#${location}`);
        }
    }

    const [shouldHideHeader, setShouldHideHeader] = useState(false);
    const [shouldShowShadow, setShouldShowShadow] = useState(false);
    const MINIMUM_SCROLL = 80;
    const TIMEOUT_DELAY = 100;

    useDocumentScrollThrottled(callbackData => {
        const { previousScrollTop, currentScrollTop } = callbackData;
        const isScrolledDown = previousScrollTop < currentScrollTop;
        const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

        setShouldShowShadow(currentScrollTop > 2);

        setTimeout(() => {
            setShouldHideHeader(isScrolledDown && isMinimumScrolled);
        }, TIMEOUT_DELAY);
    });
    const shadowStyle = shouldShowShadow ? 'shadow' : '';
    const hiddenStyle = shouldHideHeader ? 'hidden' : '';
    const navbarLinks = [{title: 'ABOUT', link: '/#about'},
                         {title: 'REQUEST A CONCERT', link: '/#request'},
                         {title: 'IMPACT', link: '/#impact'},
                         {title: 'MEDIA', link: '/#media'},
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
                    fontSize: '12px',
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

    const mobileNavbar = (
        <Fragment>
        <div className="topnav">
            <a className="active" style={{
                background: 'transparent',
                height: '65px'}} />
                {mobileNavbarIsOpen ?
                    <div>
                        <a href="#news">News</a>
                        <a href="#contact">Contact</a>
                        <a href="#about">About</a>
                    </div>
                : null }
            <div className='navmenu'
                onClick={ e => (setMobileNavbarIsOpen(!mobileNavbarIsOpen))}>
                <i className="fas fa-bars " />
            </div>
            </div>

        </Fragment>);

    return <Provider language={languageCode} translation={navbarTranslation}>
        {isDesktop ? (
            <nav className={`navbar ${hiddenStyle}`}>
                { desktopNavbar }
            </nav>
                ) : (
            <nav className={`navmenu ${hiddenStyle}`}>
                { mobileNavbar }
            </nav>
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

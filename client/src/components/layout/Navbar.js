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

    const desktopNavbar = (
        <Fragment>
            <NavbarMenu
                navTitle="ABOUT"
                navItems={[
                    {num: 1, text: 'Música para Respirar', link: '/about-us#mpr'},
                    {num: 2, text: 'La Sociedad', link: '/about-us#lasociedad'},
                    {num: 3, text: 'Team', link: '/about-us#team'},
                            ]}/>
            <NavbarMenu
                navTitle="REQUEST A CONCERT"
                navItems={[
                    {num: 1, text: 'Personal Concert', link: '/request#personal'},
                    {num: 2, text: 'Gift a Concert', link: '/request#gift'},
                    {num: 3, text: 'Institutional', link: '/request#institutional'},
                    {num: 4, text: 'Tips for your Concert', link: '/request#tips'},
                            ]}/>
            <NavbarMenu
                navTitle="IMPACT"
                navItems={[
                    {num: 1, text: 'Numbers', link: '/#impact-numbers'},
                    {num: 2, text: 'Map', link: '/#impact-map'},
                    {num: 3, text: 'Press', link: '/#impact-press'},
                    {num: 4, text: 'Reports', link: '/#impact-reports'},
                            ]}/>
            <NavbarMenu
                navTitle="MEDIA"
                navItems={[
                    {num: 1, text: 'Musicians', link: '/media#musicians'},
                    {num: 2, text: 'Pictures', link: '/media#pictures'},
                    {num: 3, text: 'Videos', link: '/media#videos'},
                            ]}/>
            <div className="dropdown"><button className="dropbtn">
                <HashLink smooth to="/#donate">
                    <Translate text="SUPPORT US" />
                </HashLink>
            </button>
            </div>
            <NavbarMenu
                navTitle="CONTACT US"
                navItems={[
                    {num: 1, text: 'Email', link: '/contact#email'},
                    {num: 2, text: 'Facebook', link: '/contact#facebook'},
                    {num: 3, text: 'Instagram', link: '/contact#instagram'},
                    {num: 4, text: 'Twitter', link: '/contact#twitter'},
                            ]}/>

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

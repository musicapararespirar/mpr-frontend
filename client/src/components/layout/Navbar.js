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

    const guestLinks = (
        <NavbarDropdown className="navmenu-icon">
            <NavbarDropdown.Toggle className="menu__item">
            <NavbarDropdown.Open>
                <i className="fas fa-bars fa-3x" />
            </NavbarDropdown.Open>
            <NavbarDropdown.Close>
                <i className="fa fa-times fa-3x" />
            </NavbarDropdown.Close>
            </NavbarDropdown.Toggle>
            <NavbarDropdown.Menu className="navmenu-menu">
                <div className="navmenu-menu__row">
                    <div onClick={e => (scroll('request-concert'))}>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__text"><Translate text="PIDE CONCIERTO" /></div>
                        </NavbarDropdown.Item>
                    </div>
                </div>
                <div className="navmenu-menu__row">
                    <div onClick={e => (scroll('about-us'))}>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__text"><Translate text="ACERCA DE" /></div>
                        </NavbarDropdown.Item>
                    </div>
                </div>
                <div className="navmenu-menu__row">
                    <div onClick={e => (scroll('seasons'))}>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__text"><Translate text="TEMPORADAS" /></div>
                        </NavbarDropdown.Item>
                    </div>
                </div>
                <div className="navmenu-menu__row">
                    <div onClick={e => (scroll('gallery'))}>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__text"><Translate text="GALERIA" /></div>
                        </NavbarDropdown.Item>
                    </div>
                </div>
                <div className="navmenu-menu__row">
                    <div onClick={e => (scroll('donate'))}>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__text"><Translate text="DONATE" /></div>
                        </NavbarDropdown.Item>
                    </div>
                </div>
            </NavbarDropdown.Menu>
        </NavbarDropdown>
    );

    const authLinks = (
        <NavbarDropdown className="navmenu-icon">
        <NavbarDropdown.Toggle className="menu__item">
        <NavbarDropdown.Open>
            <i className="fas fa-bars fa-3x" />
        </NavbarDropdown.Open>
        <NavbarDropdown.Close>
            <i className="fa fa-times fa-3x" />
        </NavbarDropdown.Close>
        </NavbarDropdown.Toggle>
        <NavbarDropdown.Menu className="navmenu-menu">
            <div className="navmenu-menu__row">
                <Link to='/about-us'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__text"><Translate text="About" /></div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/concerts'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__text"><Translate text="Concerts" /></div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/impact'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__text"><Translate text="Impact" /></div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/donate'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__text"><Translate text="Donate" /></div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/contribute'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__text"><Translate text="Contribute" /></div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/contact'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__text"><Translate text="Contact Us" /></div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/dashboard'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__text"><Translate text="Dashboard" /></div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <a onClick={logout} href="#!">
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__text"><Translate text="Logout" /></div>
                    </NavbarDropdown.Item>
                </a>
            </div>
        </NavbarDropdown.Menu>
        </NavbarDropdown>
    );

    const languageButtons = (
        <NavbarDropdown className="languagemenu-icon">
            <NavbarDropdown.Toggle className="languagemenu__item">
            <NavbarDropdown.Open>
                <div>{languageCode.toUpperCase()}</div>
            </NavbarDropdown.Open>
            <NavbarDropdown.Close>
                <div>{languageCode.toUpperCase()}</div>
            </NavbarDropdown.Close>
            </NavbarDropdown.Toggle>
            <NavbarDropdown.Menu className="languagemenu-menu">
                <a onClick={() => setLanguage("es")} href="#!">
                    <NavbarDropdown.Item className="languagemenu-item">
                        <div className="languagemenu-item__text">Español</div>
                    </NavbarDropdown.Item>
                </a>
                <a onClick={() => setLanguage("pt")} href="#!">
                    <NavbarDropdown.Item className="languagemenu-item">
                        <div className="languagemenu-item__text">Português</div>
                    </NavbarDropdown.Item>
                </a>
                <a onClick={() => setLanguage("en")} href="#!">
                    <NavbarDropdown.Item className="languagemenu-item">
                        <div className="languagemenu-item__text">English</div>
                    </NavbarDropdown.Item>
                </a>
            </NavbarDropdown.Menu>
        </NavbarDropdown>
    );
    const guestLinksBar = (
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

            <div className="dropdown">
                <button className="dropbtn"><Translate text="LANGUAGE" /></button>
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

    return <Provider language={languageCode} translation={navbarTranslation}>
        {isDesktop ? (
            <nav className={`navbar ${hiddenStyle}`}>
                {!authLoading && (<Fragment>{ guestLinksBar }</Fragment>)}
            </nav>
                ) : (
            <nav className={`navmenu ${hiddenStyle}`}>
                {!authLoading && ( <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
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

import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Spinner from '../layout/Spinner';
import NavbarDropdown from 'react-navbar-dropdown';
import { setLanguage } from '../../actions/language';
import titlesTranslation from '../translation/titles';
import { Provider, Translate } from 'react-translated';
import useDocumentScrollThrottled from './useDocumentScrollThrottled';

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
    const [isDesktop, setDesktop] = useState(window.innerWidth > 830);

    const updateMedia = () => { setDesktop(window.innerWidth > 830); }

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, [])

    const scroll = (location) => {
        const section = document.querySelector( `#${location}` );
        if (section) {
            section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
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
        <ul style={{ padding: '0px 4px' }}>
            <li><div onClick={e => {
                history.push('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>INICIO</div>
            </li>
            <li>
                <div onClick={e => (scroll('request-concert'))}>PIDE TU CONCIERTO</div>
            </li>
            <li>
                <div onClick={e => (scroll('gallery'))}>GALERIA</div>
            </li>
            <li>
                <div onClick={e => (scroll('seasons'))}>TEMPORADAS</div>
            </li>
            <li>
                <div onClick={e => (scroll('gallery'))}>ACERCA DE</div>
            </li>
            <li>
                <div onClick={e => (scroll('gallery'))}>DONACIONES</div>
            </li>
            {/*<li><Link to="/profiles">Musicians</Link></li>*/}
            {/*<li><Link to="/register">Register</Link></li>*/}
            {/*<li><Link to="/login">Login</Link></li>*/}
        </ul>
    );

    return <Provider language={languageCode} translation={titlesTranslation}>
        {isDesktop ? (
            <nav className={`navbar ${hiddenStyle}`}>
                {!authLoading && (<Fragment>{ guestLinksBar } {languageButtons}</Fragment>)}
                    </nav>
                      ) : (
            <nav className={`navmenu ${hiddenStyle}`}>
                {languageButtons}
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

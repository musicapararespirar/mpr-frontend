import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';
import NavbarDropdown from 'react-navbar-dropdown';
import LoginLogo from './LoginLogo'
import { Textfit } from 'react-textfit';


const PideConcierto = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...concertTranslation,
        ...titlesTranslation
    }

    const scrollRef = useRef(null);

    return <Fragment>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header' style={{ fontFamily: 'sans-serif' }}>
                <Translate text="pide" />
            </h1></Textfit>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header' style={{ fontFamily: 'sans-serif' }}><Translate text="concierto" /></h1></Textfit>
                <div style={{
                    fontFamily: 'sans-serif',
                    display: 'inline-block',
                    letterSpacing: '1px',
                    fontSize: '0.6rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 'lighter'
                }}>
                <i className='line-gold' />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div><br/>
            <Fragment>
                <NavbarDropdown>
                    <NavbarDropdown.Toggle className="reqmenu__item">
                    <NavbarDropdown.Open>
                        <div className="text-gold"><Translate text="HERE" /></div>
                    </NavbarDropdown.Open>
                    <NavbarDropdown.Close>
                        <div className="text-gold"><Translate text="HERE" /></div>
                    </NavbarDropdown.Close>
                    </NavbarDropdown.Toggle>
                    <NavbarDropdown.Menu className="reqmenu-menu">
                        <div className="reqmenu-menu__row">
                            <Link to='/request/personal'>
                                <NavbarDropdown.Item className="reqmenu-item">
                                    <div className="reqmenu-item__text"><Translate text="Personal" /></div>
                                </NavbarDropdown.Item>
                            </Link>
                            <Link to='/request/institution'>
                                <NavbarDropdown.Item className="reqmenu-item">
                                    <div className="reqmenu-item__text"><Translate text="Institution" /></div>
                                </NavbarDropdown.Item>
                            </Link>
                        </div>
                    </NavbarDropdown.Menu>
                </NavbarDropdown>
            </Fragment><br/><br/><br/><br/>
            <small style={{
                    fontFamily: ' sans-serif',
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1.3vw',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#ea9d28'
                }}>vive la música en casa</small>
            <LoginLogo /></Fragment>
}


PideConcierto.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(PideConcierto);

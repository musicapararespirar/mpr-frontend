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
            <h1 className="x-large">
                <Translate text="pide" /><br/>
                <Translate text="concierto" />
            </h1>
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
            </Fragment>
            <LoginLogo /></Fragment>
}


PideConcierto.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(PideConcierto);

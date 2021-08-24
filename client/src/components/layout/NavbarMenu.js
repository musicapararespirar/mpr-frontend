import React, { Fragment, useRef, useState, useEffect, useCallback } from 'react'
import { Link, useHistory,useLocation } from 'react-router-dom';
import { HashLink, NavHashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import NavbarDropdown from 'react-navbar-dropdown';
import navbarTranslation from '../translation/navbar';
import { Provider, Translate } from 'react-translated';
import useDocumentScrollThrottled from './useDocumentScrollThrottled';


const NavbarMenu = ({
    language: {
        languageCode,
        loading: languageLoading
    },
    navTitle,
    navItems
}) => {
    return <Provider language={languageCode} translation={navbarTranslation}>
            <div className="dropdown">
                <button className="dropbtn"><Translate text={navTitle} /></button>
                <div className="dropdown-content">
                {navItems.map((item, idx) => (
                    <HashLink
                        smooth
                        to={item.link}><Translate text={item.text} />
                    </HashLink>
                ))}
                </div>
            </div>

        </Provider>
}


const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps, { })(NavbarMenu);

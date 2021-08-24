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
            <NavbarDropdown>
                <NavbarDropdown.Toggle className="menu__item">
                <NavbarDropdown.Open>
                    <div><Translate text={navTitle} /></div>
                </NavbarDropdown.Open>
                <NavbarDropdown.Close>
                    <div className="navbar-selected"><Translate text={navTitle} /></div>
                </NavbarDropdown.Close>
                </NavbarDropdown.Toggle>
                <NavbarDropdown.CSSTransitionMenu
                    className="example1-dropdown-menu"
                    classNames="example1-dropdown-menu"
                    timeout={200}
                >
                {navItems.map( (item, idx) =>  (
                <NavbarDropdown.Item key={idx} className="example1-dropdown-menu-item">
                    <div className="example1-dropdown-menu-item__text">
                        <HashLink
                            style={{color: 'black'}}
                            activeStyle={{
                                color: 'black',
                                display: 'inline-block' }}
                            smooth
                            to={item.link}><Translate text={item.text} />
                        </HashLink>
                    </div>
                </NavbarDropdown.Item>))}

                </NavbarDropdown.CSSTransitionMenu>
            </NavbarDropdown>
        </Provider>
}


const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps, { })(NavbarMenu);

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import landingTranslation from '../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const Seasons = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...landingTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
        <div style={{
            maxWidth: '25rem',
            margin: 'auto',
            overflow: 'visible',
            marginTop: '1rem',
            marginBottom: '1rem',
            textAlign: 'center'
        }}>
            <small className='footer-container'>MÚSICA PARA RESPIRAR 24/7, 2021</small><br/>
            <small className='footer-container'><Translate text="graphicdesign" />: <a href="https://www.instagram.com/bear.brothers" target="_blank">Bear Brothers</a><br/> <Translate text="webdesign" />: <a href="https://evanjt.com" target="_blank">Evan Thomas</a></small>
            </div></Fragment>
            </Provider>
}

// Graphic Design: Bear Brothers, Web Design: Evan Thomas

Seasons.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Seasons);

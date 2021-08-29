import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import donateTranslation from '../translation/donate';
import titlesTranslation from '../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const Seasons = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...donateTranslation,
        ...titlesTranslation
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
            <small className='footer-container'><Translate text="designby" />: <a href="https://www.instagram.com/bear.brothers">Bear Brothers</a> <Translate text="and" /> <a href="https://evanjt.com">Evan Thomas</a></small>
            </div></Fragment>
            </Provider>
}


Seasons.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Seasons);

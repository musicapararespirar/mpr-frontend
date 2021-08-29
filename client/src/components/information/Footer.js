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
            <small style={{
                letterSpacing: '2.5px',
                fontSize: '0.6rem',
                lineHeight: 3,
                fontWeight: 500,
                color: 'white'
            }}>MÚSICA PARA RESPIRAR 24/7, 2021.</small>
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

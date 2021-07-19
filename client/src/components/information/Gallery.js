import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const Gallery = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...concertTranslation,
        ...titlesTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>
        <div className="inner-landing-container">

            <Textfit mode='single' forceSingleModeWidth={true}>
            <h1 className='mpr-header' style={{
                marginTop: '60%',
                textAlign: 'center',
                fontFamily: 'sans-serif'
            }}>
                <Translate text="About Us" />
            </h1></Textfit>
            </div></Fragment></Provider>
}


Gallery.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Gallery);

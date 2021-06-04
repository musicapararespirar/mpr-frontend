import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';

const ConcertAbout = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...concertTranslation,
        ...titlesTranslation
    }

    return <section className="inner-landing-container"><Provider language={languageCode} translation={allTranslations}>
    <Fragment>

            <p className="lead">
                <i className="fas fa-music"></i> <Translate text="Concerts" />
            </p>
        <Translate text="Description" /><br/>
        <br/>
        <div className="form-group social-input instagram">
            <a target="_blank" href="https://www.instagram.com/lasociedad.bo/">
                    <i className="small-container fab fa-instagram fa" /> lasociedad.bo<br/>
            </a>
            <a target="_blank" href="https://www.facebook.com/lasociedad.bo/">
                <i className="small-container fab fa-facebook fa" /> lasociedad.bo
            </a>
        </div>
            </Fragment></Provider></section>
}


ConcertAbout.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(ConcertAbout);

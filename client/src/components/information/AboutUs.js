import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../translation/about';
import titlesTranslation from '../translation/titles';

const AboutUs = ({
    language: { languageCode }
}) => {
    // Combine translation files
    const allTranslations = {
        ...aboutTranslation,
        ...titlesTranslation
    }
    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>
            <p className="lead">
            <i className="fas fa-music"></i> <Translate text="About Us" />
            </p>
            <p><Translate text="aboutDescriptionP1" /></p><br/>
            <p><Translate text="aboutDescriptionP2" /></p><br/>
            <p><Translate text="aboutDescriptionP3" /></p><br/>
            <h4><Translate text="About" /> La Sociedad</h4><br/>
            <p><Translate text="aboutLaSociedad" /></p><br/>
            </Fragment></Provider>
}

AboutUs.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps )(AboutUs);

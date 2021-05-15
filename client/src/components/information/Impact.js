import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Provider, Translate } from 'react-translated';
import impactTranslation from '../translation/impact';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';

const Impact = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...impactTranslation,
        ...titlesTranslation
    }
    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>
        <p className="lead">
            <i className="fas fa-music"></i> <Translate text="Impact" />
        </p>

        </Fragment></Provider>
}

Impact.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps)(Impact);

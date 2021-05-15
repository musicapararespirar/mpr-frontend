import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Provider, Translate } from 'react-translated';
import contactTranslation from '../translation/contact';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';

const Contact = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...contactTranslation,
        ...titlesTranslation
    }
    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>
            <p className="lead">
                <i className="fas fa-music"></i> <Translate text="Contact Us" />
            </p>

            </Fragment></Provider>
}

Contact.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps)(Contact);

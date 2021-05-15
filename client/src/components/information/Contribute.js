import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Provider, Translate } from 'react-translated';
import contributeTranslation from '../translation/contribute';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';

const Contribute = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...contributeTranslation,
        ...titlesTranslation
    }
    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>
        <section className="contribute">
        <p className="lead">
            <i className="fas fa-music"></i> <Translate text="Contribute" />
        </p>
        <p><Translate text="descriptionP1" /></p><br/>
        <p><Translate text="descriptionP2" /></p><br/>
        <p><Translate text="descriptionP3" /></p>
        </section>
        <Link to='donate' className="btn btn-primary my-1"><Translate text="Donate" /> US$10</Link>

        </Fragment></Provider>


}

Contribute.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps )(Contribute);

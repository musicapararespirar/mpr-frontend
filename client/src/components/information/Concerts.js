import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import translation from '../translation/concerts';
import { setLanguage } from '../../actions/language';
import PropTypes from 'prop-types';

const ConcertAbout = ({
    language: {
        languageCode,
        loading
    },
}) => {
    return <Provider language={languageCode} translation={translation}>
    <Fragment>
            <p className="lead">
                <i className="fas fa-music"></i> <Translate text="Concerts"></Translate>
            </p>
        <Translate text="ConcertDescription"></Translate><br/>
        <br/>
        <div className="form-group social-input instagram">
            <a target="_blank" href="https://www.instagram.com/lasociedad.bo/">
                    <i className="small-container fab fa-instagram fa" /> lasociedad.bo<br/>
            </a>
            <a target="_blank" href="https://www.facebook.com/lasociedad.bo/">
                <i className="small-container fab fa-facebook fa" /> lasociedad.bo
            </a>
        </div>
            </Fragment></Provider>;
}


ConcertAbout.propTypes = {
    setLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps, { setLanguage } )(ConcertAbout);

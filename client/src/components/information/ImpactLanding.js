import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import donateTranslation from '../translation/donate';
import titlesTranslation from '../translation/landing';
import navbarTranslation from '../translation/navbar';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const ImpactLanding = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...donateTranslation,
        ...titlesTranslation,
        ...navbarTranslation
    }
    const [featureSelected, setFeatureSelected] = useState(null);

    useEffect(() => {
        if (window.location.hash === '#impact-map') {
            setFeatureSelected(window.location.hash);
        }
        console.log(window.location.hash);
    }, [window.location.hash]);

    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
        <div className="inner-landing-container impact" style={{minHeight: '30vh'}}>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
                <h1 className='mpr-header'>
                    <Translate text="IMPACT" />
                </h1>
            </Textfit><br/>
            {console.log(window.location.hash)}
            {featureSelected ? (
                (featureSelected && featureSelected === '#impact-map') ? (
                    <Fragment>
                        <h1 style={{textAlign: 'center'}}>Under Construction!</h1>
                        <button onClick={e => (setFeatureSelected(null))}>
                            <i className="fas fa-long-arrow-alt-left" /> Back
                        </button>
                    </Fragment>
                ) : (
                    'somethingelse'
                )
            ) : (
                <Fragment>
                    <button onClick={e => (setFeatureSelected('#impact-map'))}>NUMBERS</button>
                    <button id='impact-map' onClick={e => (setFeatureSelected('#impact-map'))}>MAPS</button>
                    <button onClick={e => (setFeatureSelected('#impact-map'))}>PRESS</button>
                    <button onClick={e => (setFeatureSelected('#impact-map'))}>REPORTS</button>
                </Fragment>
            )}
            <br/><br/><br/>
            <small style={{
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#492b74'
                }}>cada historia cuenta...</small>
            </div></Fragment>
            </Provider>
}


ImpactLanding.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(ImpactLanding);

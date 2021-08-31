import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import donateTranslation from '../translation/donate';
import titlesTranslation from '../translation/landing';
import navbarTranslation from '../translation/navbar';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import Numbers from './impact/Numbers';
import UnderConstruction from './impact/UnderConstruction';

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


    const buttons = (
        <Fragment>
        <div className="inner-landing-container impact" style={{minHeight: '50vh'}}>
        <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header'>
                <Translate text="IMPACT" />
            </h1>
        </Textfit><br/>
            <button onClick={e => (setFeatureSelected('numbers'))}>NUMBERS</button>
            <button onClick={e => (setFeatureSelected('maps'))}>MAPS</button>
            <button onClick={e => (setFeatureSelected('press'))}>PRESS</button>
            <button onClick={e => (setFeatureSelected('reports'))}>REPORTS</button>
        <br/><br/><br/><br/><br/><br/>
            <small style={{
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#492b74'
                }}>cada historia cuenta...</small>
            </div>
        </Fragment>
    );
    const numbers = (
        <Fragment>
        <div className="inner-landing-container impact" style={{minHeight: '50vh'}}>
            <Numbers />
            <button onClick={e => (setFeatureSelected(null))}>
                <i className="fas fa-long-arrow-alt-left" /> Back
            </button>
        </div>
        </Fragment>
    );

    const maps = (
        <Fragment>
        <div className="inner-landing-container impact" style={{minHeight: '50vh'}}>
            <UnderConstruction />
            <button onClick={e => (setFeatureSelected(null))}>
                <i className="fas fa-long-arrow-alt-left" /> Back
            </button>
        </div>
        </Fragment>
    );

    const press = (
        <Fragment>
        <div className="inner-landing-container impact" style={{minHeight: '50vh'}}>
            <UnderConstruction />
            <button onClick={e => (setFeatureSelected(null))}>
                <i className="fas fa-long-arrow-alt-left" /> Back
            </button>
        </div>
        </Fragment>
    );

    const reports = (
        <Fragment>
        <div className="inner-landing-container impact" style={{minHeight: '50vh'}}>
            <UnderConstruction />
            <button onClick={e => (setFeatureSelected(null))}>
                <i className="fas fa-long-arrow-alt-left" /> Back
            </button>
        </div>
        </Fragment>
    );
    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>

            {!featureSelected ? buttons : null}
            {featureSelected && featureSelected === 'numbers' ? numbers : null}
            {featureSelected && featureSelected === 'maps' ? maps : null}
            {featureSelected && featureSelected === 'press' ? press : null}
            {featureSelected && featureSelected === 'reports' ? reports : null}

            </Fragment>
            </Provider>
}


ImpactLanding.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(ImpactLanding);

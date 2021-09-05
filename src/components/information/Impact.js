import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import supportTranslation from '../translation/support';
import impactTranslation from '../translation/impact';
import titlesTranslation from '../translation/landing';
import navbarTranslation from '../translation/navbar';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import Numbers from './impact/Numbers';
import Press from './impact/Press';
import UnderConstruction from './impact/UnderConstruction';

const ImpactLanding = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...supportTranslation,
        ...impactTranslation,
        ...titlesTranslation,
        ...navbarTranslation
    }
    const [featureSelected, setFeatureSelected] = useState(null);


    const backButton = (
        <Fragment>
            <button onClick={e => (setFeatureSelected(null))}>
                <i className="fas fa-long-arrow-alt-left" style={{alignItems: 'left'}}/> <Translate text="Back" />
            </button>
        </Fragment>
    );

    const buttons = (
        <Fragment>
        <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 style={{textAlign: 'center'}} className='mpr-header'>
                <Translate text="IMPACT" />
            </h1>
        </Textfit><br/><br/><br/>
            <button onClick={e => (setFeatureSelected('numbers'))}><Translate text="NUMBERS" /></button>
            <button onClick={e => (setFeatureSelected('maps'))}><Translate text="MAPS" /></button>
            <button onClick={e => (setFeatureSelected('press'))}><Translate text="PRESS" /></button>
            <button onClick={e => (setFeatureSelected('reports'))}><Translate text="REPORTS" /></button>
        <br/><br/><br/><br/>
        </Fragment>
    );
    const numbers = (
        <Fragment>
        <div className="inner-landing-container impact">
            <Numbers />
            {backButton}
        </div>
        </Fragment>
    );

    const maps = (
        <Fragment>
        <div className="inner-landing-container impact">
        <UnderConstruction />
            {backButton}
        </div>
        </Fragment>
    );

    const press = (
        <Fragment>
        <div className="wide-landing-container impact" style={{marginBottom: '10vh'}}>
        <Press />
            {backButton}
        </div>
        </Fragment>
    );

    const reports = (
        <Fragment>
        <div className="inner-landing-container impact">
            <UnderConstruction />
            {backButton}
        </div>
        </Fragment>
    );
    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
            <div className="inner-landing-container impact">
                {!featureSelected ? buttons : null}
            </div>
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

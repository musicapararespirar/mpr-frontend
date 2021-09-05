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
                <i className="fas fa-long-arrow-alt-left" /> <Translate text="Back" />
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
            <Numbers />
            {backButton}
        </Fragment>
    );

    const maps = (
        <Fragment>
            <UnderConstruction />
            {backButton}
        </Fragment>
    );

    const press = (
        <Fragment>
            <UnderConstruction />
            {backButton}
        </Fragment>
    );

    const reports = (
        <Fragment>

            <UnderConstruction />
            {backButton}
        </Fragment>
    );
    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
            <div className="inner-landing-container impact">
                {!featureSelected ? buttons : null}
                {featureSelected && featureSelected === 'numbers' ? numbers : null}
                {featureSelected && featureSelected === 'maps' ? maps : null}
                {featureSelected && featureSelected === 'press' ? press : null}
                {featureSelected && featureSelected === 'reports' ? reports : null}
            </div>
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

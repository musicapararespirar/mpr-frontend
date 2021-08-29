import React, { Fragment, useEffect } from 'react';
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

    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
        <div className="inner-landing-container impact" style={{height: '50vh'}}>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
                <h1 className='mpr-header'>
                    <Translate text="IMPACT" />
                </h1>
            </Textfit><br/>
                <button>NUMBERS</button>
                <button>MAPS</button>
                <button>PRESS</button>
                <button>REPORTS</button>
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

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import donateTranslation from '../translation/donate';
import titlesTranslation from '../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const Seasons = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...donateTranslation,
        ...titlesTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
        <div className="inner-landing-container" style={{height: '50vh'}}>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header' style={{ fontFamily: 'sans-serif' }}>
                <Translate text="DONATE" />
            </h1></Textfit>
                <div style={{
                    fontFamily: 'sans-serif',
                    display: 'inline-block',
                    letterSpacing: '1px',
                    fontSize: '1rem',
                    color: "#636036",
                    lineHeight: 2,
                    textAlign: 'justify',
                }}>
                <i className='line-purple' />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div><br/>
            <br/><br/><br/><br/>
            <small style={{
                    fontFamily: 'sans-serif',
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1.3vw',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#492b74'
                }}>la música está llamandote</small>
            </div></Fragment>
            </Provider>
}


Seasons.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Seasons);

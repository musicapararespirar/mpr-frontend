import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../translation/about';
import titlesTranslation from '../translation/titles';
import landingTranslation from '../translation/landing';
import navbarTranslation from '../translation/navbar';
import { Textfit } from 'react-textfit';
import MusicaParaRespirar from './about/MusicaParaRespirar';
import LaSociedad from './about/LaSociedad';
import Team from './about/Team';

const AboutUs = ({
    language: { languageCode }
}) => {
    // Combine translation files
    const allTranslations = {
        ...aboutTranslation,
        ...titlesTranslation,
        ...landingTranslation,
        ...navbarTranslation
    }
    const buttons = (
        <Fragment>
            <button onClick={e => {setDisplayInformationFor("MusicaParaRespirar")}}>Musica Para Respirar
            <i className="fas fa-long-arrow-alt-right" /></button><br/>
            <button onClick={e => {setDisplayInformationFor("LaSociedad")}}>La Sociedad
            <i className="fas fa-long-arrow-alt-right" /></button><br/>
            <button onClick={e => {setDisplayInformationFor("Team")}}><Translate text="Team" />
            <i className="fas fa-long-arrow-alt-right" /></button>
        </Fragment>
    );

    const about = (
        <Fragment>
            <div className="inner-landing-container about">
            <Textfit mode='single' forceSingleModeWidth={true} min={55}>
                <h1 className='mpr-header'>
                    <Translate text="ABOUT US" />
                </h1>
            </Textfit>
            <div style={{
                display: 'inline-block',
                letterSpacing: '1px',
                fontSize: '1rem',
                lineHeight: 2,
                textAlign: 'justify',
                fontWeight: 'lighter'
            }}>
                <i className='line-gold' />
                    <Translate text="aboutDescriptionP1" /><br/><br/>
            </div>
            {buttons}
        </div>
        </Fragment>
    );

    const mpr = (
        <Fragment>
            <div className='wide-landing-container about'>
                <MusicaParaRespirar />
                <button onClick={e => (setDisplayInformationFor(null))}>
                    <i className="fas fa-long-arrow-alt-left" /> Back
                </button>
            </div>
        </Fragment>
    );

    const lasociedad = (
        <Fragment>
            <div className='wide-landing-container about'>
                <LaSociedad />
                <button onClick={e => (setDisplayInformationFor(null))}>
                    <i className="fas fa-long-arrow-alt-left" /> Back
                </button>
            </div>
        </Fragment>
    );

    const team = (
        <Fragment>
            <div className='wide-landing-container about'>
                <Team />
                <button onClick={e => (setDisplayInformationFor(null))}>
                    <i className="fas fa-long-arrow-alt-left" /> Back
                </button>
            </div>
        </Fragment>
    );

    const [displayInformationFor, setDisplayInformationFor] = useState(null);
    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>
                {!displayInformationFor ? about : null}
                {displayInformationFor && displayInformationFor === "MusicaParaRespirar" ? mpr : null}
                {displayInformationFor && displayInformationFor === "LaSociedad" ? lasociedad : null}
                {displayInformationFor && displayInformationFor === "Team" ? team : null}

                </Fragment>
            </Provider>
}

AboutUs.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps )(AboutUs);

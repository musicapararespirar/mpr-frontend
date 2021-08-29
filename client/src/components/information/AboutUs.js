import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../translation/about';
import titlesTranslation from '../translation/titles';
import navbarTranslation from '../translation/navbar';
import { Textfit } from 'react-textfit';


const AboutUs = ({
    language: { languageCode }
}) => {
    // Combine translation files
    const allTranslations = {
        ...aboutTranslation,
        ...titlesTranslation,
        ...navbarTranslation
    }
    const [visibilityMPR, toggleVisibilityMPR] = useState(false);
    const [visibilityLaSociedad, toggleVisibilityLaSociedad] = useState(false);
    const [visibilityTeam, toggleVisibilityTeam] = useState(false);

    useEffect(() => {
        window.location.hash == "#mpr" && toggleVisibilityMPR(true)
        if (window.location.hash == "#mpr") {
            toggleVisibilityTeam(false);
            toggleVisibilityLaSociedad(false);
            toggleVisibilityMPR(true);
        }
    }, [window.location.hash]);
    useEffect(() => {
        if (window.location.hash == "#lasociedad") {
            toggleVisibilityTeam(false);
            toggleVisibilityLaSociedad(true);
            toggleVisibilityMPR(false);
        }
    }, [window.location.hash]);
    useEffect(() => {
        if (window.location.hash == "#team") {
            toggleVisibilityTeam(true);
            toggleVisibilityLaSociedad(false);
            toggleVisibilityMPR(false);
        }
    }, [window.location.hash]);


    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment><div className="container">
            <h1 id="mpr">
                <button onClick={() => {toggleVisibilityMPR(!visibilityMPR)}}><Translate text="MÚSICA PARA RESPIRAR" /></button>
             </h1>
                { visibilityMPR ?
            <p style={{ textAlign: 'justify', }}>
                <Translate text="aboutDescriptionP1" /><br/><br/>
                <Translate text="aboutDescriptionP2" /><br/><br/>
                <Translate text="aboutDescriptionP3" /><br/><br/>
            </p> : null}

            <h1 id="lasociedad">
                <button onClick={() => {toggleVisibilityLaSociedad(!visibilityLaSociedad)}}><Translate text="LA SOCIEDAD"/></button>
             </h1>
                { visibilityLaSociedad ?
                    <p style={{ textAlign: 'justify', }}>
                        <Translate text="aboutLaSociedadP1" /><br/><br/>
                        <Translate text="aboutLaSociedadP2" /><br/><br/>
                    </p> : null}

            <h1 id="team">
                <button onClick={() => {toggleVisibilityTeam(!visibilityTeam)}}><Translate text="TEAM" /></button>
             </h1>
            { visibilityTeam ?
                <p style={{ textAlign: 'justify', }}>
                    <Translate text="theTeam" /><br/><br/>
                </p> : null}
            </div></Fragment>
            </Provider>
}

AboutUs.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps )(AboutUs);

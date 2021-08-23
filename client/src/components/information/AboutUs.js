import React, { Fragment, useEffect } from 'react';
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
    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment><div className="container">

            <h1>
                <Translate text="About Us" />
             </h1>
            <p style={{ fontFamily: 'sans-serif', textAlign: 'justify', }}>
                <Translate text="aboutDescriptionP1" /><br/><br/>
                <Translate text="aboutDescriptionP2" /><br/><br/>
                <Translate text="aboutDescriptionP3" /><br/><br/>
            </p>

            <h1>
                <Translate text="La Sociedad" />
             </h1>
            <p style={{ fontFamily: 'sans-serif', textAlign: 'justify', }}>
                <Translate text="aboutLaSociedadP1" /><br/><br/>
                <Translate text="aboutLaSociedadP2" /><br/><br/>
            </p>

            <h1>
                <Translate text="Team" />
             </h1>
            <p style={{ fontFamily: 'sans-serif', textAlign: 'justify', }}>
                <Translate text="theTeam" /><br/><br/>
            </p>
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

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../translation/about';
import titlesTranslation from '../translation/titles';
import { Textfit } from 'react-textfit';


const AboutUs = ({
    language: { languageCode }
}) => {
    // Combine translation files
    const allTranslations = {
        ...aboutTranslation,
        ...titlesTranslation
    }
    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment><div className="inner-landing-container">

            <Textfit mode='single' forceSingleModeWidth={true}>
            <h1 className='mpr-header' style={{
                marginTop: '30%',
                textAlign: 'center',
                fontFamily: 'sans-serif'
            }}>
                <Translate text="About Us" />
            </h1></Textfit>
            <p style={{ fontFamily: 'sans-serif', textAlign: 'justify', }}>
                <Translate text="aboutDescriptionP1" /><br/><br/>

                <Translate text="aboutDescriptionP2" /><br/><br/>
                <Translate text="aboutDescriptionP3" /><br/><br/>
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

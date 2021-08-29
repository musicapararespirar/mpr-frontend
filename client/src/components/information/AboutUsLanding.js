import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../translation/about';
import titlesTranslation from '../translation/titles';
import landingTranslation from '../translation/landing';
import { Textfit } from 'react-textfit';


const AboutUs = ({
    language: { languageCode }
}) => {
    // Combine translation files
    const allTranslations = {
        ...aboutTranslation,
        ...titlesTranslation,
        ...landingTranslation
    }
    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>
                <div className="inner-landing-container">
                <Textfit mode='single'
                forceSingleModeWidth={true}
                min={55}>
                <h1 className='mpr-header' style={{
                }}>
                    <Translate text="ABOUT US" />
                </h1></Textfit>
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
                    <Link to="/about-us#mpr" style={{
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#ea9d28'
                }}><Translate text="Read more" />
                <i className="fas fa-long-arrow-alt-right" /></Link>
                </div><br/></div>

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

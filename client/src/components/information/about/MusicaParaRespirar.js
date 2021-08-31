import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../../translation/about';
import titlesTranslation from '../../translation/titles';
import navbarTranslation from '../../translation/navbar';
import { Textfit } from 'react-textfit';
import mprImage from '../../../img/logo-large.png';


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

    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>
                <p className="wide-landing-container about" style={{ textAlign: 'justify', }}>
                    <img style={{
                    width: '50%',
                    margin: 'auto',
                    textAlign: 'center',
                    display: 'block',
                    }} src={mprImage} /><br/>
                    <Translate text="aboutDescriptionP1" /><br/><br/>
                    <Translate text="aboutDescriptionP2" /><br/><br/>
                    <Translate text="aboutDescriptionP3" />
                </p>
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

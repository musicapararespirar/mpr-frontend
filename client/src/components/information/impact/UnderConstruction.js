import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import impactTranslation from '../../translation/impact';
import titlesTranslation from '../../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import underConstruction from '../../../img/underconstruction.png';

const UnderConstruction = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...impactTranslation,
        ...titlesTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
        <div style={{textAlign: 'center'}}>
            <img style={{width: '20%'}}src={underConstruction} />
            <h1><Translate text="underconstruction" /></h1>
        </div>
        </Fragment>
    </Provider>
}

UnderConstruction.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(UnderConstruction);

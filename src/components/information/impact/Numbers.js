import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import impactTranslation from '../../translation/impact';
import titlesTranslation from '../../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const Numbers = ({
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

            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header'> <Translate text="THE NUMBERS" /></h1></Textfit>
<br/>
            <ul className='numbers-dot'>
                <li><span className='x-large left-numbers'>80</span><span className="numbers-text white"><Translate text="MUSICIANS" /></span></li><br/><br/><br/>
                <li><span className='x-large left-numbers'>90383</span><span className="numbers-text white"><Translate text="TIME" /></span></li><br/><br/><br/>
                <li><span className='x-large left-numbers'>12036</span><span className="numbers-text white"><Translate text="LISTENERS" /></span></li><br/><br/><br/>
                <li><span className='x-large left-numbers'>3399</span><span className="numbers-text white "><Translate text="CALLS" /></span></li><br/><br/><br/>
            </ul>
             <br/>
            <small style={{
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#492b74'
                }}><Translate text="cada historia cuenta" />...</small>

            </Fragment>
            </Provider>
}

Numbers.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Numbers);

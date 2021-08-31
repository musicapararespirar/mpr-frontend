import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../../translation/concerts';
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
        ...concertTranslation,
        ...titlesTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>

            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header white'>
                <Translate text='MUSICA' />
            </h1></Textfit>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header white'><Translate text="PARA" /> <Translate text="RESPIRAR" /></h1></Textfit>
            <div className="white" style={{
                fontSize: '2rem',
                fontWeight: 'bold'}}>
                    LOS NÚMEROS:
            </div><br/>
            <ul className='numbers-dot'>
                <li><span className='x-large left-numbers'>65</span><span className="title white">MUSICOS</span></li><br/><br/><br/>
                <li><span className='x-large left-numbers'>3542</span><span className="title white">TIEMPO</span></li><br/><br/><br/>
                <li><span className='x-large left-numbers'>456</span><span className="title white">OYENTES</span></li><br/><br/><br/>
                <li><span className='x-large left-numbers'>274</span><span className="title white">LLAMADAS</span></li><br/><br/><br/>
            </ul>

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

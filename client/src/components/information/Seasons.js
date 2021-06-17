import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
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
        ...concertTranslation,
        ...titlesTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>

            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header gold' style={{ fontFamily: 'sans-serif' }}>
                <Translate text='MUSICA' />
            </h1></Textfit>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header gold' style={{ fontFamily: 'sans-serif' }}><Translate text="PARA" /> <Translate text="RESPIRAR" /></h1></Textfit>
            <div className="gold" style={{
                fontSize: '3vw',
                letterSpacing: '-3px',
                fontFamily: 'sans-serif',
                fontWeight: 'bold'}}>
                    LOS NÚMEROS:
            </div><br/>
            <div style={{ padding: 0,
                maxWidth: '35vw'
            }}>
                    <div className='x-large gold left-numbers'>65</div>
                    <div className='dark-title'>MUSICOS</div>
                <div style={{ clear: 'both'}} />
                    <p className='x-large gold left-numbers'>3542</p>
                    <p className='dark-title'>TIEMPO</p>
                <div style={{ clear: 'both'}} />
                    <p className='x-large gold left-numbers'>456</p>
                    <p className='dark-title'>OYENTES</p>
                <div style={{ clear: 'both'}} />
                    <p className='x-large gold left-numbers'>274</p>
                    <p className='dark-title'>LLAMADAS</p>
                <div style={{ clear: 'both'}} />
            </div>
            </Fragment><br/><br/><br/><br/>
            <small style={{
                    fontFamily: ' sans-serif',
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1.3vw',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#ea9d28'
                }}>cada historia cuenta</small>
            </Provider>
}


Seasons.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Seasons);

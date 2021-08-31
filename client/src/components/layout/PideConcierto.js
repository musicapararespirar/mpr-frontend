import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';
import LoginLogo from './LoginLogo'
import { Textfit } from 'react-textfit';


const PideConcierto = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...titlesTranslation,
        ...concertTranslation
    }

    const scrollRef = useRef(null);

    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>
        <div className="inner-landing-container" style={{minHeight: '30vh'}}>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header'>
                <Translate text="pide" />
            </h1></Textfit>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header'><Translate text="concierto" /></h1></Textfit>
                <div style={{
                    display: 'inline-block',
                    letterSpacing: '1px',
                    fontSize: '1rem',
                    lineHeight: 2,
                    textAlign: 'justify',
                    fontWeight: 'lighter'
                }}>
                <i className='line-gold' />
                    <Translate text='ConcertMainParagraphPreSocials'/>
                    <a
                        className="gold-link"
                        href="https://www.facebook.com/lasociedad.bo/"
                        target='_blank'>Facebook
                    </a>
                    <Translate text='or'/>
                    <a
                        className="gold-link"
                        href="https://www.instagram.com/lasociedad.bo"
                        target='_blank'>Instagram
                    </a>
                    <Translate text='ConcertMainParagraphPostSocials'/>
                </div><br/>
            <Fragment>
            </Fragment><br/><br/><br/><br/>
            <small style={{
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#ea9d28'
                }}><Translate text="vive la música en casa" />...</small>
            </div></Fragment></Provider>
}


PideConcierto.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(PideConcierto);

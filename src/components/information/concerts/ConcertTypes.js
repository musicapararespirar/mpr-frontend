import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../../translation/concerts';
import titlesTranslation from '../../translation/titles';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const ConcertTypes = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...titlesTranslation,
        ...concertTranslation
    }

    const [concertType, setConcertType] = useState('personal');

    function getInstututionLink() {
        if (languageCode === 'pt') {
            return 'https://drive.google.com/file/d/1b06ArF2-COUdbArrEsHatnGNLxHskJFq/view'
        }
        if (languageCode === 'en') {
            return 'https://drive.google.com/file/d/1SQjbMJmzYha0hxg2qWNHmxSQZGOuU6QA/view'
        }
        if (languageCode === 'es') {
            return 'https://drive.google.com/file/d/1YnsSOzSbZX77ZmTOFD4AAJ2011kULsXB/view'
        }

    }
    const institutionLink = getInstututionLink();
    const personalConcert = (
        <Fragment>
                <h1 className='mpr-header gold' style={{
                    textAlign: 'center',
                    fontSize: '2.5rem' }}>
                    <Translate text="PERSONAL" />
                </h1>
                <p style={{textAlign: 'justify'}}>
                    <i className='line-gold' /><Translate text="personalConcertText" />
                </p>
        </Fragment>
    );


    const institutionalConcert = (
        <Fragment>
                <h1 className='mpr-header gold' style={{
                    textAlign: 'center',
                    fontSize: '2.5rem' }}>
                    <Translate text="INSTITUTIONAL" />
                </h1>
                <p style={{textAlign: 'justify'}}>
                    <i className='line-gold' /><Translate text="institutionalConcertTextP1" />
                    <a className='gold-link' target="_blank" href={institutionLink}><Translate text="thepresentation" /></a>
                    <Translate text="institutionalConcertTextP2" />
                    <a className='gold-link' href='mailto:lasociedad.bo@gmail.com'>lasociedad.bo@gmail.com</a>.
                </p>
        </Fragment>
    );

    const giftConcert = (
        <Fragment>
        <Textfit mode='multi' max={200}>
                <h1 className='mpr-header gold' style={{
                    textAlign: 'center',
                    fontSize: '2.5rem' }}>
                    <Translate text="GIFTACONCERT" />
                </h1>
        </Textfit>
                <p style={{textAlign: 'justify'}}>
                    <i className='line-gold' /><Translate text="giftConcertText" />
                </p>
        </Fragment>
    );

    const tipsConcert = (
        <Fragment>
                <h1 className='mpr-header gold' style={{
                    textAlign: 'center',
                    fontSize: '2.5rem' }}>
                    <Translate text="TIPSFORCONCERT" />
                </h1>
                    <ul style={{listStyleType: "disc"}}>
                        <li><Translate text="tipsConcertText1" /></li>
                        <li><Translate text="tipsConcertText2" /></li>
                        <li><Translate text="tipsConcertText3" /></li>
                        <li><Translate text="tipsConcertText4" /></li>
                        <li><Translate text="tipsConcertText5" /></li>
                    </ul>
                </Fragment>
    );

    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>
        <div className="wide-landing-container" style={{marginBottom: 0, minHeight: '50vh'}} >
            <div style={{
                float: 'left',
                width: '45%',
                paddingRight: '3%',
                marginBottom: 0
            }}>
                <h1 >
                    <Translate text="typesOfConcerts" />:
                </h1><br/>
                <div className='request'>
                    <button onClick={e => setConcertType('personal')}>
                        <p className={concertType === 'personal' ? 'gold' : ''}>
                        <Translate text="PERSONAL" /></p>
                    </button><br/><br/>
                    <button onClick={e => setConcertType('institutional')}>
                        <p className={concertType === 'institutional' ? 'gold' : ''}><Translate text="INSTITUTIONAL" /></p></button><br/><br/>
                    <button onClick={e => setConcertType('gift')}>
                        <p className={concertType === 'gift' ? 'gold' : ''}><Translate text="GIFTACONCERT" /></p></button><br/><br/>
                    <button onClick={e => setConcertType('tips')}>
                        <p className={concertType === 'tips' ? 'gold' : ''}><Translate text="TIPSFORCONCERT" /></p></button><br/>
                </div>
            </div>

            <div style={{
                float: 'left',
                width: '55%',
                marginTop: 0, paddingLeft: '0%'}}>
                    {concertType && concertType === 'personal' ? personalConcert : null}
                    {concertType && concertType === 'institutional' ? institutionalConcert : null}
                    {concertType && concertType === 'gift' ? giftConcert : null}
                    {concertType && concertType === 'tips' ? tipsConcert : null}
            </div>
            <div style={{clear: 'both'}} />

            </div></Fragment></Provider>
}


ConcertTypes.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(ConcertTypes);

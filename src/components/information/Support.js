import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import supportTranslation from '../translation/support';
import titlesTranslation from '../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const Support = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...supportTranslation,
        ...titlesTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
        <div className="inner-landing-container" style={{minHeight: '50vh'}}>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 style={{textAlign: 'center'}} className='mpr-header'>
                <Translate text="SUPPORT US" />
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
                <Translate text="supportUsLanding" />
                    <br/><br/>

                    <div className='donate-button'>
                        <a onClick={e => window.umami('Clicked GoFundMe')} href="https://www.gofundme.com/f/7cqcrg-musica-para-respirar-247" target="_blank">
                            <button>
                                <h1><Translate text="CLICK HERE" /></h1>
                                <p><Translate text="toDonateGoFundMe" /></p>
                            </button>
                        </a>
                        <br/><br/>
                        <a onClick={e => window.umami('Clicked FracturedAtlas')} href="https://fundraising.fracturedatlas.org/musica-para-respirar-24-7" target="_blank">
                            <button>
                                <h1><Translate text="CLICK HERE" /></h1>
                                <p><Translate text="toDonateUSA" /></p>
                            </button>
                        </a>
                    </div>
                    <br/>
                </div><br/><br/>
            <small style={{
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#ea9d28'
                }}><Translate text="la música está llamandote" />...</small>
            </div></Fragment>
            </Provider>
}


Support.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Support);

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import donateTranslation from '../translation/donate';
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
        ...donateTranslation,
        ...titlesTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
        <div className="inner-landing-container" style={{height: '50vh'}}>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header' style={{ fontFamily: 'sans-serif' }}>
                <Translate text="DONATE" />
            </h1></Textfit>
                <div style={{
                    fontFamily: 'sans-serif',
                    display: 'inline-block',
                    letterSpacing: '1px',
                    fontSize: '1rem',
                    color: "#636036",
                    lineHeight: 2,
                    textAlign: 'justify',
                }}>
                <i className='line-purple' />
                    Música para Respirar es una nueva forma de hacer música de manera más personal. Contribuye para que llegue a más personas de forma gratuita. Al apoyarnos estás gestionando la contratación de artistas en toda América latina y el mundo, el  trabajo de administración, coordinación, el diseño gráfico y principalmente haciendo llegar música a más personas.<br/><br/>

                    CONTRIBUYE AQUÍ (Link de Gofundme)<br/>
                    FOR TAX DEDUCTIBLE DONATIONS IN THE US CLICK HERE (Fractured Atlas)<br/>

                    Música para Respirar 24/7 es posible gracias al apoyo de:<br/><br/>

                    MAW<br/>
                    KAS Foundation<br/>
                    Fundación Proyecto Ser Humano<br/>
                    Stefan Heucke<br/>
                    65 apoyadores de Gofundme<br/>

                </div><br/>
            <br/><br/><br/><br/>
            <small style={{
                    fontFamily: 'sans-serif',
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#492b74'
                }}>la música está llamandote</small>
            </div></Fragment>
            </Provider>
}


Seasons.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Seasons);

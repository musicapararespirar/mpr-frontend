import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import translation from './translation';
import { setLanguage } from '../../actions/language';
import PropTypes from 'prop-types';

const ConcertAbout = ({
    language: {
        languageCode,
        loading
    },
    setLanguage
}) => {
    return <Provider language="en" translation={translation}>
    <Fragment>
            <p className="lead">
                <i className="fas fa-music"></i> Conciertos
            </p>
            {languageCode}
        <Translate text="Para recibir"></Translate> un concierto, el o la oyente simplemente debe enviar su nombre y número de teléfono a las redes sociales de La Sociedad (@lasociedad.bo), o hacerlo a través de esta página y en hasta 30 minutos un artista se contactará con ustedes para brindarles un concierto.<br/>
        <br/>
        <div className="form-group social-input instagram">
            <a target="_blank" href="https://www.instagram.com/lasociedad.bo/">
                    <i className="small-container fab fa-instagram fa" /> lasociedad.bo<br/>
            </a>
            <a target="_blank" href="https://www.facebook.com/lasociedad.bo/">
                <i className="small-container fab fa-facebook fa" /> lasociedad.bo
            </a>
        </div>
            </Fragment></Provider>;
}


ConcertAbout.propTypes = {
    setLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired
}


const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps, { setLanguage } )(ConcertAbout);

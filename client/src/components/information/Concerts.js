import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';


const Concerts = () => {
    return <Fragment>
            <p className="lead">
                <i className="fas fa-music"></i> Concerts
            </p>
Para recibir un concierto, el o la oyente simplemente debe enviar su nombre y número de teléfono a las redes sociales de La Sociedad (@lasociedad.bo), o hacerlo a través de esta página y en hasta 30 minutos un artista se contactará con ustedes para brindarles un concierto.<br/>
<br/>
<div className="form-group social-input instagram">
    <a target="_blank" href="https://www.instagram.com/lasociedad.bo/">
            <i className="small-container fab fa-instagram fa" /> lasociedad.bo<br/>
    </a>
    <a target="_blank" href="https://www.facebook.com/lasociedad.bo/">
        <i className="small-container fab fa-facebook fa" /> lasociedad.bo
    </a>
</div>
            </Fragment>;
}

export default Concerts;

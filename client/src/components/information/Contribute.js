import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import CheckoutForm from '../payments/CheckoutForm';

const stripePromise = loadStripe("pk_test_51IqaDELHTCikUAWZC4rVEwjy7UPfoWeoRKbtSlSvzSVzrtWnVLNMTssIXXlGoJrU7g7zzBE9sOLjjI3cr1IuLdfi00q3SnQz3C");

const Contribute = () => {
    return <Fragment>
        <section className="contribute">
        <p className="lead">
            <i className="fas fa-music"></i> Contribuye
        </p>
<p>Música para Respirar 24/7 es un proyecto que tiene la finalidad de brindar conciertos gratuitos a todas las personas que necesiten un respiro musical en tiempos de coronavirus. Es por esta razón que el trabajo realizado inició de manera voluntaria, pero mientras más grande se hizo el proyecto, su gestión requiere de más esfuerzo, tiempo y músicos.</p><br/>

<p>El sector cultural es uno de los grupos profesionales más afectados por la pandemia, ya que sus actividades aun no se han reactivado del todo. Aun así, la música ha demostrado ser una herramienta indispensable para el bienestar de las personas y proyectos como este actúan de manera directa apara generar un bien social. Hasta la fecha, Música para Respirar ha logrado ser sostenible gracias a las contribuciones <b>de la fundación alemana que no se que se llama</b> y Music Academy of the West, además de las donaciones de varias personas que quisieron aportar a través de nuestra página de Gofundme.</p><br/>
<p>Queremos ser capaces de reconocer el trabajo de todos los músicos que participen en o formen parte de este hermoso proyecto, y a la vez, continuar ofreciendo nuestros conciertos de forma gratuita, para que lleguen a todos los rincones donde se necesite un poco de música. Te invitamos a contribuir con nuestro proyecto y ser parte de la alegría que llevamos a las personas con nuestros conciertos.</p>
        </section><br/>
         <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
        </Fragment>;
}

export default Contribute;

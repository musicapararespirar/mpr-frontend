import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';


const AboutUs = () => {
    return <Fragment>
            <p className="lead">
                <i className="fas fa-music"></i> Sobre Nosotros
            </p>
            <p>
            Música para Respirar 24/7 es una instalación artística en la cual músicos y músicas de alrededor del mundo están disponibles las 24 horas del día durante una semana, listos para tocar mini-conciertos virtuales, personales y gratuitos para cualquier persona que necesite un respiro musical. Estos conciertos se realizan a través de videollamadas, adaptándose a la coyuntura en la que vivimos y ofreciendo una experiencia íntima entre oyente e intérprete que por lo general no se logra en las salas de conciertos.</p><br/>

            <p>La iniciativa fue creada por La Sociedad Boliviana de Música de Cámara (La Sociedad) en agosto de 2020, como una respuesta artística a la crisis sanitaria global causada por la pandemia del COVID-19. Bolivia se encontraba en una situación crítica, con hospitales colapsados y en medio de una crisis política y social que se sumaba la incertidumbre de la pandemia. Los miembros de La Sociedad queríamos ofrecer algo innovador, que sea más personal que el contenido al que se tenía acceso en redes sociales. Nuestra meta era acercarnos a la experiencia de los conciertos en vivo, que contienen un nivel de energía distinta a los conciertos grabados.</p><br/>


            <p>La semana piloto de Música para Respirar 24/7 fue pensada como un homenaje al personal de salud y los turnos extenuantes que realizan para cuidar a la población. Los músicos que participan en este proyecto experimentan un ejercicio de empatía, en el que bridan su tiempo para estar disponibles, en turnos de hasta 12 horas seguidas, con el fin de generar espacios sonoros de tranquilidad y distracción a quienes lo necesiten. Hasta la fecha, nuestros conciertos han llegado a más de 6000 personas en 46 países.</p><br/>

            <h4>Sobre La Sociedad</h4><br/>
            <p>La Sociedad Boliviana de Música de Cámara nació ….. acá necesito que escribas una pequeña reseña Cami, porque tu puedes explicar mejor cómo nació. 1 o 2 párrafos estaría bien. Tal vez en la parte de debajo de esta sección podrían entrar las fotos en peque de los miembros de la sociedad </p>
            </Fragment>;
}

export default AboutUs;

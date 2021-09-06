import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import impactTranslation from '../../translation/impact';
import titlesTranslation from '../../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

const Press = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...impactTranslation,
        ...titlesTranslation
    }

    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>
            <div className='inner-landing-container' style={{textAlign: 'center', marginBottom: 0}}>
                <Textfit mode='single' forceSingleModeWidth={true} max={100}>
                    <h1 className='mpr-header'> <Translate text="PRESS" /></h1>
                </Textfit>
            </div><br/>
            <div className='press'>

                <a href="https://elpais.com/sociedad/2020-08-29/musica-para-respirar-una-bocanada-de-aire-para-las-personas-que-enfrentan-el-coronavirus-en-bolivia.html" target="_blank">
                <button style={{paddingLeft: '30%', width: '100%', textAlign: 'right'}}>
                    <i>"‘Música para respirar’, una bocanada de aire para las personas que enfrentan el coronavirus en Bolivia"</i><br/><h3 style={{textAlign: 'right'}}>El País, España</h3>
                </button><br/></a>

                <a href="https://www.eluniversal.com.co/salud/musica-para-distraer-a-enfermos-de-covid-19-en-bolivia-EC3271413" target="_blank">
                <button style={{paddingRight: '50%', width: '100%', textAlign: 'right'}}>
                    <i>"150 conciertos en dos días"</i><br/><h3 style={{textAlign: 'right'}}>El Universal, Colombia
                    </h3>
                </button><br/></a>

                <a href="https://vejasp.abril.com.br/blog/terraco-paulistano/musicos-apresentam-concertos-individuais-gratuitos-por-videochamada/" target="_blank">
                <button style={{paddingLeft: '30%', width: '100%', textAlign: 'right'}}>
                    <i>"Músicos apresentam concertos individuais gratuitos por videochamada"</i><br/><h3 style={{textAlign: 'right'}}>Veja, Brasil
                    </h3>
                </button></a><br/>

                <a href="https://www.wionews.com/videos/music-to-breathe-bolivian-music-project-offers-comfort-during-pandemic-322243" target="_blank">
                <button style={{paddingRight: '30%', width: '100%', textAlign: 'right'}}>
                    <i>"'Music to breathe': Bolivian music project offers comfort during pandemic"</i><br/><h3 style={{textAlign: 'right'}}>Wion News, India, Reuters
                    </h3>
                </button></a><br/>

                <a href="https://www.facebook.com/watch/?v=207457094716880&ref=sharing" target="_blank">
                <button style={{paddingLeft: '30%', width: '100%', textAlign: 'right'}}>
                    <i className="fas fa-film" />Reportaje en Video<br/><h3 style={{textAlign: 'right'}}>Teleamazonas, Ecuador
                    </h3>
                </button></a>
            <br/>
</div>
    </Fragment>
    </Provider>
}

Press.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Press);

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import supportTranslation from '../translation/supporters';
import titlesTranslation from '../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import musacawes from '../../img/musacawes.png';
import kas from '../../img/kas.png';
import fundserhum from '../../img/fundserhum.png';

const Supporters = ({
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
        <div className="wide-landing-container" style={{textAlign: 'center', height: '300px'}}>
            <Textfit mode='single' forceSingleModeWidth={true} max={70}>
            <h1 className='mpr-header'>

                <Translate text="SUPPORTERS" />
            </h1></Textfit>


            <p style={{
                    fontSize: '1rem',
                    color: '#492b74',
                    textAlign: 'center'
                }}><Translate text="supportComment" /></p>

                <div className="img-row">
                    <div className="img-column">
                        <img src={musacawes} style={{width: "75%"}} />
                    </div>
                    <div className="img-column">
                        <img src={kas} style={{width: "100%"}} />
                    </div>
                    <div className="img-column">
                        <img src={fundserhum} style={{width: "100%"}} />
                    </div>
                </div>

            <p style={{
                    fontSize: '1rem',
                    color: '#492b74',
                    textAlign: 'center'
                }}>Stefan Heucke, Tenny Barron <Translate text="and" /> Ursula Bentele, Martin Mueller, Hendrik Burgdörfer,<br/>
                Eduardo <Translate text="and" /> Bobby Arboleda, Marcelo Jordan
            </p><br/><br/><p style={{
                    fontSize: '1rem',
                    color: '#492b74',
                    textAlign: 'center'
                }}>+65 <Translate text="INDIVIDUAL CONTRIBUTORS" /></p>
            </div>
            </Fragment>
            </Provider>
}


Supporters.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Supporters);

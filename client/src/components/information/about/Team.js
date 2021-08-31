import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../../translation/about';
import titlesTranslation from '../../translation/titles';
import navbarTranslation from '../../translation/navbar';
import { Textfit } from 'react-textfit';


const Team = ({
    language: { languageCode }
}) => {
    // Combine translation files
    const allTranslations = {
        ...aboutTranslation,
        ...titlesTranslation,
        ...navbarTranslation
    }
    const [visibilityMPR, toggleVisibilityMPR] = useState(false);
    const [visibilityLaSociedad, toggleVisibilityLaSociedad] = useState(false);
    const [visibilityTeam, toggleVisibilityTeam] = useState(false);

    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>

            <div className="team-container">
                <div className="Team-list">
                    <div className="Description"><small className='pink'><Translate text="theTeam" /></small></div>
                    <div className="Title x-large"><Textfit mode='single' forceSingleModeWidth={true} max={200}>TEAM</Textfit></div>
                    <div className="List">
                    <div className="name1">CAMILA BARRIENTOS</div>
                    <div className="name2">CAMILA BARRIENTOS</div>
                    <div className="name3">CAMILA BARRIENTOS</div>
                    <div className="name4">CAMILA BARRIENTOS</div>
                    <div className="name5">CAMILA BARRIENTOS</div>
                    <div className="name6">CAMILA BARRIENTOS</div>
                    <div className="name7">CAMILA BARRIENTOS</div>
                    <div className="name8">CAMILA BARRIENTOS</div>
                    <div className="name9">CAMILA BARRIENTOS</div>
                    <div className="name10">CAMILA BARRIENTOS</div>
                    <div className="name11">CAMILA BARRIENTOS</div>
                    <div className="name12">CAMILA BARRIENTOS</div>
                    <div className="ic7"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic8"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic9"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic10"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic11"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic12"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic6"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic5"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic4"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic3"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic2"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    <div className="ic1"><i className="fas fa-circle fa-3x" style={{color: '#ed008c'}}></i></div>
                    </div>
                </div>
                <div className="Profile" style={{textAlign: 'justify'}}>
                    <h1 className='x-large pink'>CAMILA BARRIENTOS</h1>
                    <h2 className="pink">PRESIDENTE</h2>
                    <i className='line-pink' />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
            </Fragment>
            </Provider>
}

Team.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps )(Team);

import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../../translation/about';
import titlesTranslation from '../../translation/titles';
import navbarTranslation from '../../translation/navbar';
import { Textfit } from 'react-textfit';
import teamList from './teamList';

const Team = ({
    language: { languageCode }
}) => {
    // Combine translation files
    const allTranslations = {
        ...aboutTranslation,
        ...titlesTranslation,
        ...navbarTranslation
    }
    const [visibilityProfile, setVisibilityProfile] = useState(null);

    function getProfileByID(id) {
        var result = teamList.find(obj => {
            return obj.id === id
        })
        console.log(result);
        return result
    }

    function buildTable() {
        // Make an even sized table of two columns wide adding from array
        var rows = []
        for (let i = 0; i < teamList.length; i++) {
            if (i === 0 || i % 2 === 0) {
                rows.push(
                <Fragment>
                <tr>
                    <td>
                        <button onClick={e => setVisibilityProfile(teamList[i].id)}>
                            <img
                                src={teamList[i].thumbnail}
                                style={{height: '80px', width: '80px', float:'left', marginRight: '5px'}} />
                            <Textfit mode='multi' forceSingleModeWidth={false} max={200}><h3>{teamList[i].fullName.toUpperCase()}</h3></Textfit>
                            <h4><Translate text={teamList[i].title} /></h4>
                        </button>
                    </td>
                    <td>
                        <button onClick={e => setVisibilityProfile(teamList[i+1].id)}>
                            <img
                                src={teamList[i+1].thumbnail}
                                style={{height: '80px', width: '80px', float:'left', marginRight: '5px'}} />
                            <section><h3>{teamList[i+1].fullName.toUpperCase()}</h3>
                            <h4><Translate text={teamList[i+1].title} /></h4></section>
                        </button>
                    </td>
                </tr>
                </Fragment>
                )
            }
        }

        // End of loop add final table elements
        return (
            <Fragment>
            <table>
                    {rows}
            </table>
            </Fragment>
        )}

    const teamTable = buildTable();


    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>
                <div className="wide-landing-container team">
                    <div className='x-large' style={{ marginBottom: '0px', width: '40%', float: 'left'}}>
                        <Textfit mode='single' forceSingleModeWidth={true} max={200}>TEAM</Textfit>
                    </div>
                    <div className='pink' style={{float: 'right', width: '60%'}}>
                        <Translate text="theTeam" />
                    </div>
                    <div style={{clear: 'both'}} />

                    {visibilityProfile ? (
                        <Fragment>
                            <div className='about' style={{
                                float: 'left',
                                margin: '25% 0'
                                }}>
                                <button onClick={e => (setVisibilityProfile(null))}>
                                    <i style={{ margin: 'auto' }} className="fas fa-chevron-left fa-2x"/>
                                </button>
                            </div>
                            <div className="Profile" style={{textAlign: 'justify', float: 'left', width: '90%', marginLeft: '10px'}}>
                                <h1 className='x-large pink' style={{display: 'table-caption', lineHeight: '0.85', margin: 0}}>{getProfileByID(visibilityProfile).fullName.toUpperCase()}</h1>
                                <h2 className="pink" style={{fontWeight: 0}}><Translate text={getProfileByID(visibilityProfile).title} /></h2>
                                <i className='line-pink' /><Translate text={getProfileByID(visibilityProfile).bio} /><br/><br/>
                                {getProfileByID(visibilityProfile).quote ? (
                                    <i>"<Translate text={getProfileByID(visibilityProfile).quote} />"</i>
                                    ) : ( null )}
                            </div>
                            <div style={{clear: 'both'}} />
                        </Fragment>
                    ) : (
                    <Fragment>
                        <div style={{ width: '100%', clear: 'both'}}>
                            {teamTable}
                        </div>
                    </Fragment>
                    )}

                    <br/><br/>
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

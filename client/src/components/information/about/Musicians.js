import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import aboutTranslation from '../../translation/about';
import titlesTranslation from '../../translation/titles';
import navbarTranslation from '../../translation/navbar';
import { Textfit } from 'react-textfit';
import lasociedadImage from '../../../img/lasociedad.png';
import musicianList from './musicianList';

const Musicians = ({
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

    Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === v) return true;
        }
        return false;
    };

    Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
            arr.push(this[i]);
            }
        }
        return arr;
    }

    function getUniqueInstrumentList() {
        var instrumentList = [];
        for (let j = 0; j < musicianList.length; j++) {
            instrumentList.push(musicianList[j].instrument);
        }

        return instrumentList.unique().sort();
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers,
            * and you may want to customize it to your needs
            */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }


    function getMusiciansByCharacter() {
        const instruments = getUniqueInstrumentList();

        var musiciansByLetter = [];
        for (let i = 0; i < instruments.length; i++) {
            var instrumentArray = [];

            // Go through each letter and find surnames starting with it
            // then push to array if they exist
            for (let j = 0; j < musicianList.length; j++) {
                if (musicianList[j].instrument === instruments[i]) {
                    instrumentArray.push(musicianList[j]);
                }
            }
            // Push document to array only if there are objects inside
            if (instrumentArray.length > 0) {
                musiciansByLetter.push({
                    instrument: instruments[i],
                    musicians: instrumentArray.sort(dynamicSort("firstName"))})
            }
        }
        return musiciansByLetter
    }
    const musicianDocument = getMusiciansByCharacter();

    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>
            <p className="inner-landing-container about"
                style={{ textAlign: 'justify', marginBottom: 0, marginTop: 0}}>
                <Textfit mode='single' forceSingleModeWidth={true} min={30}>
                    <h1 className='mpr-header'>
                        <Translate text="MUSICIANS" />
                    </h1>
                </Textfit>

                {musicianDocument.map((group, idx) => (
                    <div>
                        <h1>
                            {group.instrument}
                        </h1>

                        {group.musicians.map((musician, i) => (
                            <Fragment><p>{musician.firstName.trim()} {musician.lastName.trim()} <small className="gold">{musician.origen.trim()}</small></p></Fragment>
                        ))}
                    </div>
                ))}
            </p>
            </Fragment>
            </Provider>
}

Musicians.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps )(Musicians);

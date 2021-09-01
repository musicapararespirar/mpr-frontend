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

    function getMusiciansByCharacter() {
        const alphabet = [...Array('Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1).keys()];

        var musiciansByLetter = [];
        for (let i = 0; i < alphabet.length; i++) {
            const asciiChar = String.fromCharCode(alphabet[i] + 'A'.charCodeAt(0));
            var letterArray = [];

            // Go through each letter and find surnames starting with it
            // then push to array if they exist
            for (let j = 0; j < musicianList.length; j++) {
                if (musicianList[j].lastName.charAt(0) === asciiChar) {
                    letterArray.push(musicianList[j]);
                }
            }
            // Push document to array only if there are objects inside
            if (letterArray.length > 0) {
                musiciansByLetter.push({
                    asciiChar: asciiChar,
                    musicians: letterArray})
            }
        }
        return musiciansByLetter
    }
    const musicianDocument = getMusiciansByCharacter();
    console.log(musicianDocument);

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
                            {group.asciiChar}
                        </h1>

                        {group.musicians.map((musician, i) => (
                            <p>{musician.lastName.trim()}, {musician.firstName.trim()}</p>
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

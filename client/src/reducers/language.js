import {
    LANGUAGE_CHANGE,
    LANGUAGE_ERROR
} from '../actions/types';
import detectBrowserLanguage from 'detect-browser-language';

function languageFilter(language) {
    var chosenLanguage = ''

    // Check if there is an input argument, if not use detection
    if (!language) {
        const initialLanguage = detectBrowserLanguage();
        if (initialLanguage.substring(0,2) === 'en') {
            chosenLanguage = 'en';
        } else if (initialLanguage.substring(0,2) === 'pt') {
            chosenLanguage = 'pt';
        } else if (initialLanguage.substring(0,2) === 'es') {
            chosenLanguage = 'es';
        } else {
            chosenLanguage = 'es';
        }
    } else {
        chosenLanguage = language;
    }
    if (['es', 'en', 'pt'].includes(chosenLanguage)) {
        return chosenLanguage
    } else {
        // Default will be Spanish
        return 'es'
    }
}

const initialState = {
    languageCode: languageFilter(),
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LANGUAGE_CHANGE:
            return {
                ...state,
                languageCode: payload,
            };
        case LANGUAGE_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }

}

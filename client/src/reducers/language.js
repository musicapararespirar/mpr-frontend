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
        throw "Language not in supported list";
    }
}

const initialState = {
    languageCode: languageFilter(),
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LANGUAGE_CHANGE:
            return {
                ...state,
                languageCode: payload,
                loading: false
            };
        case LANGUAGE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }

}

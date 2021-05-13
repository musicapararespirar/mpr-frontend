import {
    LANGUAGE_CHANGE
} from '../actions/types';
import detectBrowserLanguage from 'detect-browser-language';

const initialState = {
    languageCode: detectBrowserLanguage(),
    loading: true
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
        default:
            return state;
    }

}

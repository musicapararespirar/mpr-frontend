import {
    LANGUAGE_CHANGE
} from './types';

export const setLanguage = languageCode => async dispatch => {
    var newCode = ''
    if (languageCode === 'en-GB') {
        newCode = 'en';
    }
    else { newCode = 'en' }

    dispatch({
        type: LANGUAGE_CHANGE,
        payload: { languageCode: newCode }
    });
}

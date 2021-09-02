import {
    LANGUAGE_CHANGE,
    LANGUAGE_ERROR
} from './types';

export const setLanguage = languageCode => async dispatch => {
    try {
        dispatch({
            type: LANGUAGE_CHANGE,
            payload: languageCode
        });
    } catch(err) {
        dispatch({
            type: LANGUAGE_ERROR,
            payload: {
                msg: err.response,
                status: err.response
            }
        });
    }
}

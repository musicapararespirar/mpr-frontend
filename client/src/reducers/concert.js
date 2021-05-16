import {
    GET_CONCERTS,
    GET_CONCERT,
    GET_CONCERT_RESPONSE,
    CONCERT_ERROR,
    DELETE_CONCERT,
    REQUEST_CONCERT
} from '../actions/types';

const initialState = {
    concerts: [],
    concert: null,
    loading: true,
    error: {},
    request: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_CONCERTS:
            return {
                ...state,
                concerts: payload,
                loading: false
            };
        case GET_CONCERT_RESPONSE:
        case GET_CONCERT:
            return {
                ...state,
                concert: payload,
                loading: false
            };
        case REQUEST_CONCERT:
            return {
                ...state,
                request: payload,
                loading: false
            };
        case DELETE_CONCERT:
            return {
                ...state,
                concerts: state.concerts.filter(concert => concert._id !== payload),
                loading: false
            };
        case CONCERT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

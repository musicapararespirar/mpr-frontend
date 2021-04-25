import {
    GET_CONCERTS,
    GET_CONCERT,
    CONCERT_ERROR,
    DELETE_CONCERT,
    ADD_CONCERT
} from '../actions/types';

const initialState = {
    concerts: [],
    concert: null,
    loading: true,
    error: {}
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
        case GET_CONCERT:
            return {
                ...state,
                concert: payload,
                loading: false
            };
        case ADD_CONCERT:
            return {
                ...state,
                concerts: [
                payload,
                ...state.concerts
                ],
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

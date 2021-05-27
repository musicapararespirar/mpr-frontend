import {
    GET_LOCATION,
    LOCATION_ERROR,
} from '../actions/types';

const initialState = {
    latitude: null,
    longitude: null,
    location: null,
    timezone: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_LOCATION:
            return {
                ...state,
                latitude: payload.latitude,
                longitude: payload.longitude,
                location: payload.location,
                timezone: payload.timezone
            };
        case LOCATION_ERROR:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
}

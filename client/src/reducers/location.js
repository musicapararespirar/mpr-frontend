import {
    GET_LOCATION,
    LOCATION_ERROR,
} from '../actions/types';
import momentTZ from 'moment-timezone';

const initialState = {
    latitude: null,
    longitude: null,
    location: null,
    timezoneLocal: momentTZ.tz.guess(),
    timezoneChosen: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_LOCATION:
            return {
                ...state,
                latitude: payload.latitude,
                longitude: payload.longitude,
                name: payload.location,
                timezoneLocal: momentTZ.tz.guess(),
                timezoneChosen: payload.timezone
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

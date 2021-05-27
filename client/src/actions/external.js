import axios from 'axios';
import {
    GET_LOCATION,
    LOCATION_ERROR
} from './types';

// Get concert by ID
export const getLocationFromId = locationData => async dispatch => {
    try {
        console.log(locationData);
        if(locationData) {
            const res = await axios.get(`/api/external/location/${locationData.value.place_id}`);
            console.log(res);
            dispatch({
                type: GET_LOCATION,
                payload: res.data
            });
        }
        console.log(locationData);
    } catch(err) {
        dispatch({
            type: LOCATION_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

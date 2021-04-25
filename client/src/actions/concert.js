import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_CONCERT,
    GET_CONCERTS,
    CONCERT_ERROR,
    DELETE_CONCERT,
    ADD_CONCERT,
} from './types';

// Get concerts
export const getConcerts = () => async dispatch => {
    try {
        const res = await axios.get('/api/concert');
        dispatch({
            type: GET_CONCERTS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: CONCERT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

// Get concert by ID
export const getConcertById = concertId => async dispatch => {
    try {
        const res = await axios.get(`/api/concert/${concertId}`);

        dispatch({
            type: GET_CONCERT,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: CONCERT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
// Delete concert
// export const deletePost = id => async dispatch => {
//     try {
//         const res = await axios.delete(`/api/posts/${id}`);
//
//         dispatch({
//             type: DELETE_POST,
//             payload: id
//         });
//
//         dispatch(setAlert('Post Removed', 'success'));
//
//     } catch(err) {
//         dispatch({
//             type: POST_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 status: err.response.status
//             }
//         });
//     }
// }

// Add concert
// export const addPost = formData => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//
//     try {
//         const res = await axios.post('/api/posts', formData, config);
//
//         dispatch({
//             type: ADD_POST,
//             payload: res.data
//         });
//
//         dispatch(setAlert('Post Created', 'success'));
//
//     } catch(err) {
//         dispatch({
//             type: POST_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 status: err.response.status
//             }
//         });
//     }
// }

// Get concert
// export const getPost = id => async dispatch => {
//     try {
//         const res = await axios.get(`/api/posts/${id}`);
//
//         dispatch({
//             type: GET_POST,
//             payload: res.data
//         });
//     } catch(err) {
//         dispatch({
//             type: POST_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 status: err.response.status
//             }
//         });
//     }
// }

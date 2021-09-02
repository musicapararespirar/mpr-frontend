import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import concert from './concert';
import language from './language';
import location from './location';

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    concert,
    language,
    location
});

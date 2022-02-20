import { combineReducers } from 'redux';
import authReducer from './features/auth';
import tripReducer from './features/trip';

export default combineReducers({
    auth: authReducer,
    trip: tripReducer
});
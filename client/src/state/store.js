import { createStore } from 'redux';
import reducer from './rootReducers';

const store = createStore(reducer);

export default store;
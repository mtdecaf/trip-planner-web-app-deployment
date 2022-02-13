import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducer,composedEnhancers);

export default store;
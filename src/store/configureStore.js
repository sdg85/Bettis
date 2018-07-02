import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import fixturesReducer from './reducers/fixtures';
import bets from './reducers/bets';
import auth from './reducers/auth';

const rootReducer = combineReducers({
    betsReducer: bets,
    fixturesReducer: fixturesReducer,
    auth: auth
});

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
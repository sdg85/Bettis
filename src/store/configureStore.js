import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import fixturesReducer from './reducers/fixtures';
import betsReducer from './reducers/bets';
import auth from './reducers/auth';
import standings from './reducers/standings';
import usersReducer from './reducers/users';

const rootReducer = combineReducers({
    betsReducer,
    fixturesReducer,
    auth,
    standings,
    usersReducer
});

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
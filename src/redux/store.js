import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import contactReducer from './contact-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    contact: contactReducer,
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;
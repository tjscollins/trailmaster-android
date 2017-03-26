import {compose, applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {UIReducer, userSessionReducer, geoJSONReducer, trailsReducer} from './reducers';

const configureStore = (initialState = {}) => {
  const reducer = combineReducers({UI: UIReducer, userSession: userSessionReducer, geoJSON: geoJSONReducer, trails: trailsReducer});

  const store = createStore(reducer, initialState, compose(applyMiddleware(thunk), window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f));

  return store;
};

export default configureStore;

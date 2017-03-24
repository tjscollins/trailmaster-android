// Index.android.js -- place code in here for Android

/* ----------Modules---------- */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({});

/*----------Components----------*/
import Trailmaster from './src/trailmaster';

/*----------Redux----------*/
import configureStore from './src/redux/configureStore';
import * as actions from './src/redux/actions';

/*----------API----------*/
import {positionChanged} from './src/api/TrailmasterAPI';

const initialState = {
  UI: {
    minimizedHeader: true,
    currentView: 'map'
  },
  userSession: {
    visibleFeatures: [],
    distanceFilter: 50,
    trackingRoute: false,
    routeList: [],
    mapCentering: false,
    coords: {
      latitude: 0,
      longitude: 0
    }
  }
};

const store = configureStore(initialState);

//Initialize User Location Monitoring
const processGeolocation = (pos) => {
  const {userSession: {coords: {latitude, longitude}}} = store.getState();
  if(positionChanged({latitude, longitude}, pos, 1)) {
    console.log('positionChanged', pos);
    store.dispatch(actions.updatePOS(pos));
  }
  // if (store.getState().userSession.trackingRoute)
  //   store.dispatch(actions.addToRouteList(pos));
  };

const geolocationError = (err) => {
  console.error('Error tracking user position', err);
};

navigator
  .geolocation
  .watchPosition(processGeolocation,
  geolocationError, {
    timeout: 60000,
    // enableHighAccuracy: true,
    // distanceFilter: 5,
  });

// Create a Component
const App = () => (
  <Provider store={store}>
    <Trailmaster/>
  </Provider>
);

// Render Component
AppRegistry.registerComponent('Trailmaster', () => App);

export default App;

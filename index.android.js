// Index.android.js -- place code in here for Android

/* ----------Modules---------- */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
  $visibleFeatureColor: 'hsl(120, 25%, 75%)',
  $featureMarkerColor: 'hsl(0, 35%, 75%)',
  $positionMarkerColor: 'blue',
  $homeScreenButtonHeight: 130,
  $primaryButtonColor: '#428bca',
  $infoButtonColor: '#5bc0de',
  $successButtonColor: '#5cb85c',
  $warningButtonColor: '#f0ad4e',
  $dangerButtonColor: '#d9534f',
});

/*----------Components----------*/
import Trailmaster from './src/trailmaster';

/*----------Redux----------*/
import configureStore from './src/redux/configureStore';
import * as actions from './src/redux/actions';

/*----------API----------*/
import {positionChanged, fetchData, validateServerData} from './src/api/TrailmasterAPI';

const initialState = {
  UI: {
    minimizedHeader: false,
    currentView: 'home'
  },
  userSession: {
    visibleFeatures: [],
    distanceFilter: 50,
    trackingRoute: false,
    routeList: [],
    mapCentering: false,
    coords: {
      latitude: 15.15,
      longitude: 145.7
    }
  },
  geoJSON: {
    features: [],
  }
};

const store = configureStore(initialState);
fetchData(initialState.userSession.coords.latitude, initialState.userSession.coords.longitude, initialState.userSession.distanceFilter).then((features) => {
  // console.log('Fetching data near: ', pos.coords, 'within: ', distanceFilter);
  console.log('Received features', features);
  store.dispatch(actions.replaceGeoJSON(features));
}).catch((error) => {
  throw error;
});

//Initialize User Location Monitoring
const processGeolocation = (pos) => {
  const {userSession: {coords: {latitude, longitude}, distanceFilter}} = store.getState();
  const ONE_TENTH = 528; // Convert miles to one tenth distance in feet
  if(positionChanged({latitude, longitude}, pos, 5)) {
    console.log('positionChanged', pos);
    store.dispatch(actions.updatePOS(pos));
  }
  if(positionChanged({latitude, longitude}, pos, distanceFilter*ONE_TENTH)) {
    fetchData(pos.coords.latitude, pos.coords.longitude, distanceFilter).then((features) => {
      console.log('Fetching data near: ', pos.coords, 'within: ', distanceFilter);
      console.log('Received features', features);
      store.dispatch(actions.replaceGeoJSON(features));
    }).catch((error) => {
      throw error;
    });
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

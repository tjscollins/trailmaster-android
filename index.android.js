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

const initialState = {
  UI: {
    minimizedHeader: true,
    currentView: 'map',
  }
};

const store = configureStore(initialState);

// Create a Component
const App = () =>  (
  <Provider store={store}>
    <Trailmaster />
  </Provider>
);

// Render Component
AppRegistry.registerComponent('Trailmaster', () => App);

export default App;

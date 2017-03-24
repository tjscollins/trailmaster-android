// Index.android.js -- place code in here for Android

/* ----------Modules---------- */
import React from 'react';
import {AppRegistry, View} from 'react-native';
import {Provider} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
});

/*----------Components----------*/
import Header from './src/components/Header';
import FeatureList from './src/components/FeatureList';
import MapViewer from './src/components/MapViewer';

/*----------Redux----------*/
import configureStore from './src/redux/configureStore';

const initialState = {
  UI: {
    minimizedHeader: true,
  }
};

const store = configureStore(initialState);

// Create a Component
const App = () =>  (
  <Provider store={store}>
    <View style={{flex: 1}}>
      <MapViewer />
      <Header headerText={'Trailmaster'}/>
      {/* <SearchModal /> */}
      {/* <FeatureList /> */}
    </View>
  </Provider>
);

// Render Component
AppRegistry.registerComponent('Trailmaster', () => App);

export default App;

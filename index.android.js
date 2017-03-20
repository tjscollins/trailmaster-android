// Index.android.js -- place code in here for Android

/* ----------Modules---------- */
import React from 'react';
import {AppRegistry, View} from 'react-native';

/*----------Components----------*/
import Header from './src/components/Header';
import FeatureList from './src/components/FeatureList';
// import MapViewer from './src/components/MapViewer';

// Create a Component
const App = () =>  (
  <View>
    <Header headerText={'Trailmaster'}/>
    {/* <SearchModal /> */}
    <FeatureList />
    {/* <MapViewer /> */}
  </View>
);

// Render Component
AppRegistry.registerComponent('Trailmaster', () => App);

export default App;

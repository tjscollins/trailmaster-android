// Index.android.js -- place code in here for Android

/* ----------Modules---------- */
import React from 'react';
import {AppRegistry, View} from 'react-native';

/*----------Components----------*/
import Header from './src/components/Header';
import Controls from './src/components/Controls';

// Create a Component
const App = () =>  (
  <View>
    <Header headerText={'Trailmaster'}/>
    <Controls />
  </View>
);

// Render Component
AppRegistry.registerComponent('Trailmaster', () => App);

export default App;

/* ----------Modules---------- */
import React, { Component } from 'react';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';
import MapView from 'react-native-maps';

import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView
} from 'react-native';

// const accessToken = 'pk.eyJ1IjoidGpzY29sbGlucyIsImEiOiJjaXdhZjl4b3AwM2h5MzNwbzZ0eDg0YWZsIn0.uR5NCLn73_X2M9PxDO_4KA';
// Mapbox.setAccessToken(accessToken);

const styles = {
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1
  }
};

class MapViewer extends Component {
  render() {
    console.log('Rendering Map');
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

export default MapViewer;

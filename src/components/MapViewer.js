/* ----------Modules---------- */
import React, { Component } from 'react';
// import Mapbox, { MapView } from 'react-native-mapbox-gl';
import MapView from 'react-native-maps';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  Text,
  StatusBar,
  View,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';

// const accessToken = 'pk.eyJ1IjoidGpzY29sbGlucyIsImEiOiJjaXdhZjl4b3AwM2h5MzNwbzZ0eDg0YWZsIn0.uR5NCLn73_X2M9PxDO_4KA';
// Mapbox.setAccessToken(accessToken);

class MapViewer extends Component {
  render() {
    const {coords: {latitude, longitude}} = this.props.userSession;
    console.log('Rendering Map', typeof latitude, latitude, typeof longitude, longitude);
    const styles = EStyleSheet.create({
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
      marker: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      positionMarker: {
        width: 5,
        height: 5,
        borderRadius: 100,
        backgroundColor: 'blue',
      },
      labelMarker: {
        fontSize: 10,
      }
    })
    const mapRegion = {
      latitude, longitude, longitudeDelta: 0.1, latitudeDelta: 0.05,
    };
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChange={() => {}}
        >
          <MapView.Marker style={styles.marker} coordinate={{latitude, longitude} } title={'You Are Here'}>
            <View style={styles.positionMarker}>
            </View>
            <Text style={styles.labelMarker}>
              You
            </Text>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

MapViewer.propTypes = {
  userSession: React.PropTypes.object,
}

export default connect(state => state)(MapViewer);

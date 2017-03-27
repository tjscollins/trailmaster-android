/* ----------Modules---------- */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';

/*----------Redux----------*/
import * as actions from '../redux/actions';

/*----------Component----------*/
import Header from './Header';
import SaveButton from './SaveButton';

/*----------StyleSheet----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

// const accessToken =
// 'pk.eyJ1IjoidGpzY29sbGlucyIsImEiOiJjaXdhZjl4b3AwM2h5MzNwbzZ0eDg0YWZsIn0.uR5NCL
// n73_X2M9PxDO_4KA'; Mapbox.setAccessToken(accessToken);

class MapViewer extends Component {
  displayVisibleFeatures() {
    const {userSession: {
        visibleFeatures
      }, geoJSON: {
        features
      }} = this.props;
    const displayed = features.filter((feature) => {
      return visibleFeatures.indexOf(feature._id) > -1;
    });
    const array = displayed.map((feature) => {
      const {type, coordinates} = feature.geometry;
      const {name} = feature.properties;
      const styles = EStyleSheet.create({
        marker: {
          justifyContent: 'center',
          alignItems: 'center'
        },
        featureMarker: {
          width: 5,
          height: 5,
          borderRadius: 100,
          backgroundColor: '$featureMarkerColor'
        },
        labelMarker: {
          fontSize: 10,
          color: '$mapLabelColor',
        }
      });
      const lineStyle = {
        strokeColor: 'hsl(0, 50%, 40%)',
      };
      if (type === 'Point') {
        const coords = {
          latitude: coordinates[1],
          longitude: coordinates[0]
        };
        return (
          <MapView.Marker
            key={feature._id + 'map-marker'}
            style={styles.marker}
            coordinate={coords}>
            <Text style={styles.labelMarker}>
              {name}
            </Text>
            <View style={styles.featureMarker}></View>
          </MapView.Marker>
        );
      } else if (type === 'LineString') {
        const coords = coordinates.map(([longitude, latitude]) => {
          return {longitude, latitude};
        });
        return (
          <View key={feature._id + 'map-marker'}>
            <MapView.Polyline strokeColor={lineStyle.strokeColor} lineCap={lineStyle.lineCap} coordinates={coords}/>
            <MapView.Marker coordinate={coords[0]}>
              <Text style={styles.labelMarker}>
                {name}
              </Text>
            </MapView.Marker>
          </View>
        );
      }
    });
    console.log('Displaying Features: ', array);
    return array;
  }
  storeRegion(newRegion) {
    const {mapRegion} = this.props.userSession;
    console.log('Storing region: ', newRegion);
    if (mapRegion.latitude !== newRegion.latitude
      || mapRegion.longitude !== newRegion.longitude) {
        this
        .props
        .dispatch(actions.storeRegion(newRegion));
      }
  }
  render() {
    const {
      coords: {
        latitude,
        longitude
      }
    } = this.props.userSession;
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
        alignItems: 'center'
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      marker: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      positionMarker: {
        width: 5,
        height: 5,
        borderRadius: 100,
        backgroundColor: '$positionMarkerColor'
      },
      labelMarker: {
        fontSize: 10
      }
    })
    const initRegion = {
      latitude,
      longitude,
      longitudeDelta: 0.1,
      latitudeDelta: 0.05
    };
    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={initRegion}
            mapType={'terrain'}
            showsUserLocation={true}
            showsScale={true}
            onRegionChangeComplete={this
              .storeRegion
              .bind(this)}>
            {this.displayVisibleFeatures()}
          </MapView>
        </View>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>
        <SaveButton/>
      </View>
    );
  }
}

MapViewer.propTypes = {
  userSession: React.PropTypes.object,
  dispatch: React.PropTypes.func
}

export default connect(state => state)(MapViewer);

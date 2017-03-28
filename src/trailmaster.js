/* ----------Modules---------- */
import React from 'react';
import Router from 'react-native-simple-router';
import {View, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

/*----------Components----------*/
// import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import BusyIndicator from 'react-native-busy-indicator';
import * as actions from './redux/actions';

/**
 * Router Object
 */
 const homeRoute = {
   name: 'HomeScreen',
   component: HomeScreen,
   statusBarProps: {
     hidden: true,
   },
 };

class Trailmaster extends React.Component {
  componentWillMount() {
    const {userSession, geoJSON} = this.props;
    if(!userSession.coords.latitude) {
      this.loadCachedGPS();
    }
    if(!userSession.xAuth) {
      this.loadLoginData();
    }
    if(geoJSON.features.length == 0) {
      this.loadCachedGeoJSON();
    }
  }
  async loadCachedGeoJSON() {
    const features = await AsyncStorage.getItem('geoJSON-features');
    if (features.length > 0) {
      this.props.dispatch(actions.replaceGeoJSON(JSON.parse(features)));
    }
  }
  async loadCachedGPS() {}
  async loadLoginData() {
    const {dispatch} = this.props;
    const authInfo = await AsyncStorage.getItem('trailmaster-login');
    if (authInfo) {
      const {xAuth, _id, email} = JSON.parse(authInfo)
      dispatch(actions.login(xAuth, _id, email));
      const trails = await AsyncStorage.getItem(`trails-${email}`);
      if (trails.length > 0) {
        dispatch(actions.displayTrails(JSON.parse(trails)));
      }
    }
  }
  render() {
    const styles = EStyleSheet.create({
      bgStyle: {
        backgroundColor: '#eee',
      }
    });
    return (
      <View style={{flex: 1}}>
        <Router noStatusBar hideNavigationBar handleBackAndroid bgStyle={styles.bgStyle} firstRoute={homeRoute} />
        <BusyIndicator />
      </View>
    );
  }
}

Trailmaster.propTypes = {
  UI: React.PropTypes.object,
  userSession: React.PropTypes.object,
  geoJSON: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect(state => state)(Trailmaster);

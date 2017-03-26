/* ----------Modules---------- */
import React from 'react';
import Router from 'react-native-simple-router';
import {View} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

/*----------Components----------*/
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';

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
  render() {
    const styles = EStyleSheet.create({
      bgStyle: {
        backgroundColor: '#eee',
      }
    });
    return (
      <View style={{flex: 1}}>
        <Router noStatusBar hideNavigationBar handleBackAndroid bgStyle={styles.bgStyle} firstRoute={homeRoute} />
      </View>
    );
  }
}

Trailmaster.propTypes = {
  UI: React.PropTypes.object
};

export default connect(state => state)(Trailmaster);

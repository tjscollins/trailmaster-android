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
 * Router Objects
 */
 const homeRoute = {
   name: 'HomeScreen',
   component: HomeScreen,
   statusBarProps: {
     hidden: true,
   }
 };

class Trailmaster extends React.Component {
  render() {
    const styles = EStyleSheet.create({
      bgStyle: {
        backgroundColor: '#eee',
      }
    });
    return (
      <View style={{
        flex: 1
      }}>
        {/* <Header headerText={'Trailmaster'}/> */}
        <Router noStatusBar hideNavigationBar bgStyle={styles.bgStyle} firstRoute={homeRoute} />
      </View>
    );
    // return ((currentView) => {
    //   switch (currentView) {
    //     case 'map':
    //       return (
            // <View style={{
            //   flex: 1
            // }}>
            //   <MapViewer/>
            //   <Header headerText={'Trailmaster'}/>
            // </View>
    //       );
    //     case 'search':
    //       return (
    //         <View style={{
    //           flex: 1
    //         }}>
    //           <Header headerText={'Trailmaster'}/>
    //           <FeatureList/>
    //         </View>
    //       );
    //     case 'home':
    //       return (
    //         <View style={{
    //           flex: 1
    //         }}>
    //           <Header headerText={'Trailmaster'}/>
    //           <HomeScreen/>
    //         </View>
    //       );
    //     default:
    //       return;
    //   }
    // })(this.props.UI.currentView);
  }
}

Trailmaster.propTypes = {
  UI: React.PropTypes.object
};

export default connect(state => state)(Trailmaster);

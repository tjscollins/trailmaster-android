/* ----------Modules---------- */
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

/*----------Components----------*/
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import FeatureList from './components/FeatureList';
import MapViewer from './components/MapViewer';

class Trailmaster extends React.Component {
  render() {
    return ((currentView) => {
      switch (currentView) {
        case 'map':
          return (
            <View style={{
              flex: 1
            }}>
              <MapViewer/>
              <Header headerText={'Trailmaster'}/>
            </View>
          );
        case 'search':
          return (
            <View style={{
              flex: 1
            }}>
              <Header headerText={'Trailmaster'}/>
              <FeatureList/>
            </View>
          );
        case 'home':
          return (
            <View style={{
              flex: 1
            }}>
              <Header headerText={'Trailmaster'}/>
              <HomeScreen/>
            </View>
          );
        default:
          return;
      }
    })(this.props.UI.currentView);
  }
}

Trailmaster.propTypes = {
  UI: React.PropTypes.object
};

export default connect(state => state)(Trailmaster);

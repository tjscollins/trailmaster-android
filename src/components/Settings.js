/*----------React----------*/
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Components----------*/
import Header from './Header';
import Login from './Login';
import TrailList from './TrailList';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class Settings extends Component {
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>

      </View>
    );
  }
}

export default connect(state => state)(Settings);

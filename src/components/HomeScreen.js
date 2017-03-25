/*----------React----------*/
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class HomeScreen extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View>
        <Text>
          Home Screen
        </Text>
      </View>
    );
  }
}

export default connect(state => state)(HomeScreen);

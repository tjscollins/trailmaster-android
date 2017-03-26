/*----------React----------*/
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Components----------*/
import Header from './Header';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class Login extends React.Component {
  render() {
    return (
      <View>

      </View>
    );
  }
}

export default connect(state => state)(Login);

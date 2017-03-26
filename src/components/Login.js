/*----------React----------*/
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
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
    const styles = EStyleSheet.create({
      containerStyle: {
        flex: 1
      },
      loginFormStyle: {
        margin: 10,
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        padding: 10,
        paddingTop: '25%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomWidth: 1,
        // borderColor: '#ddd',

      },
      formLabel: {
        width: 75,
        marginBottom: -10,
      },
      formInput: {
        width: 250,
        textAlign: 'center',
      },
      loginButton: {
        margin: 10,
        padding: 10,
        width: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 2,
        backgroundColor: '$primaryButtonColor'
      }
    });
    return (
      <View style={styles.containerStyle}>
        <View style={styles.loginFormStyle}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Email: </Text>
            <TextInput autoFocus keyboardType={'email-address'} placeholder={'Email Address'} style={styles.formInput}/>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Password: </Text>
            <TextInput secureTextEntry autoCorrect={false} placeholder={'Password'} style={styles.formInput}/>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}></Text>
            <TouchableOpacity style={styles.loginButton}>
              <Text>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => state)(Login);

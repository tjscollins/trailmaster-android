/*----------React----------*/
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Components----------*/
import Header from './Header';
import HomeScreen from './HomeScreen';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  // emailEntry(email) {
  //   this.setState({email});
  // }
  // passwordEntry(password) {
  //   this.setState({password});
  // }
  submit() {
    const {dispatch} = this.props;
    const {password, email} = this.state;
    console.log('Login: ', email, password);
    const loginRequest = axios.post('https://trailmaster.herokuapp.com/users/login', JSON.stringify({email, password}), {
      headers: {'Content-type': 'application/json'},
    }).then((response) => {
      dispatch(actions.login(response.headers['x-auth'], response.data._id, email));
      this.setState({email: '', password: ''});
      this.props.replaceRoute({
        name: 'HomeScreen',
        component: HomeScreen,
        statusBarProps: {
          hidden: true,
        },
      })
    }).catch((error) => {
      console.log('Login error', error);
    });
  }
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
        justifyContent: 'flex-start'
      },
      formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomWidth: 1, borderColor: '#ddd',

      },
      formLabel: {
        width: 75,
        marginBottom: -10
      },
      formInput: {
        width: 250,
        textAlign: 'center'
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
      },
      buttonTextStyle: {
        color: 'white'
      }
    });
    return (
      <View style={{
        flex: 1
      }}>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>
        <View style={styles.containerStyle}>
          <View style={styles.loginFormStyle}>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Email:
              </Text>
              <TextInput
                autoFocus
                keyboardType={'email-address'}
                placeholder={'Email Address'}
                style={styles.formInput}
                onChangeText={email => this.setState({email})}/>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Password:
              </Text>
              <TextInput
                secureTextEntry
                autoCorrect={false}
                placeholder={'Password'}
                style={styles.formInput}
                onChangeText={password => this.setState({password})}/>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}></Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={this
                .submit
                .bind(this)}>
                <Text style={styles.buttonTextStyle}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default connect(state => state)(Login);

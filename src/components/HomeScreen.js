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

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class HomeScreen extends React.Component {
  constructor() {
    super();
  }
  showLogin() {
    this.props.toRoute({
      name: 'Login',
      component: Login,
      statusBarProps: {
        hidden: true
      },
    });
  }
  loginText() {
    const {email} = this.props.userSession;
    if(email) {
      return `Logged in as: ${email}`;
    } else {
      return 'Login';
    }
  }
  myTrailsText() {
    return 'My Trails Button';
  }
  savedMapsText() {
    return 'Saved Maps Button';
  }
  render() {
    const {xAuth} = this.props.userSession;
    const styles = EStyleSheet.create({
      buttonStyle: {
        aspectRatio: 2,
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderRadius: 2,
        borderWidth: 1,
        elevation: 1,
        flex: 1,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 0,
        maxHeight: '$homeScreenButtonHeight',
      },
      buttonTextStyle: {

      },
      // loginStyle: {
      //   flex: 1,
      //   backgroundColor: 'white',
      //   aspectRatio: 2,
      //   borderColor: '#ddd',
      //   borderRadius: 2,
      //   borderWidth: 1,
      //   elevation: 1,
      //   maxHeight: '$homeScreenButtonHeight',
      // },
      // myTrailsStyle: {
      //
      // },
      // savedMapsStyle: {
      //   backgroundColor: 'white',
      //   aspectRatio: 2,
      //   height: 100
      // },
      containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    });
    return (
      <View style={{flex: 1}}>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>
        <View style={styles.containerStyle}>
          {((isLoggedIn) => {
            if(isLoggedIn) {
              return (
                <TouchableOpacity>
                  <View style={styles.buttonStyle}>
                    <Text>
                      {this.myTrailsText()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })(xAuth)}
          {((isLoggedIn) => {
            if(isLoggedIn) {
              return (
                <TouchableOpacity>
                  <View style={styles.buttonStyle}>
                    <Text>
                      {this.savedMapsText()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })(xAuth)}
          <TouchableOpacity onPress={this.showLogin.bind(this)}>
            <View style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>
                {this.loginText()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  userSession: React.PropTypes.object.isRequired,
  toRoute: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
};

export default connect(state => state)(HomeScreen);

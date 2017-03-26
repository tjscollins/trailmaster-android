/*----------React----------*/
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
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

class HomeScreen extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    const {userSession} = this.props;
    if(!userSession.xAuth) {
      this.loadLoginData();
    }
  }
  async loadLoginData() {
    const {dispatch} = this.props;
    const authInfo = await AsyncStorage.getItem('trailmaster-login');
    console.log('xAuth Info: ', authInfo,);
    if (authInfo) {
      const {xAuth, _id, email} = JSON.parse(authInfo)
      console.log('xAuth Info: ', authInfo, xAuth, _id, email);
      dispatch(actions.login(xAuth, _id, email));
    }
  }
  showLogin() {
    this
      .props
      .toRoute({
        name: 'Login',
        component: Login,
        statusBarProps: {
          hidden: true
        }
      });
  }
  loginText(styles) {
    const {email} = this.props.userSession;
    if (email) {
      return (
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            Logout
          </Text>
          <Text style={styles.buttonTextStyle}>
            {email}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>
            Login
          </Text>
        </View>
      );
    }
  }
  logout() {
    this.props.dispatch(actions.logout());
  }
  myTrailsText() {
    return 'View My Trails';
  }
  savedMapsText() {
    return 'View Saved Maps';
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
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      buttonTextStyle: {
        fontWeight: 'bold',
        fontSize: 20
      },
      containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    });
    return (
      <View style={{
        flex: 1
      }}>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>
        <View style={styles.containerStyle}>
          {((isLoggedIn) => {
            if (isLoggedIn) {
              return (
                <TouchableOpacity onPress={this.props.replaceRoute.bind(this, {
                  name: 'TrailList',
                  component: TrailList,
                  statusBarProps: {
                    hidden: true
                  }
                })}>
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>
                      {this.myTrailsText()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })(xAuth)}
          {((isLoggedIn) => {
            if (isLoggedIn) {
              return (
                <TouchableOpacity>
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>
                      {this.savedMapsText()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })(xAuth)}
          <TouchableOpacity onPress={xAuth ? this.logout.bind(this) : this
            .showLogin
            .bind(this)}>
            {this.loginText(styles)}
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
  dispatch: React.PropTypes.func.isRequired,
};

export default connect(state => state)(HomeScreen);

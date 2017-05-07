/*----------Modules----------*/
import uuid from 'uuid';

/*----------React----------*/
import React, {Component, PropTypes} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Components----------*/
import Header from './Header';
import Login from './Login';
import TrailList from './TrailList';
import AddFeatureButton from './common/StandardButton';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class HomeScreen extends Component {
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
        <View style={styles.loginButtonStyle}>
          <Text style={styles.loginButtonTextStyle}>
            Logout
          </Text>
          <Text style={styles.loginButtonTextStyle}>
            {email}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.loginButtonStyle}>
          <Text style={styles.loginButtonTextStyle}>
            Login
          </Text>
        </View>
      );
    }
  }
  logout() {
    this.props.dispatch(actions.logout());
  }
  savedMapsText() {
    return 'View Saved Maps';
  }
  visibleButtons = (isLoggedIn, styles) => {
    const {replaceRoute} = this.props;
    if (isLoggedIn) {
      return [
        <AddFeatureButton
          key={uuid()}
          styles={{buttonStyle: styles.featureButtonStyle, buttonTextStyle: styles.featureButtonTextStyle}}
          text={'Add PoI'} />,
        <AddFeatureButton
          key={uuid()}
          styles={{buttonStyle: styles.featureButtonStyle, buttonTextStyle: styles.featureButtonTextStyle}}
          text={'Add Route'} />,
        <TouchableOpacity
          key={uuid()}
          onPress={replaceRoute.bind(this, {
            name: 'TrailList',
            component: TrailList,
            statusBarProps: {
              hidden: true
            }
          })}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              View My Trails
            </Text>
          </View>
        </TouchableOpacity>
      ];
    }
  }
  render() {
    const {logout, showLogin, visibleButtons, props: {replaceRoute}} = this;
    const {xAuth} = this.props.userSession;
    const styles = EStyleSheet.create({
      buttonStyle: {
        aspectRatio: 2,
        backgroundColor: '$infoButtonColor',
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
        fontSize: 20,
        color: 'white',
      },
      featureButtonStyle: {
        aspectRatio: 2,
        backgroundColor: '$primaryButtonColor',
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
      featureButtonTextStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
      },
      loginButtonStyle: {
        aspectRatio: 2,
        backgroundColor: '$dangerButtonColor',
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
      loginButtonTextStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
      },
      containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      topLevelStyle: {
        flex: 1,
      }
    });
    return (
      <View style={styles.topLevelStyle}>
        <Header toRoute={replaceRoute} headerText={'Trailmaster'}/>
        <View style={styles.containerStyle}>
          {visibleButtons(xAuth, styles)}
          <TouchableOpacity
            onPress={xAuth
              ? logout.bind(this)
              : showLogin
              .bind(this)}>
            {this.loginText(styles)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  userSession: PropTypes.object.isRequired,
  toRoute: PropTypes.func.isRequired,
  replaceRoute: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => state)(HomeScreen);

/*----------Modules----------*/
import uuid from 'uuid';

/*----------React----------*/
import React, {Component, PropTypes} from 'react';
import {Text, TextInput, View, TouchableOpacity, Modal} from 'react-native';

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
  state = {
    savePoiModalVisibile: false,
    trackRouteModalVisible: false,
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
    const {replaceRoute, userSession} = this.props;
    const savePOI = () => {
      this.setState({savePoiModalVisibile: true});
    };
    const saveRoute = () => {};
    if (isLoggedIn) {
      return [
        <AddFeatureButton
          key={uuid()}
          styles={{buttonStyle: styles.featureButtonStyle, buttonTextStyle: styles.featureButtonTextStyle}}
          text={'Save New Point of Interest'}
          onPress={savePOI}/>,
        <AddFeatureButton
          key={uuid()}
          styles={{buttonStyle: styles.featureButtonStyle, buttonTextStyle: styles.featureButtonTextStyle}}
          text={'Save New Route'}
          onPress={saveRoute} />,
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
        borderRadius: 5,
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
        borderRadius: 5,
        borderWidth: 1,
        elevation: 1,
        flex: 1,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 0,
        maxHeight: '$homeScreenButtonHeight',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      featureButtonTextStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
      },
      loginButtonStyle: {
        aspectRatio: 2,
        backgroundColor: '$dangerButtonColor',
        borderColor: '#ddd',
        borderRadius: 5,
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
      },
      modalStyle: {
        top: '25%',
        left: '25%',
        height: '50%',
        width: '50%',
        marginTop: 22,
        backgroundColor: 'white',
        alignItems: 'center'
      },
      formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      formLabel: {
        width: 75,
        marginBottom: -10
      },
      formInput: {
        width: 250,
        textAlign: 'center'
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

        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.savePoiModalVisibile}
          onRequestClose={() => {
            this.setState({savePoiModalVisibile: false})
          }}>
          <View style={styles.modalStyle}>
            <View style={styles.newPoiFormStyle}>
              <View style={styles.formRow}>
                <TextInput
                  autoFocus
                  placeholder={'Name'}
                  style={styles.formInput}
                  onChangeText={name => this.setState({name})}/>
              </View>
              <View style={styles.formRow}>
                <TextInput
                  placeholder={'Description'}
                  style={styles.formInput}
                  onChangeText={desc => this.setState({desc})}/>
              </View>
              <View style={styles.formRow}>
                <TouchableOpacity
                  style={styles.saveTrailButton}
                  onPress={function (){}}>
                  <Text style={styles.buttonTextStyle}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formRow}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({trailModalVisible: false})
                  }}>
                  <View style={styles.cancelButton}>
                    <Text style={styles.buttonTextStyle}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.trackRouteModalVisible}
          onRequestClose={() => {
            this.setState({trackRouteModalVisible: false})
          }}>
          <View style={styles.modalStyle}>
            <View style={styles.newPoiFormStyle}>
              <View style={styles.formRow}>
                <TextInput
                  autoFocus
                  placeholder={'Name'}
                  style={styles.formInput}
                  onChangeText={name => this.setState({name})}/>
              </View>
              <View style={styles.formRow}>
                <TextInput
                  placeholder={'Description'}
                  style={styles.formInput}
                  onChangeText={desc => this.setState({desc})}/>
              </View>
              <View style={styles.formRow}>
                <TouchableOpacity
                  style={styles.saveTrailButton}
                  onPress={function (){}}>
                  <Text style={styles.buttonTextStyle}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formRow}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({trailModalVisible: false})
                  }}>
                  <View style={styles.cancelButton}>
                    <Text style={styles.buttonTextStyle}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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

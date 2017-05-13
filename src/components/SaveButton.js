/*----------React----------*/
import React, {Component} from 'react';
import {View, TouchableOpacity, Modal, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Components----------*/
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

/*----------API----------*/
import {month} from '../api/TrailmasterAPI';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class SaveButton extends Component {
  state = {
    mainModalVisible: false,
    trailModalVisible: false,
    mapModalVisible: false,
    error: '',
    name: '',
    desc: '',
  }
  errorMessage() {
    const {error} = this.state;
    console.log(this.state.error);
    if (/400/.test(error)) {
      return ``;
    }
    return this.state.error;
  }
  save() {
    this.setState({mainModalVisible: true});
  }
  saveTrail() {
    const {dispatch, geoJSON, userSession} = this.props;
    const {xAuth} = userSession;
    const {name, desc} = this.state;

    const trailList = geoJSON
      .features
      .filter((point) => {
        return userSession
          .visibleFeatures
          .indexOf(point._id) > -1;
      });
      // Validate Form Fields:
      if (name.length < 1 || desc.length < 1) {
        this.setState({error: 'Both name and description of the trail are required'});
        return;
      }

      // Verify that trail is not empty
      if (trailList.length < 1) {
        this.setState({error: 'Trails must include at least one point of interest or route'});
        return;
      }
    const date = new Date();
    const newTrail = {
      list: trailList,
      name,
      desc,
      date: `${month(date.getMonth())} ${date.getFullYear()}`
    };
    this.setState({trailModalVisible: false, mainModalVisible: false});
    loaderHandler.showLoader();
    axios.post('https://trailmaster.herokuapp.com/trails', newTrail, {
      headers: {
        'Content-type': 'application/json',
        'x-auth': xAuth
      }
    }).then((newTrail) => {
      dispatch(actions.saveTrail(newTrail));
      this.setState({mainModalVisible: false, trailModalVisible: false})
      loaderHandler.hideLoader();
    }).catch((error) => {
      this.setState({trailModalVisible: true, error: error.message});
      loaderHandler.hideLoader();
      // console.error('Error posting new trail', error);
    });
  }
  saveMap() {
    const {dispatch, geoJSON, userSession} = this.props;
    const {xAuth, mapRegion} = userSession;
    const {name, desc} = this.state;
    const list = geoJSON
      .features
      .filter((point) => {
        return userSession
          .visibleFeatures
          .indexOf(point._id) > -1;
      });
    const newMap = {
      list,
      mapRegion,
      name,
      desc,
    };
    dispatch(actions.saveMap(newMap));

    /**
     * Need to implement server-route for this to work
     */
    // const send = axios.post('https://trailmaster.herokuapp.com/static-maps', newMap, {
    //   headers: {
    //     'Content-type': 'application/json',
    //     'x-auth': xAuth
    //   }
    // }).then((response) => {
    //   dispatch(actions.saveMap(newMap));
    //   this.setState({mainModalVisible: false, mapModalVisible: false})
    // }).catch((error) => {
    //   console.log('Error posting new map', error);
    // });
  }
  render() {
    // const {UI} = this.props;
    const styles = EStyleSheet.create({
      buttonStyle: {
        position: 'absolute',
        bottom: 20,
        right: 20
      },
      errorStyle: {
        color: 'red',
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
      saveButtonStyle: {
        elevation: 5,
        color: '$primaryButtonColor'
      },
      saveTrailButton: {
        margin: 10,
        padding: 10,
        width: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '$primaryButtonColor'
      },
      saveMapButton: {
        margin: 10,
        padding: 10,
        width: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '$successButtonColor'
      },
      cancelButton: {
        margin: 10,
        padding: 10,
        width: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '$dangerButtonColor'
      },
      buttonTextStyle: {
        color: 'white'
      },
      trailFormStyle: {
        margin: 10,
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
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
      <View style={styles.buttonStyle}>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.mainModalVisible}
          onRequestClose={function() {}}>
          <View>
            <View style={styles.modalStyle}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({trailModalVisible: true})
                }}>
                <View style={styles.saveButtonStyle}>
                  <Text style={styles.buttonTextStyle}>
                    Save Trail
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => {
                  this.setState({mapModalVisible: true})
                }}>
                <View style={styles.saveMapButton}>
                  <Text style={styles.buttonTextStyle}>
                    Save Map
                  </Text>
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => {
                  this.setState({mainModalVisible: false})
                }}>
                <View style={styles.cancelButton}>
                  <Text style={styles.buttonTextStyle}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.trailModalVisible}
          onRequestClose={function() {}}>
          <View style={styles.modalStyle}>
            <Text style={styles.errorStyle}>
              {this.errorMessage()}
            </Text>
            <View style={styles.trailFormStyle}>
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
                  onPress={this
                    .saveTrail
                    .bind(this)}>
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
          visible={this.state.mapModalVisible}
          onRequestClose={function() {}}>
          <View style={styles.modalStyle}>
            <View style={styles.trailFormStyle}>
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
                  style={styles.saveMapButton}
                  onPress={this
                    .saveMap
                    .bind(this)}>
                  <Text style={styles.buttonTextStyle}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formRow}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({mapModalVisible: false})
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

        <TouchableOpacity onPress={this
          .save
          .bind(this)}>
          <Icon style={styles.saveButtonStyle} name='floppy-o' size={25}/>
        </TouchableOpacity>
      </View>
    );
  }
}

SaveButton.propTypes = {
  geoJSON: React.PropTypes.object,
  userSession: React.PropTypes.object,
  dispatch: React.PropTypes.func,
}

export default connect(state => state)(SaveButton);

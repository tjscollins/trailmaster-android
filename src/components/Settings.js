/*----------React----------*/
import React, {Component} from 'react';
import {Text, View, TextInput, Picker, TouchableOpacity} from 'react-native';
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
  state = {
    trackGPS: true
  }
  render() {
    const {
      userSession: {
        distanceFilter,
        coords: {
          latitude,
          longitude
        }
      },
      replaceRoute
    } = this.props;
    const styles = EStyleSheet.create({
      settingsRowStyle: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        marginBottom: 5,
        paddingBottom: 5,
        paddingTop: 10
      },
      settingsTextBoxStyle: {
        flexDirection: 'column',
        width: 200
      },
      settingsTitleStyle: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
      },
      settingsTextStyle: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'normal'
      },
      settingsTextInputStyle: {
        flex: 1,
        textAlign: 'center'
      },
      settingsPickerStyle: {
        flex: 2
      },
      settingsPickerItemStyle: {
        textAlign: 'right'
      },
      settingsCoordBoxStyle: {
        flex: 1
      }
    });
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
        <Header toRoute={replaceRoute} headerText={'Trailmaster'}/>
        <View style={styles.settingsRowStyle}>
          <View style={styles.settingsTextBoxStyle}>
            <Text style={styles.settingsTitleStyle}>
              Distance Filter
            </Text>
            <Text style={styles.settingsTextStyle}>
              How many miles away from your current position to search for points of interest,
              routes, and trails.
            </Text>
          </View>
          <TextInput
            placeholder={`${distanceFilter} miles`}
            style={styles.settingsTextInputStyle}/>
        </View>
        <View style={styles.settingsRowStyle}>
          <View style={styles.settingsTextBoxStyle}>

            <Text style={styles.settingsTitleStyle}>
              Search Near
            </Text>
            <Text style={styles.settingsTextStyle}>
              Force the app to search for points of interest, routes, and trails near a
              different location from this device.
            </Text>
          </View>
          <View style={styles.settingsCoordBoxStyle}>
            <TextInput
              placeholder={`Lat: ${latitude}`}
              style={styles.settingsTextInputStyle}/>
            <TextInput
              placeholder={`Long: ${longitude}`}
              style={styles.settingsTextInputStyle}/>
          </View>
        </View>
        <View style={styles.settingsRowStyle}>
          <View style={styles.settingsTextBoxStyle}>
            <Text style={styles.settingsTitleStyle}>
              GPS Tracking
            </Text>
            <Text style={styles.settingsTextStyle}>
              Disabling GPS tracking may save battery life.
            </Text>
          </View>
          <View style={{flex:1}} />
          <Picker
            style={styles.settingsPickerStyle}
            itemStyle={styles.settingsPickerItemStyle}
            selectedValue={this.state.trackGPS}
            onValueChange={(bool) => this.setState({trackGPS: bool})}>
            <Picker.Item label="Enable" value={true}/>
            <Picker.Item label="Disable" value={false}/>
          </Picker>
        </View>
      </View>
    );
  }
}

Settings.propTypes = {
  userSession: React.PropTypes.object,
  replaceRoute: React.PropTypes.func
}

export default connect(state => state)(Settings);

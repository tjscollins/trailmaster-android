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
    trackGPS: true,
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>
        <View>
          <Text>
            Set Distance Filter:
          </Text>
          <TextInput />
        </View>
        <View>
          <Text>
            Search Near:
          </Text>
          <TextInput />
        </View>
        <View>
          <Text>
            GPS Tracking:
          </Text>
          <Picker
            selectedValue={this.state.trackGPS}
            onValueChange={(bool) => this.setState({trackGPS: bool})}>
            <Picker.Item label="Enable" value={true} />
            <Picker.Item label="Disable" value={false} />
          </Picker>
        </View>
      </View>
    );
  }
}

export default connect(state => state)(Settings);

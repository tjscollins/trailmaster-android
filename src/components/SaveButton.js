/*----------React----------*/
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Components----------*/
// import HomeScreen from './HomeScreen'; import FeatureList from
// './FeatureList'; import MapViewer from './MapViewer';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

class SaveButton extends Component {
  save() {
    console.log('Pressed save!');
  }
  render() {
    const {UI} = this.props;
    const styles = EStyleSheet.create({
      buttonStyle: {
        position: 'absolute',
        bottom: 20,
        right: 20,
      },
      saveButtonStyle: {
        elevation: 5,
        color: '$primaryButtonColor'
      }
    });
    return (
      <View style={styles.buttonStyle}>
        <TouchableOpacity  onPress={this
          .save
          .bind(this)}>
          <Icon style={styles.saveButtonStyle} name='floppy-o' size={20}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => state)(SaveButton);

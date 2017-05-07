/*----------React-----------*/
import React, {PropTypes} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

const AddFeatureButton = (props) => {
  const {styles, text, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.featureButtonStyle}>
        <Text style={styles.featureButtonTextStyle}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

AddFeatureButton.propTypes = {
  styles: PropTypes.object,
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default AddFeatureButton;

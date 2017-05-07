/*----------React-----------*/
import React, {PropTypes} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const StandardButton = (props) => {
  const {styles, text, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

StandardButton.propTypes = {
  styles: PropTypes.object,
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default StandardButton;

/*----------React----------*/
import React, {PropTypes} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FontAwesomeButton = (props) =>
    (
      <TouchableOpacity {...props.touchProps}>
        <Icon {...props.iconProps}/>
      </TouchableOpacity>
    );

FontAwesomeButton.propTypes = {
  touchProps: PropTypes.object,
  iconProps: PropTypes.object
};

export default FontAwesomeButton;

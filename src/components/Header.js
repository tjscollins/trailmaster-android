/*----------Modules----------*/
import React from 'react';
import {Text, View} from 'react-native';

const Header = (props) => {
  const {textStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
}

const styles = {
  textStyle: {
    fontSize: 20,
    // textAlign: center,
  },
  viewStyle: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    height: 50,
    elevation: 2,
    position: 'relative'
  }
}

export default Header;

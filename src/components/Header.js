/*----------Modules----------*/
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
  textStyle: {
    fontSize: 20,
    paddingLeft: 15,
  },
  viewStyle: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    elevation: 2,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    position: 'relative',
  },
  searchButton: {
    marginRight: 10,
    color: 'lightblue',
  },
  settingsButton: {
    marginRight: 15,
    color: '#aaa',
  }
}

const Header = ({headerText}) => {
  const {textStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{headerText}</Text>
      <View style={viewStyle}>
        <TouchableOpacity onPress={() => console.log('Pressed Search!')}>
          <Icon style={styles.searchButton} name='search' size={20}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Pressed Settings!')}>
          <Icon style={styles.settingsButton} name='cog' size={20}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default Header;

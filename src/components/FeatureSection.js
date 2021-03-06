import React from 'react';
import { View } from 'react-native';

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative',
  }
};

const FeatureSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  )
};

export default FeatureSection;

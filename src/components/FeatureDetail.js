import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import FeatureCard from './FeatureCard';
import FeatureSection from './FeatureSection';

const styles = {
  titleViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  attributeStyle: {
    flexDirection: 'row',
    padding: 5,
  },
  attributeTextStyle: {
    left: 20,
    width: 250,
  }
}

const FeatureDetail = ({feature}) => {
  const {name, desc, condition} = feature.properties;
  const {type} = feature.geometry;
  return (
    <FeatureCard>
      <FeatureSection>
        <View style={styles.titleViewStyle}>
          <View style={{width: 275}}>
            <Text style={styles.titleStyle}>{name}</Text>
          </View>
          <Icon style={{}} name={type === 'Point' ? 'map-marker' : 'road'} size={20}/>
        </View>
      </FeatureSection>

      <FeatureSection>
        <View style={styles.attributeStyle}>
          <View style={{width: 80}}>
            <Text>Description:</Text>
          </View>
          <Text style={styles.attributeTextStyle}>{desc}</Text>
        </View>
        <View style={styles.attributeStyle}>
          <View style={{width: 80}}>
            <Text>Condition:</Text>
          </View>
          <Text style={styles.attributeTextStyle}>{condition}</Text>
        </View>
      </FeatureSection>
    </FeatureCard>
  );
};

export default FeatureDetail;

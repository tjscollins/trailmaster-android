import React from 'react';
import { View, Text } from 'react-native';
import FeatureCard from './FeatureCard';
import FeatureSection from './FeatureSection';

const FeatureDetail = (props) => {
  return (
    <FeatureCard>
      <FeatureSection>
        <Text>{props.feature.properties.name}</Text>
      </FeatureSection>
      <FeatureSection>
        <Text>{props.feature.properties.name}</Text>
      </FeatureSection>
    </FeatureCard>
  );
};

export default FeatureDetail;

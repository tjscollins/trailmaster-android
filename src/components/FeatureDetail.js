/*----------React----------*/
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

/*----------Modules----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

/*----------Components----------*/
import FeatureCard from './FeatureCard';
import FeatureSection from './FeatureSection';

/*----------Redux-----------*/
import * as actions from '../redux/actions';

class FeatureDetail extends React.Component {
  constructor() {
    super();
    this.selectFeature = this
      .selectFeature
      .bind(this);
  }
  selectFeature() {
    const {dispatch, feature} = this.props;
    dispatch(actions.toggleVisibility(feature._id));
  }
  isDisplayed() {
    const {userSession, feature} = this.props;
    return userSession
      .visibleFeatures
      .indexOf(feature._id) > -1;
  }
  render() {
    const {feature} = this.props;
    const {name, desc, condition} = feature.properties;
    const {type} = feature.geometry;
    const styles = EStyleSheet.create({
      containerStyle: {
        backgroundColor: this.isDisplayed()
          ? '$visibleFeatureColor'
          : 'white',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 5,
        position: 'relative',
      },
      titleViewStyle: {
        backgroundColor: this.isDisplayed()
          ? '$visibleFeatureColor'
          : 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      titleStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333'
      },
      attributeStyle: {
        backgroundColor: this.isDisplayed()
          ? '$visibleFeatureColor'
          : 'white',
        flexDirection: 'row',
        padding: 5
      },
      attributeTextStyle: {
        left: 20,
        width: 250
      }
    });
    return (
      <FeatureCard>
        <TouchableOpacity onPress={this.selectFeature}>
          <View style={styles.containerStyle}>
            <View style={styles.titleViewStyle}>
              <View style={{
                width: 275
              }}>
                <Text style={styles.titleStyle}>{name}</Text>
              </View>
              <Icon
                style={{}}
                name={type === 'Point'
                  ? 'map-marker'
                : 'road'}
                size={20}/>
            </View>
          </View>

          <View style={styles.containerStyle}>
            <View style={styles.attributeStyle}>
              <View style={{
                width: 80
              }}>
                <Text>Description:</Text>
              </View>
              <Text style={styles.attributeTextStyle}>{desc}</Text>
            </View>
            <View style={styles.attributeStyle}>
              <View style={{
                width: 80
              }}>
                <Text>Condition:</Text>
              </View>
              <Text style={styles.attributeTextStyle}>{condition}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FeatureCard>
    );
  }
}

FeatureDetail.propTypes = {
  dispatch: React.PropTypes.func,
  feature: React.PropTypes.object,
  userSession: React.PropTypes.object,
};

export default connect(state => state)(FeatureDetail);

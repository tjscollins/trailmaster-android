/*----------Modules----------*/
import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

/*----------Components----------*/
import FeatureDetail from './FeatureDetail';
import Header from './Header';

/*----------Redux----------*/
// import * as actions from '../redux/actions';

/*----------API----------*/
// import {fetchData, validateServerData} from '../api/TrailmasterAPI';

class FeatureList extends Component {
  renderGeoJSON() {
    // console.log('FeatureList: ', this.props.geoJSON.features)
    return this
      .props
      .geoJSON
      .features
      .map((feature) => <FeatureDetail key={feature._id + 'geoJSON-list'} feature={feature}/>);
  }
  render() {
    const styles = EStyleSheet.create({
      scrollViewStyle: {},
    });
    return (
      <View style={{
        flex: 1
      }}>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>
        <ScrollView style={styles.scrollViewStyle}>
          {/* <Text>{JSON.stringify(this.props.geoJSON.features[0])}</Text> */}
          {this.renderGeoJSON()}
        </ScrollView>
      </View>
    );
  }
}



FeatureList.propTypes = {
  // dispatch: React.PropTypes.func,
  // userSession: React.PropTypes.object,
  geoJSON: React.PropTypes.object,
  replaceRoute: React.PropTypes.func,
};

export default connect(state => state)(FeatureList);

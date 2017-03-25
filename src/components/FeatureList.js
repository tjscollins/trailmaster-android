/*----------Modules----------*/
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

/*----------Components----------*/
import FeatureDetail from './FeatureDetail';

/*----------Redux----------*/
// import * as actions from '../redux/actions';

/*----------API----------*/
// import {fetchData, validateServerData} from '../api/TrailmasterAPI';

class FeatureList extends Component {
  renderGeoJSON() {
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
      <ScrollView style={styles.scrollViewStyle}>
        {this.renderGeoJSON()}
      </ScrollView>
    );
  }
}



FeatureList.propTypes = {
  // dispatch: React.PropTypes.func,
  // userSession: React.PropTypes.object,
  geoJSON: React.PropTypes.object,
};

export default connect(state => state)(FeatureList);

/*----------Modules----------*/
import React, {Component} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
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
  state = {
    searchText: '',
  }
  renderGeoJSON() {
    return this
      .props
      .geoJSON
      .features
      .filter(({properties:{name}}) => name.match(new RegExp(this.state.searchText, 'i')))
      .map((feature) => <FeatureDetail key={feature._id + 'geoJSON-list'} feature={feature}/>);
  }
  render() {
    const styles = EStyleSheet.create({
      scrollViewStyle: {},
      searchBoxStyle: {
        height: 50,
        backgroundColor: 'white',
        marginBottom: 0,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
      },
      searchTextInput: {
        textAlign: 'center',
      }
    });
    return (
      <View style={{
        flex: 1
      }}>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>
        <View style={styles.searchBoxStyle}>
          <TextInput
            placeholder={'Search'}
            value={this.state.searchText}
            style={styles.searchTextInput}
            onChangeText={(searchText) => this.setState({searchText})} />
        </View>
        <ScrollView style={styles.scrollViewStyle}>
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

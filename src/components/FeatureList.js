/*----------Modules----------*/
import React, {Component} from 'react';
import {View, ScrollView, AsyncStorage, TextInput} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import axios from 'axios';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

/*----------Components----------*/
import FeatureDetail from './FeatureDetail';
import Header from './Header';
import FontAwesomeButton from './common/FontAwesomeButton';
import * as actions from '../redux/actions';

/*----------Redux----------*/
// import * as actions from '../redux/actions';

/*----------API----------*/
import {fetchData, validateServerData} from '../api/TrailmasterAPI';

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
  reloadGeoJSON(props) {
    const {features} = props
      ? props.geoJSON
      : this.props.geoJSON;
    if (features.length === 0) {
      const {coords: {latitude, longitude}, distanceFilter} = this.props.userSession;
      const {geoJSON, dispatch} = this.props;
      fetchData(latitude, longitude, distanceFilter)
        .then((newFeatures) => {
          if (newFeatures.length !== geoJSON.features.length) {
            AsyncStorage.setItem(`geoJSON-features`, JSON.stringify(newFeatures));
            dispatch(actions.replaceGeoJSON(newFeatures));
            console.log('Success!');
          }
          loaderHandler.hideLoader();
        })
        .catch((error) => {
          console.error('Error fetching geoJSON features: ', error);
        });
    } else {
      loaderHandler.hideLoader();
    }
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
      },
      refreshButtonStyle: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 40
      },
      refreshIconStyle: {
        elevation: 5,
        color: '$primaryButtonColor'
      }
    });
    const refreshButtonProps = {
      touchProps: {
        onPress: () => {
          loaderHandler.showLoader();
          this.reloadGeoJSON({
            geoJSON: {
              features: [],
            },
          });
        },
      },
      iconProps: {
        style: styles.refreshIconStyle,
        name: 'refresh',
        size: 30
      }
    };
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
        <View style={styles.refreshButtonStyle}>
          <FontAwesomeButton {...refreshButtonProps}/>
        </View>
      </View>
    );
  }
}



FeatureList.propTypes = {
  dispatch: React.PropTypes.func,
  userSession: React.PropTypes.object,
  geoJSON: React.PropTypes.object,
  replaceRoute: React.PropTypes.func,
};

export default connect(state => state)(FeatureList);

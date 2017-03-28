/*----------Modules----------*/
import React, {Component} from 'react';
import {View, ScrollView, AsyncStorage, TextInput} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import axios from 'axios';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

/*----------Components----------*/
import TrailDetail from './TrailDetail';
import Header from './Header';
import FontAwesomeButton from './common/FontAwesomeButton';

/*----------Redux----------*/
import * as actions from '../redux/actions';

/*----------API----------*/
// import {fetchData, validateServerData} from '../api/TrailmasterAPI';

class TrailList extends Component {
  constructor() {
    super();
    this.state = {
      // trails: [],
      searchText: ''
    }
  }
  loadTrailsFromProps(props) {
    const {myTrails} = props
      ? props.trails
      : this.props.trails;
    if (myTrails.length === 0) {
      const {xAuth, email} = this.props.userSession;
      const {trails, dispatch} = this.props;
      axios
        .get('https://trailmaster.herokuapp.com/trails', {
        headers: {
          'x-auth': xAuth
        }
      })
        .then((response) => {
          const newTrails = response.data.trails;
          if (newTrails.length !== trails.myTrails.length) {
            AsyncStorage.setItem(`trails-${email}`, JSON.stringify(newTrails));
            dispatch(actions.displayTrails(newTrails));
          }
          loaderHandler.hideLoader();
        })
        .catch((error) => {
          console.error('Error fetching trails: ', error);
        });
    } else {
      loaderHandler.hideLoader();
    }
  }
  componentWillMount() {
    loaderHandler.showLoader('Loading');
    this.loadTrailsFromProps(null);
  }
  componentWillReceiveProps(nextProps) {
    this.loadTrailsFromProps(nextProps);
  }
  render() {
    const {myTrails} = this.props.trails;
    const styles = EStyleSheet.create({
      scrollViewStyle: {},
      searchBoxStyle: {
        height: 50,
        backgroundColor: 'white',
        marginBottom: 0,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0'
      },
      searchTextInput: {
        textAlign: 'center'
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
          loaderHandler.showLoader('Loading');
          this.loadTrailsFromProps({
            trails: {
              myTrails: []
            }
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
            onChangeText={(searchText) => this.setState({searchText})}/>
        </View>
        <ScrollView style={styles.scrollViewStyle}>
          {myTrails.filter(({name}) => name.match(new RegExp(this.state.searchText, 'i'))).map((trail) => <TrailDetail
            replaceRoute={this.props.replaceRoute}
            key={trail._id + 'trail-list'}
            trail={trail}/>)}
        </ScrollView>
        <View style={styles.refreshButtonStyle}>
          <FontAwesomeButton {...refreshButtonProps}/>
        </View>
      </View>
    );
  }
}

TrailList.propTypes = {
  dispatch: React.PropTypes.func,
  userSession: React.PropTypes.object,
  // geoJSON: React.PropTypes.object,
  trails: React.PropTypes.object,
  replaceRoute: React.PropTypes.func
};

export default connect(state => state)(TrailList);

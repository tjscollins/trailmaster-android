/*----------Modules----------*/
import React, {Component} from 'react';
import {View, ScrollView, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import axios from 'axios';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

/*----------Components----------*/
import TrailDetail from './TrailDetail';
import Header from './Header';

/*----------Redux----------*/
import * as actions from '../redux/actions';

/*----------API----------*/
// import {fetchData, validateServerData} from '../api/TrailmasterAPI';

class TrailList extends Component {
  constructor() {
    super();
    this.state = {
      trails: []
    }
  }
  loadTrailsFromProps(props) {
    const myTrails = props ? props.trails.myTrails : this.props.trails.myTrails;
    if(this.state.trails.length !== myTrails.length) {
      const trails = myTrails.map((trail) => <TrailDetail
        replaceRoute={this.props.replaceRoute}
        key={trail._id + 'trail-list'}
        trail={trail}/>);
        if (trails.length > 0) {
          loaderHandler.hideLoader();
        }
        this.setState({trails});
      } else if (this.state.trails.length === 0) {
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
          })
          .catch((error) => {
            console.error('Error fetching trails: ', error);
          });
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
    const styles = EStyleSheet.create({scrollViewStyle: {}});
    return (
      <View style={{flex: 1}}>
        <Header toRoute={this.props.replaceRoute} headerText={'Trailmaster'}/>
        <ScrollView style={styles.scrollViewStyle}>
          {this.state.trails}
        </ScrollView>
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

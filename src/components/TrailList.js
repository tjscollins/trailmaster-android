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
      featureList: [],
      trails: []
    }
    loaderHandler.showLoader('Loading');
  }
  componentWillMount() {
    if(this.state.trails.length !== this.props.trails.myTrails.length) {
      console.log('TrailList: ', this.state.trails, typeof this.props.trails.myTrails)
      const trails = this.props.trails.myTrails.map((trail) => <TrailDetail
        replaceRoute={this.props.replaceRoute}
        key={trail._id + 'trail-list'}
        trail={trail}/>);
        if (trails.length > 0) {
          loaderHandler.hideLoader();
        }
        this.setState({trails});
    }
  }
  componentDidMount() {
    const {xAuth, email} = this.props.userSession;
    const {trails, dispatch, replaceRoute} = this.props;
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
          const trailList = newTrails.map((trail) => <TrailDetail
            replaceRoute={replaceRoute}
            key={trail._id + 'trail-list'}
            trail={trail}/>);
          this.setState({trails: trailList});
        }
      })
      .catch((error) => {
        console.log('Error fetching trails: ', error);
      })
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.trails.length !== nextProps.trails.myTrails.length) {
      const trails = nextProps
      .trails
      .myTrails
      .map((trail) => <TrailDetail
        replaceRoute={this.props.replaceRoute}
        key={trail._id + 'trail-list'}
        trail={trail}/>);
        if (trails.length > 0) {
          loaderHandler.hideLoader();
        }
        this.setState({trails});
    }
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

/*----------Modules----------*/
import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import axios from 'axios';

/*----------Components----------*/
import TrailDetail from './TrailDetail';
import Header from './Header';

/*----------Redux----------*/
import * as actions from '../redux/actions';

/*----------API----------*/
// import {fetchData, validateServerData} from '../api/TrailmasterAPI';

class TrailList extends Component {
  state = {
    trails: []
  }
  componentWillMount() {
    const {xAuth} = this.props.userSession;
    const {trails, dispatch} = this.props;
    axios
      .get('https://trailmaster.herokuapp.com/trails', {
      headers: {
        'x-auth': xAuth
      }
    })
      .then((response) => {
        const newTrails = response.data
          .trails;
        console.log('New Trails: ', newTrails);
        if (newTrails.length !== trails.myTrails.length) {
          dispatch(actions.displayTrails(newTrails));
          const trailList = newTrails.map((trail) => <TrailDetail key={trail._id + 'trail-list'} trail={trail}/>);
          this.setState({trails: trailList});
        }
      })
      .catch((error) => {
        console.log('Error fetching trails: ', error);
      })
  }
  render() {
    const styles = EStyleSheet.create({scrollViewStyle: {}});
    return (
      <View style={{
        flex: 1
      }}>
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

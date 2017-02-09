/*----------Modules----------*/
import React, {Component} from 'react';
import {Text, ScrollView,} from 'react-native';
import axios from 'axios';

/*----------Components----------*/
import FeatureDetail from './FeatureDetail';

class Controls extends Component {
  state = {geoJSON: []}
  componentWillMount() {
    Promise.all([
      axios.get('https://trailmaster.herokuapp.com/pois'),
      axios.get('https://trailmaster.herokuapp.com/routes'),
    ]).then(res => {
      this.setState({geoJSON: [...res[0].data.pois, ...res[1].data.routes]})
    }).catch(err => {
      console.error('Error fetching data', err);
    });
  }
  renderGeoJSON() {
    return this.state.geoJSON.map((feature) => <FeatureDetail key={feature._id + 'geoJSON-list'} feature={feature} />);
  }
  render() {
    console.log(this.state);
    return (
      <ScrollView style={styles.scrollStyle}>
        {this.renderGeoJSON()}
      </ScrollView>
    );
  }
}

const styles = {
  scrollStyle: {
    // flex: 1
  },
  controlsHeader: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  viewStyle: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    height: 50,
    elevation: 2,
    position: 'relative'
  }
}

export default Controls;

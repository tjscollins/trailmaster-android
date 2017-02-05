/*----------Modules----------*/
import React, {Component} from 'react';
import {Text, View,} from 'react-native';
import axios from 'axios';

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
  render() {
    console.log(this.state);
    return (
      <View>
        <Text>Controls Panel</Text>
      </View>
    );
  }
}

export default Controls;

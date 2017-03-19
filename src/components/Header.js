/*----------Modules----------*/
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
  textStyle: {
    fontSize: 20,
    paddingLeft: 15
  },
  viewStyle: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    elevation: 2,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    position: 'relative'
  },
  searchButton: {
    marginRight: 10,
    color: 'lightblue'
  },
  settingsButton: {
    marginRight: 15,
    color: '#aaa'
  },
  searchBoxStyle: {
    width: 200,
    height: 25,
    top: 50,
    right: 0,
    left: 100
  }
}

class Header extends Component {
  state = {
    searchVisible: false,
    transparentSearch: false,
    searchText: '',
    shouldAutoCorrect: false
  }
  searchButton() {
    console.log('Pressed Search!');
    this.setState({
      searchVisible: !this.state.searchVisible
    });
  }
  settings() {
    console.log('Pressed Settings!')
  }
  render() {
    const {headerText} = this.props;
    const {textStyle, viewStyle} = styles;
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{headerText}</Text>
        <View style={viewStyle}>
          <TouchableOpacity
            onPress={this
              .searchButton
              .bind(this)}>
            <Icon style={styles.searchButton} name='search' size={20}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this
            .settings
            .bind(this)}>
            <Icon style={styles.settingsButton} name='cog' size={20}/>
          </TouchableOpacity>
        </View>

        <Modal
          animationType={"none"}
          transparent={this.state.transparentSearch}
          visible={this.state.searchVisible}
          onRequestClose={() => {
            alert("Modal has been closed.")
          }}>
          <View style={styles.searchBoxStyle}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => this.setState({
                  searchVisible: !this.state.searchVisible
                })}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
              <TextInput
                autoCorrect={this.state.shouldAutoCorrect}
                onChangeText={(searchText) => this.setState({searchText})} placeholder={'Search'}
              />

            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Header;

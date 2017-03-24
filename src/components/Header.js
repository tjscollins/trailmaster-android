/*----------React----------*/
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/*----------Redux----------*/
import {connect} from 'react-redux';
import * as actions from '../redux/actions';

/*----------Style Sheets----------*/
import EStyleSheet from 'react-native-extended-stylesheet';

// const styles = EStyleSheet.create({
//
//   headerStyle: {
//
//   },   searchBoxStyle: {     width: 200,     height: 25,     top: 50, right:
// 0,     left: 100   },
//
// });

class Header extends Component {
  state = {
    // minimizedHeader: true,
    searchVisible: false,
    searchText: '',
    shouldAutoCorrect: false,
    transparentSearch: false
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
  toggleHeader() {
    console.log('Toggle Header Size');
    this
      .props
      .dispatch(actions.toggleHeader());
    // this.setState({minimizedHeader: !this.state.minimizedHeader});
  }
  render() {
    console.log('Props passed to Header: ', this.props);
    const {headerText, UI} = this.props;
    const styles = EStyleSheet.create({
      headerStyle: {
        width: UI.minimizedHeader
          ? 150
          : undefined,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        elevation: 2,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        position: 'relative',
        borderBottomRightRadius: UI.minimizedHeader
          ? 5
          : 0
      },
      titleStyle: {
        fontSize: 20,
        paddingLeft: 15,
        // width: '50%',
      },
      toggleButtonStyle: {
        marginRight: 10
      },
      searchButtonStyle: {
        marginRight: 10,
        color: 'steelblue',
        opacity: UI.minimizedHeader
          ? 0
          : 1
      },
      mapButtonStyle: {
        marginRight: 10,
        color: 'olivedrab',
        opacity: UI.minimizedHeader
          ? 0
          : 1
      },
      settingsButtonStyle: {
        marginRight: 15,
        opacity: UI.minimizedHeader
          ? 0
          : 1,
        color: '#aaa'
      }
    });
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.titleStyle}>{headerText}</Text>
        {((display) => {
          if (display)
          return (
            <TouchableOpacity
              onPress={this
                .searchButton
                .bind(this)}>
              <Icon style={styles.searchButtonStyle} name='search' size={20}/>
            </TouchableOpacity>
          );
        }
        )(!UI.minimizedHeader)}
        {((display) => {
          if (display)
          return (
            <TouchableOpacity
              onPress={this
                    .searchButton
                .bind(this)}>
              <Icon style={styles.mapButtonStyle} name='map' size={20}/>
            </TouchableOpacity>
          );
        }
        )(!UI.minimizedHeader)}
        {((display) => {
          if(display)
          return (
            <TouchableOpacity onPress={this
                .settings
              .bind(this)}>
              <Icon style={styles.settingsButtonStyle} name='cog' size={20}/>
            </TouchableOpacity>
          )
        })(!UI.minimizedHeader)}
        <TouchableOpacity
          onPress={this
            .toggleHeader
            .bind(this)}>
          <Icon
            style={styles.toggleButtonStyle}
            name={UI.minimizedHeader
              ? 'chevron-right'
            : 'chevron-left'}
            size={20}/>
        </TouchableOpacity>

        {/* <Modal
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
        </Modal> */}
      </View>
    );
  }
}

Header.propTypes = {
  dispatch: React.PropTypes.func,
  UI: React.PropTypes.object,
  headerText: React.PropTypes.string
};

export default connect(state => state)(Header);

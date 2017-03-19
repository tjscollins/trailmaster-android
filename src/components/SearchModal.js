/* ----------Modules---------- */
import React, {Component} from 'react';
import {Modal, View, Text, TouchableHighlight} from 'react-native';

const styles = {
  searchBoxStyle: {
    width: 200,
    height: 25,
    top: 50,
    right: 0,
  }
}

class SearchModal extends Component {
  state = {
    modalVisibile: false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{}}>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.")
          }}>
          <View style={styles.searchBoxStyle}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={{paddingBottom: 100, margin: 150}}
          onPress={() => {
            this.setModalVisible(true)
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default SearchModal;

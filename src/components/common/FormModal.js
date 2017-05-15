/*----------React-----------*/
import React, { PropTypes } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

const FormModal = ({ styles, children, visible, close, save, saveText }
  = { visible: false, saveText: 'Submit' }) => {
  return (
    <Modal
      animationType={"fade"}
      transparent={false}
      visible={visible}
      onRequestClose={close}>
      <View style={styles.modalStyle}>
        <View style={styles.formStyle}>
          {children}
          <View style={styles.formRow}>
            <TouchableOpacity style={styles.saveButtonStyle} onPress={save}>
              <Text style={styles.buttonTextStyle}>
                {saveText}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formRow}>
            <TouchableOpacity onPress={close}>
              <View style={styles.cancelButtonStyle}>
                <Text style={styles.buttonTextStyle}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

FormModal.propTypes = {
  styles: PropTypes.object,
  children: PropTypes.array,
  close: PropTypes.func,
  save: PropTypes.func,
  visible: PropTypes.boolean,
  saveText: PropTypes.string
};

export default FormModal;

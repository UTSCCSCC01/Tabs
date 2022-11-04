import { Modal, Dimensions, StyleSheet, View, Text, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { shadowType } from 'react-native-floating-action';
import { TextInput } from 'react-native-gesture-handler';

let windowHeight = Dimensions.get('window').height;
let popupHeight = 0.3*windowHeight;

/* Copy paste this where you want to put this modal:

    ***Need this import
    import { useState } from 'react'

    ***This goes before your return statement
    const [modalVisible, setModalVisible] = useState(false);

    const onShowPopup = () => {
      setModalVisible(true)
    }

    const onClosePopup = () => {
      setModalVisible(false)
    }

    *** Put this at the top of the view
    <DebtPopup show = {modalVisible} closePopup = {onClosePopup} />

    *** Example button that shows the popup
    <TouchableOpacity onPress={onShowPopup} style= {{backgroundColor: 'yellow', width: 50, height: 50}}/>

*/


/**
* @name AddRemoveButton
* @param closePopup takes in a void function that is used to close the popup
* @returns the two buttons used to either request money or send to
* @see AddAppliancePopup to see where this component is used
*/

const AddRemoveButton = (props: {closePopup : (VoidFunction)}) => {

  const cancel = () => {
    props.closePopup()
  }

  const addAppliance = () => {
    props.closePopup()
  }

  return(
    <View style = {styles.addRemoveContainer}>
      <TouchableOpacity style = {styles.addRemoveButtons} onPress = {cancel}>
        <Text style = {styles.buttonTextColor}> Cancel </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.addRemoveButtons} onPress = {addAppliance}>
        <Text style = {styles.buttonTextColor}> Add Appliance </Text>
      </TouchableOpacity>
    </View>
  )
}


/**
* @name AddAppliancePopup
* @param show takes in a boolean in order to define whether or not the popup should show
* @param closePopup takes in a void function that is used to close the popup
* @returns returns a popup that allows users to add an appliance
* @see appliancesPage to see where this component is used
*/


const AddAppliancePopup = (props: {show : boolean, closePopup : (VoidFunction) }) => {
    return (
        <Modal
              animationType="slide"
              transparent={true}
              visible={props.show}
              onRequestClose={() => {
                props.closePopup();
              }}
            >
                <TouchableWithoutFeedback
                  onPress={props.closePopup}
                >
                  <View style={styles.centeredView}>
                    <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                          <Text style={styles.modalText}>Appliance Name</Text>
                            <TextInput 
                              style={styles.transactionInput}
                              keyboardType="default"
                              textAlign='center'
                              maxLength={10}
                            />
                          <AddRemoveButton closePopup={props.closePopup}/>
                      </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
        </Modal>
    )
}

export default AddAppliancePopup;

const styles = StyleSheet.create({
    centeredView: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    innerOpacity: {
      height: popupHeight,
      width: '80%',
    },
    modalView: {
      margin: 20,
      paddingTop: 20,
      backgroundColor: "#B8D6DC",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: popupHeight,
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 0,
      textAlign: "left",
      marginRight: "45%",
    },
    addRemoveContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: "2%",
      marginBottom: "0%"
      
    },
    addRemoveButtons: {
      backgroundColor: '#127589',
      length: "10%",
      width: "10%",
      paddingHorizontal: "3%",
      paddingVertical: "5%",
      flex: 1,
      borderRadius: 20,
      marginLeft: "2%",
      marginRight: "2%",
      alignItems: 'center'

    },
    buttonTextColor: {
      color: '#B8D6DC'
    },
    transactionInputContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      marginTop: 0

    },
    transactionInput: {
      backgroundColor: '#E3EFF1',
      marginTop: 0,
      marginBottom: "2%",
      height: '20%',
      width: '90%',
      borderRadius: 20
    }

  });
  
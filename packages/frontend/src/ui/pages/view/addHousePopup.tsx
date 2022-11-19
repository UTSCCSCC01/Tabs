import { Modal, Dimensions, StyleSheet, View, Text, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { shadowType } from 'react-native-floating-action';
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import {gql,useMutation} from '@apollo/client'
import { InventoryCategory } from '../../fragments/view/inventory/InventoryCategory';
import { useLinkProps } from '@react-navigation/native';
let windowHeight = Dimensions.get('window').height;
let popupHeight = 0.4*windowHeight;




/**
* @name AddRemoveButton
* @param closePopup takes in a void function that is used to close the popup
* @returns button to join a house
* @see AddHousePopup to see where this component is used
*/

const AddRemoveButton = (props: {houseId: String, userId:String, closePopup :(VoidFunction)} ) => {
    const close = () => {
        props.closePopup()
      }

  return(
    <View style = {styles.addRemoveContainer}>
      <TouchableOpacity style = {styles.addRemoveButtons} onPress = {()=>{close}}>
        <Text style = {styles.buttonTextColor}> Join house </Text>
      </TouchableOpacity>

    </View>
  )
}


/**
* @name AddHousePopup
* @param houseId the category we need
* @param show takes in a boolean in order to define whether or not the popup should show
* @param closePopup takes in a void function that is used to close the popup
* @returns returns a popup that allows users to request or send debts to one another
*/

const AddHousePopup = (props: { houseId: String, userId: String, show : boolean, closePopup : (VoidFunction)}) => {
    // pass in a value for what it is


    return (
        <Modal
              animationType="slide"
              transparent={true}
              visible={props.show}
              onRequestClose={() => {
                props.closePopup();
              }}
            >
                <TouchableWithoutFeedback onPress={ () => {props.closePopup()}}>
                  <View style={styles.centeredView}>
                    <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                          <Text style={styles.modalText}>house ID</Text>
                                <TextInput
                                  style={styles.transactionInput}
                                  keyboardType = 'default'
                                  textAlign='center'
                                  maxLength={28}
                                  placeholder='house id'
                                />


                          <AddRemoveButton houseId = {props.houseId} userId = {props.userId} closePopup={props.closePopup}/>

                      </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
        </Modal>
    )
}

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
      marginRight: "65%"
    },
    addRemoveContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: "2%",
      marginBottom: "5%"
      
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
      height: '12%',
      width: '90%',
      borderRadius: 20
    }

  });

  export default AddHousePopup

import { Modal, Dimensions, StyleSheet, View, Text, Pressable, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native'
import React, { useState, useRef } from 'react'
import { TextInput } from 'react-native-gesture-handler';

let windowHeight = Dimensions.get('window').height;
let popupHeight = 0.35*windowHeight;

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


/**
* @name AddTaskPopup
* @param show takes in a boolean in order to define whether or not the popup should show
* @param closePopup takes in a void function that is used to close the popup
* @returns returns a popup that allows users to add a task with optional subtasks
* @see ToDoListPage to see where this component is used
*/


const AddTaskPopup = (props: {show : boolean, closePopup : (VoidFunction) }) => {

    const [AddTaskState, setAddTaskState] = useState("Task")

    const [InputText, setInputText] = useState("Task Name")
    const [AddItemButton, setAddItemButton] = useState("Add Subtask")

    const updateText = () => {
        if (AddTaskState == "Task")
        {
            setInputText("Subtask")
            setAddItemButton("Cancel")
        }
        else {
            setInputText("TaskName")
            setAddItemButton("Add subtask")
        }
    }

    const updateTaskState = () =>
    {
        if (AddTaskState == "Task")
        {
          updateText()
          setAddTaskState("Subtask")
        }
        else 
        {
          updateText()
          setAddTaskState("Task")
        }
    }

    const addItem = () => {
        if (AddTaskState == "Task")
        {
            //backend function for adding a task goes here
            props.closePopup()
        }
        else 
        {
            //backend function for adding a subtask goes here
            updateTaskState()
        }
    }

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
                          <Text style={styles.modalText}>{InputText}</Text>
                            <TextInput 
                              style={styles.transactionInput}
                              keyboardType="default"
                              textAlign='center'
                              maxLength={10}
                            />
                          <TouchableOpacity style={styles.addItemButon} onPress={updateTaskState}>
                            <Text style={styles.buttonText} > {AddItemButton} </Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.addTaskButon} onPress={addItem}>
                            <Text style={styles.buttonText} > Add Task </Text>
                          </TouchableOpacity>

                      </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
        </Modal>
    )
}

export default AddTaskPopup;

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
      marginRight: "60%",
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
    },
    addItemButon: {
        height: "18%",
        borderRadius: 20,
        backgroundColor: "#127589",
        width: "70%",
        alignItems: "center",
    },
    addTaskButon: {
        height: "18%",
        borderRadius: 20,
        backgroundColor: "#127589",
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        marginTop: "4%",
        color: "white"
    }

  });
  
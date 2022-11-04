import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SvgComponentLightBlue from '../../../assets/images/LightBlueVector';

export type Props = {
    isAddingRent: boolean,
    setIsAddingRent: any,
};

const ADD_BILL =
gql`
mutation AddBill($houseId: String!, $userId: String!, $name: String!, $amount: Float!, $split: [String!], $dateCreated: String!, $dateDue: String!, $status: String) {
    addBill(houseId:$houseId, userId:$userId, name:$name, amount:$amount, split:$split, dateCreated:$dateCreated, dateDue:$dateDue, status: $status) {
      houseId, userId, name, amount, split, dateCreated, dateDue, status
    }
}`

/**
* @name AddRentPopUpComponent
* @param isAddingRent a boolean for whether or not rent is being added
* @param setIsAddingRent a function to set isAddingRent to true/false
* @returns React component popup form for entering new roomate monthly rent amount
* @see RentAdminScreen.tsx where AddRentPopUpComponent is used
*/
const AddRentPopUpComponent: React.FC<Props> = ({
    isAddingRent,
    setIsAddingRent
}) => {


    const [nameInput, setNameInput] = useState('');
    const [amountInput, setAmountInput] = useState('');
    const [addbill,  { loading, error }] = useMutation(ADD_BILL)
    if(loading){
        return  <Text>{'Loading...'} </Text>
    }
    if(error){
        return <Text>{error.message}</Text>
    }

    const submitHandle = () => {
        // temporarily hardcode some of the arguments such as houseid, and userid as name since we have not yet added user accounts
        addbill({ variables: { houseId:"777", userId: String(nameInput), name: "Rent", amount: Number(amountInput), split: ["user1", "user2"], dateCreated: "Friday, Nov. 4, 2022", dateDue: 'Wednesday Nov. 21, 2022', status: "unpaid" } }).catch(error => console.log('error: ', error));
        console.log("ADDED RENT");
        setIsAddingRent(false);
    }

  return (
    <View style={styles.popUpContainer}>
        <SvgComponentLightBlue style={styles.svg} zIndex={-5} />
        <View style={styles.form}>
            <TextInput style={styles.field}
                placeholder="Roomate Name"
                value = {nameInput}
                onChangeText={text => setNameInput(text)}
                />

            <TextInput style={styles.field}
                // onChangeText={onChangeNumber}
                placeholder="Monthly Rent"
                value = {amountInput}
                onChangeText={text => setAmountInput(text)}
                />
            <Pressable
                onPress={submitHandle}
                style={({ pressed }) => ({
                    marginTop: '3%',
                    left: '6%',
                    height: '26%',
                    width: '100%',
                    borderRadius: 30,
                    justifyContent: 'center',
                    backgroundColor: '#127589',
                    opacity: pressed ? 0.4 : 1
                })}>
                    <Text style={styles.buttonText}>ADD</Text>
            </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popUpContainer: {
    left: '-5%',
  },
  svg: {
    position: 'absolute',
  },
  form: {
    padding: '10%',
    marginTop: '3%',
  },
  field: {
    fontSize: 25,
    borderRadius: 15,
    padding: '6%',
    margin: '3%',
    width: '100%',
    left: '3%',
    backgroundColor: 'white',
  },
  buttonText: {
    color: '#B8D6DC',
    fontSize: 30,
    textAlign: 'center'
  }

});

export default AddRentPopUpComponent;
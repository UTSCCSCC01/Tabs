import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SvgComponentLightBlue from '../../../assets/images/LightBlueVector';
import { rentScheduleNotification } from '../notifications';

export type Props = {
    updatingUser: string,
    setUpdatingUser: any,
    isUpdatingRent: boolean,
    setIsUpdatingRent: any,
};

const MODIFY_BILL =
gql`
mutation ModifyBillAmount($houseId: String!, $userId:String!, $amount: Float) {
    modifyBillAmount(houseId:$houseId, userId:$userId, amount:$amount)
}
`

/**
* @name UpdateRentPopUpComponent
* @param isUpdatingRent a boolean for whether or not rent is being updated
* @param setIsUpdatingRent a function to set isUpdatingRent to true/false
* @returns React component popup form for entering new monthly rent amount
* @see RentAdminScreen.tsx where UpdateRentPopUpComponent is used
*/
const UpdateRentPopUpComponent: React.FC<Props> = ({
    updatingUser,
    setUpdatingUser,
    isUpdatingRent,
    setIsUpdatingRent
}) => {


    const [amountInput, setAmountInput] = useState('');
    const [modifyBillAmount,  { loading, error }] = useMutation(MODIFY_BILL)

    if(loading){
        return  <Text>{'Loading...'} </Text>
    }
    if(error){
        return <Text>{error.message}</Text>
    }

    const submitHandle = () => {
        modifyBillAmount({ variables: { houseId: "777", userId: {updatingUser}.updatingUser, amount: Number(amountInput) }}).catch(error => console.log('error: ', error));
        console.log("UPDATED RENT");
        rentScheduleNotification("12/27/2001");
        setIsUpdatingRent(false);
        setUpdatingUser('');
    }

  return (
    <View style={styles.popUpContainer}>
        <SvgComponentLightBlue style={styles.svg} zIndex={-5} />
        <View style={styles.form}>
            <TextInput style={styles.field}
                placeholder="New Monthly Rent"
                value = {amountInput}
                onChangeText={text => setAmountInput(text)}
            />
            <Pressable
                onPress={submitHandle}
                style={({ pressed }) => ({
                    marginTop: '3%',
                    left: '6%',
                    height: '35%',
                    width: '100%',
                    borderRadius: 30,
                    justifyContent: 'center',
                    backgroundColor: '#127589',
                    opacity: pressed ? 0.4 : 1
                })}>
                    <Text style={styles.buttonText}>UPDATE</Text>
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
    marginTop: '12%',
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

export default UpdateRentPopUpComponent;
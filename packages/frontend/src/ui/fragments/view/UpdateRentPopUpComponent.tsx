import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SvgComponentLightBlue from '../../../assets/images/LightBlueVector';

export type Props = {
    isUpdatingRent: boolean,
    setIsUpdatingRent: any,
};


/**
* @name UpdateRentPopUpComponent
* @param isUpdatingRent a boolean for whether or not rent is being updated
* @param setIsUpdatingRent a function to set isUpdatingRent to true/false
* @returns React component popup form for entering new monthly rent amount
* @see RentAdminScreen.tsx where UpdateRentPopUpComponent is used
*/
const UpdateRentPopUpComponent: React.FC<Props> = ({
    isUpdatingRent,
    setIsUpdatingRent
}) => {

    const submitHandle = () => {
        console.log("UPDATED RENT");
        setIsUpdatingRent(false);
    }

  return (
    <View style={styles.popUpContainer}>
        <SvgComponentLightBlue style={styles.svg} zIndex={-5} />
        <View style={styles.form}>
            <TextInput style={styles.field}
                placeholder="New Monthly Rent"
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
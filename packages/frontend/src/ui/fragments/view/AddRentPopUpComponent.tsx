import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SvgComponentLightBlue from '../../../assets/images/LightBlueVector';

export type Props = {
    isAddingRent: boolean,
    setIsAddingRent: any,
};

const AddRentPopUpComponent = ({setIsAddingRent}: {setIsAddingRent:Function}) => {
  
    const submitHandle = () => {
        console.log("ADDED RENT");
        setIsAddingRent(false);
    }

  return (
    <View style={styles.popUpContainer}>
        <SvgComponentLightBlue style={styles.svg} zIndex={-5} />
        <View style={styles.form}>
            <TextInput style={styles.field}
                placeholder="Roomate Name"
                />

            <TextInput style={styles.field}
                // onChangeText={onChangeNumber}
                placeholder="Monthly Rent"
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
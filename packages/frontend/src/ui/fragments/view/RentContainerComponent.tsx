import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';

export type Props = {
    user: string; // roomate name
    amount: number;
    isUpdatingRent: boolean,
    setIsUpdatingRent: any,
};

const RentContainerComponent: React.FC<Props> = ({
    user,
    amount,
    isUpdatingRent,
    setIsUpdatingRent
}) => {
  return (
      <View style={[styles.roundedContainer, styles.moneyContainer]}>
        <View style={styles.pfpContainer}>
        </View>
        
        <Text style={styles.nameLabel}>{user}</Text>
        <Text style={styles.oweLabel}>Monthly Rent</Text>
        <Text style={styles.oweAmountLabel}>${amount}</Text>
        <Pressable onPress={setIsUpdatingRent} style={({ pressed }) => ({
            left: '77%',
            top: '33%',
            width: '16%',
            height: '15%',
            borderBottomWidth: 1,
            borderColor: 'gray',
            opacity: pressed ? 0.5 : 1
        })}>
            <Text style={styles.viewButton}>Update</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  roundedContainer: {
    width: '95%',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },

  // i dont know what to call these containers !! proly shouldnt be money thogh
  moneyContainer: {
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 10,
  },

  pfpContainer: {
    top: '11%',
    left: '7%',
    position: 'absolute',
    height: '40%',
    backgroundColor: '#2493A1',
    borderRadius: 15,
    aspectRatio: 1,
  },

  nameLabel: {
    position: 'absolute',
    top: '23%',
    left: '28%',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 19,
  },

  oweLabel: {
    left: '7%',
    position: 'absolute',
    top: '56%',
    fontSize: 15,
    color: 'rgb(33, 33, 33, 0.54)',
  },

  oweAmountLabel: {
    textAlign: 'center',
    position: 'absolute',
    left: '7%',
    top: '70%',
    fontSize: 28,
    fontWeight: '500',
    color: '#34ACBC',
  },

  viewButton: {
    fontSize: 16,
    color: 'gray',
  }

});

export default RentContainerComponent;
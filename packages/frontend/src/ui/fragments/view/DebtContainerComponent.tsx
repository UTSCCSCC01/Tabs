import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { folderCommonStyles } from './FolderCommonStyles';

export type Props = {
    user: string; // roomate name
    amount: number;
};

const DebtContainerComponent: React.FC<Props> = ({
    user,
    amount
}) => {
  return (
      <View style={[styles.roundedContainer, styles.moneyContainer, folderCommonStyles.column]}>
        <View style={styles.pfpContainer}>
        </View>
        
               
        <Text style={styles.nameLabel}>{user}</Text>
        <Text style={styles.oweLabel}>Requested Debt</Text>
        <Text style={styles.oweAmountLabel}>${amount}</Text>


        <Pressable onPress={() => {}} style={({ pressed }) => ({
            left: '77%',
            top: '33%',
            width: '16%',
            height: '15%',
            backgroundColor: '#f55858',
            opacity: pressed ? 0.5 : 1
        })}>
            <Text style={styles.viewButton}>Reject</Text>
        </Pressable>

        <Pressable onPress={() => {}} style={({ pressed }) => ({
            left: '77%',
            top: '33%',
            width: '16%',
            height: '15%',
            backgroundColor: '#58f594',
            opacity: pressed ? 0.5 : 1
        })}>
            <Text style={styles.viewButton}>Accept</Text>
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

export default DebtContainerComponent;
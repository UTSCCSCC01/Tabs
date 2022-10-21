import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { acceptDebt, rejectDebt } from '../controller/DebtRequestController';
import { folderCommonStyles } from './FolderCommonStyles';

export type Props = {
    debtId: string;
    debtFrom: string;
    amount: number;
};

const DebtContainerComponent: React.FC<Props> = ({
  debtId,  
  debtFrom,
  amount
}) => {
  console.log('Debt container created')
  return (
      <View style={[styles.roundedContainer, folderCommonStyles.column, {
        backgroundColor: 'white',
        opacity: 0.8,
        marginBottom: 20
      }]}>
        <View style = {[folderCommonStyles.row]}>
          <View style={styles.pfpContainer}/>
          <Text style={styles.nameLabel}>{debtFrom}</Text>
        </View>

        <View style = {[folderCommonStyles.row]}>
          <Text style={styles.oweLabel}>Requested Debt</Text>
        </View>

        <View style = {[folderCommonStyles.row]}>
          <Text style={styles.oweAmountLabel}>${amount}</Text>
        </View>


        <View style = {[folderCommonStyles.row, {
            paddingTop: 10,
            width: '100%',
            justifyContent: 'center'
          }]}>

            <Pressable onPress={() => {
              rejectDebt(debtId)
            }} style={({ pressed }) => ({
              backgroundColor: '#f55858',
              opacity: pressed ? 0.5 : 1,
              borderRadius: 15,
              padding: 5,
              paddingBottom: 7,
              paddingHorizontal: 20
            })}>
              <Text style={styles.viewButton}>Reject</Text>
            </Pressable>

            <View style ={{
              width: 30
            }}>

            </View>

            <Pressable onPress={() => {
              acceptDebt(debtId)
            }} style={({ pressed }) => ({
              backgroundColor: '#58f594',
              opacity: pressed ? 0.5 : 1,
              borderRadius: 15,
              padding: 5,
              paddingBottom: 7,
              paddingHorizontal: 20
            })}>
              <Text style={styles.viewButton}>Accept</Text>
            </Pressable>
          </View>

    </View>
  );
};

const styles = StyleSheet.create({
  roundedContainer: {
    width: '95%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 25,
    borderRadius: 20,

  },

  // i dont know what to call these containers !! proly shouldnt be money thogh
  moneyContainer: {
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 10,
  },

  pfpContainer: {
    height: 50,
    width: 50,
    borderRadius: 15,
    backgroundColor: '#2493A1'
  },

  nameLabel: {
    left: 10,
    top: '3.8%',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 19,
  },

  oweLabel: {
    paddingTop: 5,
    fontSize: 15,
    color: 'rgb(33, 33, 33, 0.54)',
  },

  oweAmountLabel: {
    fontSize: 28,
    fontWeight: '500',
    color: '#34ACBC',
  },

  viewButton: {
    fontSize: 16,
    color: 'black',
  }

});

export default DebtContainerComponent;
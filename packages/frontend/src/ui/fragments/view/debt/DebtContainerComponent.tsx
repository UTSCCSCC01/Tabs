import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { folderCommonStyles } from '../common/FolderCommonStyles';
import { gql, useMutation } from '@apollo/client';
import {rentScheduleNotification} from '../../notifications'
import { removeId } from './DebtRequestListComponent';

export type Props = {
    debtId: string;
    debtFrom: string;
    amount: number;
};

const ACCEPT_DEBT = gql`
mutation acceptRequest($debtId: String){
acceptRequest(debtId: $debtId) {
    id
    requestAccepted
}
}`

const REJECT_DEBT = gql`
mutation rejectRequest($debtId: String){
rejectRequest(debtId: $debtId) {
    id
    requestAccepted
}}`

export const FIND_REQ_DEBTS = gql`
query FindDebtsRequested {
    findDebtsRequested {
    id
    debtTo
    debtFrom
    amount
    description
    dateCreated
    requestAccepted
    }
}`


const DebtContainerComponent: React.FC<Props> = ({
  debtId,  
  debtFrom,
  amount
}) => {


  const [acceptDebtCall, acceptData] = useMutation(ACCEPT_DEBT, {refetchQueries:[{query:FIND_REQ_DEBTS}, "findDebtsRequested"],awaitRefetchQueries:true})
  const [rejectDebtCall, rejectData] = useMutation(REJECT_DEBT, {refetchQueries:[{query:FIND_REQ_DEBTS}, "findDebtsRequested"],awaitRefetchQueries:true})

  /**
   * Send request to the server to accept debt and handle as necessary
   * 
   * @name acceptDebt
   * @param debtId Id of debt
   * @param name Name of author of debt
   */
  function acceptDebt(debtId: string, name: string | null = null) {
    console.log('accept debt ' + debtId)


    acceptDebtCall({ 
      variables: { 
        debtId: debtId
      } 
    })  
    console.log(JSON.stringify(acceptData.data))
    console.log("removing from accept")
    removeId(debtId)

    rentScheduleNotification('temp')
  }

  /**
  * Send request to the server to reject debt and handle as necessary
  * 
  * @name rejectDebt
  * @param debtId Id of debt
  * @param name Name of author of debt
  */
  function rejectDebt(debtId: string, name: string | null = null) {
    console.log('reject debt ' + debtId)
    
    rejectDebtCall({ variables: { debtId: debtId} })
    console.log(JSON.stringify(rejectData.data))
    console.log("removing from reject")
    removeId(debtId)
  }


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
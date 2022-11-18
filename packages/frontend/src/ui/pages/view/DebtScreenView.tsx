import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl } from 'react-native';
import HeaderComponent from '../../fragments/view/common/HeaderComponent';
import { FloatingActionButton } from '../../fragments/view/common/FloatingActionButton';
import ActiveDebtListComponent from '../../fragments/view/debt/ActiveDebtListComponent';
import { useState } from 'react'
import DebtPopup from './debtPopup';

const handleRequestDebt = () => {

}

/**
 * Debts list page view
 * 
 * @name DebtScreenView
 * @returns React component
 */
const DebtScreenView: React.FC = () => {
  const [isAddingRent, setIsAddingRent] = React.useState(false);
  const [isUpdatingRent, setIsUpdatingRent] = React.useState(false);

  const handleAddRent = () =>
    setIsAddingRent(!isAddingRent);

  const [modalVisible, setModalVisible] = useState(false);

  const onShowPopup = () => {
    setModalVisible(true)
  }

  const onClosePopup = () => {
    setModalVisible(false)
  }

  // MOCK data update this with backend connection in future sprint
  return (
    <View style={styles.container}>
      <DebtPopup show = {modalVisible} closePopup = {onClosePopup} />
      <HeaderComponent screenName='Your Debts' />

      <View style={styles.scrollContainer}>
        <ActiveDebtListComponent userId='Bob Jones' />
      </View>

      <FloatingActionButton
        name="add item"
        argument={1}
        myFunction={onShowPopup} />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DCF6FB',
    height: '100%',
    width: '100%',
  },

  scrollContainer: {
    height: '50%',
  }
});

export default DebtScreenView
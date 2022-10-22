import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/HeaderComponent';
import { FloatingActionButton } from '../../fragments/view/FloatingActionButton';
import RentListComponent from '../../fragments/view/RentListComponent';
import AddRentPopUpComponent from '../../fragments/view/AddRentPopUpComponent';
import UpdateRentPopUpComponent from '../../fragments/view/UpdateRentPopUpComponent';

/**
* @name RentAdmin
* @returns React component of list of monthly rents for each roommate
*/
const RentAdminScreen: React.FC = () => {

    const [isAddingRent, setIsAddingRent] = React.useState(false);
    const [isUpdatingRent, setIsUpdatingRent] = React.useState(false);
    
    const handleAddRent = () =>
        setIsAddingRent(!isAddingRent);
        
    // MOCK data update this with backend connection in future sprint
    return (
        <View style={styles.container}>
            <HeaderComponent screenName='Household Rent'/>

            <SafeAreaView style={styles.scrollContainer}>
                <RentListComponent userId='Seven Abou' isUpdatingRent={isUpdatingRent} setIsUpdatingRent={setIsUpdatingRent}/>
            </SafeAreaView>
            
            <FloatingActionButton name="add item" argument={1} myFunction={handleAddRent}/>

            {isAddingRent &&
            <AddRentPopUpComponent isAddingRent={isAddingRent} setIsAddingRent={setIsAddingRent}/>
            }

            {isUpdatingRent &&
            <UpdateRentPopUpComponent isUpdatingRent={isUpdatingRent} setIsUpdatingRent={setIsUpdatingRent}/>
            }
            
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

export default RentAdminScreen;
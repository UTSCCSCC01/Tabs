import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/common/HeaderComponent';
import { FloatingActionButton } from '../../fragments/view/common/FloatingActionButton';
import RentListComponent from '../../fragments/view/rent/RentListComponent';
import AddRentPopUpComponent from '../../fragments/view/rent/AddRentPopUpComponent';
import UpdateRentPopUpComponent from '../../fragments/view/rent/UpdateRentPopUpComponent';


/**
* @name RentAdmin
* @returns React component of list of monthly rents for each roommate
*/
const RentAdminScreen: React.FC = () => {
    const [isAddingRent, setIsAddingRent] = React.useState(false);
    const [updatingUser, setUpdatingUser] = React.useState('');
    const [isUpdatingRent, setIsUpdatingRent] = React.useState(false);
    
    const handleAddRent = () =>
        setIsAddingRent(!isAddingRent);
        
    // MOCK data update this with backend connection in future sprint
    return (
        <View style={styles.container}>
            <HeaderComponent screenName='Household Rent'/>

            <SafeAreaView style={styles.scrollContainer}>
                <RentListComponent houseId='777' updatingUser={updatingUser} setUpdatingUser={setUpdatingUser} isUpdatingRent={isUpdatingRent} setIsUpdatingRent={setIsUpdatingRent}/>
            </SafeAreaView>
            
            <FloatingActionButton name="add item" argument={1} myFunction={handleAddRent}/>

            {isAddingRent &&
            <AddRentPopUpComponent isAddingRent={isAddingRent} setIsAddingRent={setIsAddingRent}/>
            }

            {isUpdatingRent && (updatingUser != '') &&
            <UpdateRentPopUpComponent updatingUser={updatingUser} setUpdatingUser={setUpdatingUser} isUpdatingRent={isUpdatingRent} setIsUpdatingRent={setIsUpdatingRent}/>
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
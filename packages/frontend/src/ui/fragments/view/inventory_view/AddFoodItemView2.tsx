import { registerRootComponent } from 'expo';
import React from 'react';
import {  SafeAreaView,  FlatList,  StatusBar, Text, View, StyleSheet, Button, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FolderBackdropListFragment } from '../common/FolderBackdropFragment';
import FolderBackdropAsset from '../../../assets/images/FolderBackgdrop.svg';
import { folderCommonStyles } from '../common/FolderCommonStyles';
import { SvgXml } from 'react-native-svg';
import { BackButton, MyHeader } from '../common/MyHeader';
import { FunctionObject } from '../common/FunctionObject';
import { gql, useMutation } from '@apollo/client';
import { InventoryItem } from '../inventory/InventoryItem';
import { CREATE_ITEM, FIND_ITEM, FIND_ITEMS } from './querySingletons';
import { foodExpiryScheduleNotification } from '../../notifications';


const icon = `<svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M58.1591 75H63.8182C66.6818 75 69.0341 72.8172 69.375 70.0205L75 13.8131H57.9545V0H51.2386V13.8131H34.2955L35.3182 21.794C41.1477 23.397 46.6023 26.296 49.875 29.502C54.7841 34.3452 58.1591 39.3588 58.1591 47.5443V75ZM0 71.5894V68.2128H51.2386V71.5894C51.2386 73.4652 49.7045 75 47.7955 75H3.44318C1.53409 75 0 73.4652 0 71.5894ZM51.2386 47.7149C51.2386 20.4297 0 20.4297 0 47.7149H51.2386ZM0.0681818 54.5703H51.2045V61.3915H0.0681818V54.5703Z" fill="#34ACBC"/>
</svg>`




/**
* @name AddItemView
* @param switchViewFunction takes a function that is used to return to main view
* @param submitFunction takes a function that submits the form and passes the data to database
* @returns Form to add an item to a category previously chosen in main inventory view.
* @see inventoryView to see where this component is used
*/








const AddItemView2 = ({switchViewFunction, chosenCategoryId,  userId} : {switchViewFunction:Function,  chosenCategoryId:string, userId:string}) => {
  console.log("LOADED ADD ITEM VIEW");

  const [addItemMutationFunction, addItemMutationData] = useMutation(CREATE_ITEM,
    {
    refetchQueries: [{query: FIND_ITEMS, variables: {categoryId: chosenCategoryId}}, "ItemsQuery", {query: FIND_ITEM}, "FindItem"],
      awaitRefetchQueries: true
    });



    const addItemHandler=(item: InventoryItem) => {
        item.categoryKey=chosenCategoryId
        console.log("Adding item " + item.name + " to the database");
        console.log("The category key is: " + item.categoryKey)
        console.log("The expiration date is: " + item.expirationDate)
        addItemMutationFunction({variables: {"name":item.name, "categoryId":item.categoryKey, "expiration":item.expirationDate.toString(), userId:userId}});
       
    
        // while (addItemMutationData.loading) {
        //   console.log("Waiting")
        // } 

        const date = new Date(item.expirationDate);
    
        
        foodExpiryScheduleNotification(date.toUTCString());

        switchViewFunction(1);

      }

  return (
    <View style={{
      backgroundColor: "#85C4CF",
      width: '100%',
      height: '100%'
    }}>
        

        <MyHeader title={'Add Food Item'} backFunction={new FunctionObject(switchViewFunction, false, "go back to main view")}></MyHeader>


        <View style ={[folderCommonStyles.row, {
          justifyContent: "center",
          paddingTop: 14
        }]}>
          <SvgXml xml = {icon}>

          </SvgXml>
        </View>

        <FolderBackdropListFragment submitFunction={addItemHandler} goBack={switchViewFunction}>

        </FolderBackdropListFragment>
    </View>
  )
};

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
    },
})


export default AddItemView2;
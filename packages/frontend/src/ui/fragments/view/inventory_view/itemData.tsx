import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../mainViewStyles';
import { BorderIcon } from '../BorderIcon';
import { gql, useMutation } from '@apollo/client';
import EditCategoryPopup from '../../../pages/view/editCategoryPopup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { FolderBackdropActionButton } from '../FolderBackdropActionButton';
import { FIND_ITEMS } from './itemList';
import { FolderFormSvg } from '../FolderFormSvg';



const ADD_CAPACITY = gql`
mutation AddItem($userId: String, $itemId: String) {
  addItem(userId: $userId, itemId: $itemId)
}
`

const SUBTRACT_CAPACITY = gql`
mutation SubtractItem($userId: String, $itemId: String) {
  subtractItem(userId: $userId, itemId: $itemId)
}
`

const getTags = (tags: string[]) => {
    if (tags.length == 0) return "";
    var res=tags[0];
    for (var i=1; i < tags.length; i++){
      res+=", " + tags[i]; 
    }

    return res;
}

const ItemDataChosen = ({name, capacity, tags}: {name:string, capacity:number, tags:string[]}) => {
    //if (item == null) return <View></View>
    return (
    <View style={styles.flexColumnFlexStart}>
      <Text style={styles.myBigBlackText}>Item: {name}</Text>
      <Text style={styles.slightlyBiggerNormalText}>Quantity: {capacity + ""}</Text>
      <Text style={styles.splitTextNormal}>Tags: {getTags(tags)}</Text>
    </View>
    )
  }

export const ItemData = ({itemId, itemName, itemCapacity, itemTags, userId, categoryId, setViewPortId, setSubViewPortId, editItemViewPortId, swipeFunction}:{itemId: string, itemName: string, itemCapacity: number, itemTags: string[], userId: string, categoryId: string, setViewPortId:Function, setSubViewPortId: Function, editItemViewPortId: number, swipeFunction:Function}) => {
  
  console.log("LOADING DATA FOR ITEM WITH NAME:" + itemName + "\nWITH ID: " + itemId);

  
  //hooks section




  const [addCapacityMutationFunction, addCapacityMutationData] = useMutation(ADD_CAPACITY,
    {
      refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery"],
      awaitRefetchQueries: true
    });

    const [subtractCapacityMutationFunction, subtractCapacityMutationData] = useMutation(SUBTRACT_CAPACITY,
      {
        refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery"],
        awaitRefetchQueries: true
      });



  

  //end hooks
  

  //handlers
  const addCapacityHandler=({itemId, userId, itemName, categoryId}:{itemId: string, itemName: string, userId: string, categoryId: string}) => {
 
    
    console.log("Modifying item " + itemName + " to the database. It has ID: " + itemId);
    console.log("The category key is: " + categoryId)
    addCapacityMutationFunction({variables: {itemId: itemId, userId: userId}});
   

  }

  const subtractCapacityHandler=({itemId, userId, itemName, categoryId}:{itemId: string, itemName: string, userId: string, categoryId: string}) => {
    
    
    console.log("Modifying item " + itemName + " to the database. It has ID: " + itemId);
    console.log("The category key is: " + categoryId)
    subtractCapacityMutationFunction({variables: {itemId: itemId, userId: userId}});

    
  }

  console.log("all handlers passed in code");

  //end handlers


  //misc data section



const selItemData = <ItemDataChosen name={itemName} capacity={itemCapacity} tags={itemTags}/>
const editItemButton = <FolderBackdropActionButton buttonFunction={() =>{setSubViewPortId(editItemViewPortId);}} argument={null} info = {{title:"Edit"}}/>
const addToItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{addCapacityHandler({itemId:itemId, itemName: itemName, userId: userId, categoryId: categoryId})}} info = {{title:"Add"}} argument={null}/>
const subtractFromItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{subtractCapacityHandler({itemId:itemId, itemName: itemName, userId: userId, categoryId: categoryId})}} info = {{title:"Subtract"}} argument={null}/>
const formList = [selItemData, editItemButton, addToItemButton, subtractFromItemButton];


   
  //end misc data

   console.log("\n\nShould render item now with name: ", itemName + "\n\n\n");

   return (
    <FolderFormSvg folder={{title:"Item Data", list:formList.map((value:JSX.Element, index:number, array:JSX.Element[]) => {return {id:index+ "", title:"irrelevant", component:value}})}}
              swipeFunction={{myFunction:swipeFunction, name:"Hide Boxes", argument:null}}/>
  
  );

}


  




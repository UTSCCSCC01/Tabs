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
import { FIND_ITEM, itemSingleton } from './querySingletons';
import Loading from '../loading';



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

export const ItemData = ({itemId, userId, categoryId, setViewPortId, setSubViewPortId, editItemViewPortId, swipeFunction}:{itemId: string, userId: string, categoryId: string, setViewPortId:Function, setSubViewPortId: Function, editItemViewPortId: number, swipeFunction:Function}) => {
  
  console.log("LOADING DATA FOR ITEM WITH NAME:" + "\nWITH ID: " + itemId);

  
  //hooks section




  const [addCapacityMutationFunction, addCapacityMutationData] = useMutation(ADD_CAPACITY,
    {
      refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery", {query: FIND_ITEM}, "ItemQuery"],
      awaitRefetchQueries: true
    });

    const [subtractCapacityMutationFunction, subtractCapacityMutationData] = useMutation(SUBTRACT_CAPACITY,
      {
        refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery", {query: FIND_ITEM}, "ItemQuery"],
        awaitRefetchQueries: true
      });

      const myItem = itemSingleton({itemId: itemId});


    

  

  //end hooks


  //early returns

  if (myItem == null){
    setViewPortId(1);
    return <Loading/>
  }
  if (myItem.name == null) return myItem; //returns loading or error if it is either of those
      




  const queries =  [] as any
    const mutations = [addCapacityMutationData, subtractCapacityMutationData]

    for (var i of queries){
        if (i.loading || i.loading) return <Loading/>;
        if (i.error) return <Text style={{fontSize: 8}}>{i.error.message}:{"\n" + JSON.stringify(i.error)}</Text>;
        console.log(JSON.stringify(i.data) + "\nThis is data... hoping it is not null");
    }
    for (var j of mutations){
        if (j.loading || j.loading) return <Loading/>;
        if (j.error) return <Text style={{fontSize: 8}}>{j.error.message}:{"\n" + JSON.stringify(j.error)}</Text>;
        console.log(JSON.stringify(j.data) + "\nThis is data... hoping it is not null");
    }
  //end early returns
  

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





const selItemData = <ItemDataChosen name={myItem.name} capacity={myItem.quantity} tags={myItem.tags}/>
const editItemButton = <FolderBackdropActionButton buttonFunction={() =>{setSubViewPortId(editItemViewPortId);}} argument={null} info = {{title:"Edit"}}/>
const addToItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{addCapacityHandler({itemId:itemId, itemName: myItem.name, userId: userId, categoryId: myItem.categoryId})}} info = {{title:"Add"}} argument={null}/>
const subtractFromItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{subtractCapacityHandler({itemId:itemId, itemName: myItem.name, userId: userId, categoryId: myItem.categoryId})}} info = {{title:"Subtract"}} argument={null}/>
const formList = [selItemData, editItemButton, addToItemButton, subtractFromItemButton];


   
  //end misc data

   console.log("\n\nShould render item now with id: ", itemId+ "\n\n\n");

   return (
    <FolderFormSvg folder={{title:"Item Data", list:formList.map((value:JSX.Element, index:number, array:JSX.Element[]) => {return {id:index+ "", title:"irrelevant", component:value}})}}
              swipeFunction={{myFunction:swipeFunction, name:"Hide Boxes", argument:null}}/>
  
  );

}
  

export const FullItemData = ({itemId, userId, categoryId, setViewPortId, swipeFunction}: {itemId: string, userId:string, categoryId:string, setViewPortId:Function, swipeFunction:Function}) => {
    
  const [viewPortId, setSubViewPortId] = useState(0);

    
  return(
    <View style={styles.container}>
    {viewPortId == 0 && <ItemData itemId={itemId} userId={userId} categoryId={categoryId} setViewPortId={setViewPortId} setSubViewPortId={setSubViewPortId} editItemViewPortId={1} swipeFunction={swipeFunction}/>}

    </View>

  )
}


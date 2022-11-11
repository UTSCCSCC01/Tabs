import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../mainViewStyles';
import { BorderIcon } from '../BorderIcon';
import { gql, useMutation } from '@apollo/client';
import EditCategoryPopup from '../../../pages/view/editCategoryPopup';
import {MaterialCommunityIcons} from '@expo/vector-icons';



const getTags = (tags: string[]) => {
    if (tags.length == 0) return "";
    var res=tags[0];
    for (var i=1; i < tags.length; i++){
      res+=", " + tags[i]; 
    }

    return res;
  }

export const ItemListItem = ({itemName, itemType, categoryId, switchViewPort, fullItem, itemId, capacity, tags, setItemId}:{
    itemName: string, tags:string[], categoryId:string, itemType:string, itemId: string, switchViewPort:Function, fullItem:any, capacity: number, setItemId:Function}) => {
  
  console.log("LOADING ITEM WITH NAME:" + itemName + "\nWITH ID: " + itemId);

  
  //hooks section



  

  //end hooks


  //misc data section

   
  //end misc data

   console.log("\n\nShould render item now with name: ", itemName + "\n\n\n");

   return (
    <TouchableOpacity style={{flex:1}} onPress={() => {setItemId(itemId); switchViewPort(2)}}>
        <View style={styles.flexPage}>

      
        <View style={styles.folderListItem}>



          {capacity == -1 && <Text style={styles.splitTextNormal}>{itemName}</Text>}
          {capacity != -1 && <Text style={styles.splitTextNormal}>{itemName}: {capacity}</Text>}

        </View>
        <View style={styles.rowFlex2}>
        <Text style={styles.splitTextNormal}>{getTags(tags)}</Text>
        {/*<Text style={styles.splitTextNormal}>Expires: {item.expirationDate}</Text>*/}
        </View>
        
        </View>
      </TouchableOpacity>
  
  );

}
  




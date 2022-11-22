import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../common/mainViewStyles';
import { BorderIcon } from '../common/BorderIcon';
import { gql, useMutation } from '@apollo/client';
import EditCategoryPopup from '../../../pages/view/editCategoryPopup';
import {MaterialCommunityIcons} from '@expo/vector-icons';





export const CategoryListItem = ({inventoryKey, categoryName, description, isRestricted, categoryId, switchViewPort, itemListViewPortId, iconName, fullItem, setCategoryId}:{isRestricted: boolean, 
    categoryName: string, inventoryKey:string, description:string, categoryId: string, switchViewPort:Function, itemListViewPortId: number, iconName:string, fullItem:any, setCategoryId:Function}) => {
  
  console.log("LOADING CATEGORY ITEM WITH NAME:" + categoryName + "\nWITH ID: " + categoryId);

  
  //hooks section

  const [modalVisible, setModalVisible] = useState(false);

  const [itemState, setItemState] = useState(fullItem)
  const onShowPopup = () => {
    setModalVisible(true)
  }

  const onClosePopup = (item:any) => {
    setItemState(item)
    setModalVisible(false)
  }

  

  //end hooks


  //misc data section

    if (iconName == null) iconName = "none";
  //end misc data

   console.log("\n\nShould render category item now with name: ", categoryName + "\n\n\n");

   return (
    <TouchableOpacity style={{flex:1, flexGrow:1}} onPress={() => {setCategoryId(categoryId);switchViewPort(itemListViewPortId)}}>
     
      <View style={styles.folderListItem}>
        {iconName != "none" && <BorderIcon iconName={iconName}></BorderIcon>}
  
  
  
        <Text style={styles.splitTextNormal}>{categoryName}</Text>
  
  
        <MaterialCommunityIcons  name='pencil' size={30} onPress={onShowPopup}/>
        

        <EditCategoryPopup itemState={fullItem} show={modalVisible} userId = 'testId' categoryName={categoryName} categoryDesc={description} categoryId={categoryId} isRestricted={isRestricted} closePopup={onClosePopup}/>
  
      </View>
  
      
    </TouchableOpacity>
  
  );

}
  




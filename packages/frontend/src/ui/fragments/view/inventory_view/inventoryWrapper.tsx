import React, { useState } from "react"
import { View, FlatList, Text } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import SvgComponent from "../../../../assets/images/FolderBackdrop"
import ItemListComponent from "./itemList"
import { styles } from "../mainViewStyles"
import { CategoryListFolder } from "./categoryListFolder"
import { ItemListFolder } from "./itemListFolder"
import { FullItemData } from "./itemData2"



export const InventoryWrapper = ({userId, inventoryId, swipeFunction,}: {userId:string, inventoryId:string,swipeFunction: Function}) => {
    console.log("In inventory wrapper. User ID is: " + userId);


    //hooks
    const [viewPortId, setViewPortId] = useState(0);
    const [categoryId, setCategoryId] = useState("none");
    const [itemId, setItemId] = useState("none");

    //end hooks
    return(
    <View style={{width:"100%", height:"100%", flexGrow:1}}>
     
     {viewPortId == 0 && <CategoryListFolder setCategoryId={setCategoryId} userId={userId} inventoryId={inventoryId} switchViewPort={setViewPortId} itemListViewPortId={1} swipeFunction={swipeFunction}/>}
     {viewPortId == 1 && <ItemListFolder setItemId={setItemId} userId={userId} categoryId={categoryId} switchViewPort={setViewPortId} itemListViewPortId={1} swipeFunction={swipeFunction} />}
     {viewPortId == 2 && <FullItemData itemId={itemId} userId={userId} categoryId={categoryId} setViewPortId={setViewPortId} swipeFunction={swipeFunction} />}
    </View>
    )
}
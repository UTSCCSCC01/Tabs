import React, { useState } from "react"
import { View } from "react-native"
import { CategoryListFolder } from "./categoryListFolder"
import { ItemListFolder } from "./itemListFolder"
import { FullItemData } from "./itemData2"



export const InventoryWrapper = ({userId, inventoryId, swipeFunction, setInnerCategoryId, setOuterViewPortId, setSetInnerViewPortId}: {userId:string, inventoryId:string,swipeFunction: Function, setInnerCategoryId: Function, setOuterViewPortId:Function, setSetInnerViewPortId: Function}) => {
    console.log("In inventory wrapper. User ID is: " + userId);


    //hooks
    const [viewPortId, setViewPortId] = useState(0);
    const [categoryId, setCategoryId] = useState("none");
    const [itemId, setItemId] = useState("none");

    const handleSetCategoryId = (categoryId: string) => {
        setCategoryId(categoryId);
        setInnerCategoryId(categoryId);
    }
    

    const handleAddItemView = (id: number) => {
        setOuterViewPortId(id);


        setSetInnerViewPortId((id:number) => {console.log("hmm"); setViewPortId(id)});
    }

    //end hooks
    return(
    <View style={{width:"100%", height:"100%", flexGrow:1}}>
     
     {viewPortId == 0 && <CategoryListFolder setCategoryId={handleSetCategoryId} userId={userId} inventoryId={inventoryId} switchViewPort={setViewPortId} itemListViewPortId={1} swipeFunction={swipeFunction}/>}
     {viewPortId == 1 && <ItemListFolder setItemId={setItemId} userId={userId} categoryId={categoryId} switchViewPort={setViewPortId} switchOuterViewPort={handleAddItemView} itemListViewPortId={1} swipeFunction={swipeFunction} />}
     {viewPortId == 2 && <FullItemData inventoryId={inventoryId} itemId={itemId} userId={userId} categoryId={categoryId} setViewPortId={setViewPortId} swipeFunction={swipeFunction} />}
 
    </View>
    )
}
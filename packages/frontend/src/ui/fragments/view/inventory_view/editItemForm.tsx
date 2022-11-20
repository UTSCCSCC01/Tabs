import { gql, useMutation } from "@apollo/client"
import React, { useState } from "react"
import { View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { FolderBackdropActionButton } from "../common/FolderBackdropActionButton"
import { FolderFormSvg } from "../common/FolderFormSvg"
import { FolderSvgForm } from "../common/FolderSvgForm"
import { FormItem } from "../common/FormItem"
import { FormItemList } from "../common/FormItemList"
import { FunctionObject } from "../common/FunctionObject"
import { styles } from "../common/mainViewStyles"
import { TextForm } from "../common/TextForm"
import { InventoryCategory } from "../inventory/InventoryCategory"
import { CategoryListSingleton, FIND_ITEM, FIND_ITEMS } from "./querySingletons"

export const MODIFY_ITEM_NAME=gql`
mutation ModifyItemName($userId: String, $itemId: String, $name: String) {
  modifyItemName(userId: $userId, itemId: $itemId, name: $name)
}
`

export const MODIFY_ITEM_CATEGORY=gql`
mutation ModifyItemCategory($userId: String, $itemId: String, $categoryId: String) {
  modifyItemCategory(userId: $userId, itemId: $itemId, categoryId: $categoryId)
}
`



export const EditItemForm = ({inventoryId, itemId, userId, setViewPortId, swipeFunction}:{inventoryId: string, itemId: String, userId:string,setViewPortId:Function, swipeFunction:Function}) => {

  const catList = CategoryListSingleton({inventoryId: inventoryId});

  const [itemFormNameInput, setItemName] = useState("Name");

  const [itemFormCategoryInput, setItemCategory] = useState("Category");
  const [openCatDropDown, setOpenCatDropDown] = useState(false);

  const [editItemNameMutationFunction, editItemNameMutationData] = useMutation(MODIFY_ITEM_NAME,
    {
      refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery", {query: FIND_ITEM}, "FindItem"],
      awaitRefetchQueries: true
    });

    const [editItemCategoryMutationFunction, editItemCategoryMutationData] = useMutation(MODIFY_ITEM_CATEGORY,
      {
        refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery", {query: FIND_ITEM}, "FindItem"],
        awaitRefetchQueries: true
      });
  

  const editItemHandler=() => {
    console.log("Item Stringified:\n" + JSON.stringify(itemId));
    const categoryKey=itemFormCategoryInput
    const name=itemFormNameInput
    //console.log("Modifying item " + item.name + " to the database. It has ID: " + itemId);
    //console.log("The category key is: " + item.categoryKey)
    editItemCategoryMutationFunction({variables: {itemId: itemId, categoryId: categoryKey, userId: userId}})
    editItemNameMutationFunction({variables:{itemId:itemId, name:name, userId: userId}})


    // while (addItemMutationData.loading) {
    //   console.log("Waiting")
    // } 
    setViewPortId();
  }
  



  if (catList.length == null) return catList;

  const changeItemNameInput = <TextForm input={itemFormNameInput} title={ "Item Name"} hintText={"My Category"} setText={setItemName}/>

const submitButton2 = <FolderBackdropActionButton buttonFunction={()=>{editItemHandler()}} argument={null} info = {{title: "Edit Item"}}/>




var categoryDropDown
if (catList.length != 0 && itemId != "none"){
  console.log("uhhh idk")
  //console.log(catList.find((value:InventoryCategory)=>value.id==chosenItemData.categoryKey))
categoryDropDown = 
<DropDownPicker
        style={{marginBottom:"40%"}}
        open={openCatDropDown}
        value={itemFormCategoryInput}
        items={catList.map((value:InventoryCategory)=>{return {"label":value.categoryName, "value":value.id}})}
        setOpen={setOpenCatDropDown}
        setValue={setItemCategory}
       

        theme="DARK"
        multiple={false}
      />;
}else{
  categoryDropDown = <View></View>
}




const formItemD2 = new FormItem("", "idk7", changeItemNameInput);
const formItemE2 = new FormItem("", "idk8", categoryDropDown);
const formItemF2 = new FormItem("Save Changes", "idk3", submitButton2);


const formItemList3 = new FormItemList([formItemD2, formItemE2, formItemF2], "Edit Item");




const folderFormData3 = new FolderSvgForm(formItemList3, new FunctionObject(()=>{}, null, "Edit Item"))






return(
    <View style={styles.container}>

<FolderFormSvg folder={folderFormData3.folder} 
              swipeFunction={new FunctionObject(swipeFunction, null, "toggle box")}/>

    </View>
  )
}
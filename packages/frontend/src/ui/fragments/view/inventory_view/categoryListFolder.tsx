import React, { useState } from "react"
import { View, FlatList, Text } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import SvgComponent from "../../../../assets/images/Vector"
import CategoryListComponent from "./categoryList"
import { styles } from "../common/mainViewStyles"
import { FloatingActionButton } from "../common/FloatingActionButton"
import { FolderFormSvg } from "../common/FolderFormSvg"
import { TextForm } from "../common/TextForm"
import { FormItem } from "../common/FormItem"
import { FolderBackdropActionButton, FolderBackdropActionButtonArgument } from "../common/FolderBackdropActionButton"
import Checkbox from "expo-checkbox"
import { folderCommonStyles } from "../common/FolderCommonStyles"
import { InventoryCategory } from "../inventory/InventoryCategory"
import { ADD_CATEGORY, FIND_CATS } from "./querySingletons"
import { useMutation } from "@apollo/client"
import { FormItemList } from "../common/FormItemList"
import { FolderSvgForm } from "../common/FolderSvgForm"
import { FunctionObject } from "../common/FunctionObject"



export const CategoryListFolder = ({userId, swipeFunction, inventoryId, itemListViewPortId, switchViewPort, setCategoryId}: {userId:string, inventoryId:string,swipeFunction: Function, switchViewPort:Function, itemListViewPortId: number, setCategoryId:Function}) => {
    

  console.log("In category list folder. User ID is: " + userId);



    const [innerViewPortId, setInnerViewPortId] = useState(0);
    const [categoryFormNameInput, setName] = useState("");
    const [categoryFormDescInput, setDesc] = useState("");
    const [checkboxValue, checkboxUI] = useState(false);
    const [addCategoryMutationFunction, addCategoryMutationData] = useMutation(ADD_CATEGORY,
      {
        refetchQueries: [{query: FIND_CATS}, "Query"],
        awaitRefetchQueries: true
      });
  
  
  
      const addCategoryHandler=(item: InventoryCategory) => {
      
          addCategoryMutationFunction({variables: {"categoryName":item.name, "inventoryId":item.inventoryKey, "categoryDesc":item.description, userId: userId, isRestricted:item.isRestricted}});
         
          setInnerViewPortId(0);

  
        }

    const categoryFormName = <TextForm input={categoryFormNameInput} title={ "Category Name"} hintText={"My Category"} setText={setName}/>
const categoryFormDesc = <TextForm input={categoryFormDescInput} title={ "Description"} hintText={"My Category"} setText={setDesc}/>

const categoryPrivCheckbox = 
<View style = {[folderCommonStyles.row, {marginTop: 40, justifyContent: "center"}]}>
    <Checkbox style = {{paddingRight: 15, backgroundColor: "white"}} value={checkboxValue} onValueChange = {checkboxUI}/>
    <Text style={{fontSize: 15}}>Designate Private</Text>
</View>

const buttonInfo: FolderBackdropActionButtonArgument = {
  title: "Add Category"
}
const submitButton = <FolderBackdropActionButton buttonFunction={addCategoryHandler} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, checkboxValue, inventoryId)} info = {buttonInfo}/>


    const formItemA = new FormItem("Category Name", "idk", categoryFormName);
const formItemB = new FormItem("Description", "idk2", categoryFormDesc);
const formItemCheckbox = new FormItem("Designate Private", "PrivCheckbox", categoryPrivCheckbox);
const formItemC = new FormItem("Add Category", "idk3", submitButton);


const formItemList = new FormItemList([formItemA, formItemB, formItemCheckbox, formItemC], "Add Category");
const folderFormData = new FolderSvgForm(formItemList, new FunctionObject(()=>{}, null, "Edit Item"));

    return(
    <View style={{width:"100%", height:"100%", flexGrow:1}}>

      
      {innerViewPortId == 0 && <TheCatList setInnerViewPortId={setInnerViewPortId} inventoryId={inventoryId} switchViewPort={switchViewPort} itemListViewPortId={itemListViewPortId} swipeFunction={swipeFunction} setCategoryId={setCategoryId} userId={userId}/>}
      {innerViewPortId == 1 && <FolderFormSvg
            folder={folderFormData.folder}
            swipeFunction={{name:"descbox", myFunction:swipeFunction, argument:null}}/>}


       

    </View>
    )
}

const TheCatList = ({userId, swipeFunction, inventoryId, itemListViewPortId, switchViewPort, setCategoryId, setInnerViewPortId}: {userId:string, inventoryId:string,swipeFunction: Function, switchViewPort:Function, itemListViewPortId: number, setCategoryId:Function, setInnerViewPortId:Function}) => {
  console.log("In category list folder. User ID is: " + userId);
  return(
    <View style={{width: "100%", height:"100%", flexGrow: 1}}>

    <SvgComponent/>

    <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => swipeFunction(true)} onSwipeUp={() => swipeFunction(false)}>
      <View>
        <Text style={styles.folderLabel}>Categories</Text>
      </View>
    </GestureRecognizer>

    
    
    <View style={styles.folderList}>

      <CategoryListComponent setCategoryId={setCategoryId} userId={userId} inventoryId={inventoryId} switchViewPort={switchViewPort} itemListViewPortId={itemListViewPortId} />

      <FloatingActionButton 
            name="add category" 
            argument={1} 
            myFunction={()=>setInnerViewPortId(1)}/>

    </View>
    
    </View>

  )
}
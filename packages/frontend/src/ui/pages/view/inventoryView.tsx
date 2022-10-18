import React, { useState, useEffect, ReactComponentElement } from 'react';
import {  StatusBar, Text, View, Button, Touchable, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { FloatingAction } from "react-native-floating-action";

import { ApolloClient, gql, InMemoryCache, useMutation } from '@apollo/client';

import inventoryController from '../controller/inventoryController';


import AddItemView from './AddFoodItemView';
import {MyHeader, FunctionObject, HeaderData, DescBoxData, FolderItemData, InventoryItem,FolderItemList,FolderSvgForm,FormItemList,FormItem, styles, TextForm, FolderFormSvg, FloatingActionButton, FolderSvg,DoubleDescBox,FolderBackdropActionButton, FolderBackdropActionButtonArgument,InventoryCategory} from '../../fragments/view'




const ItemDataChosen = ({item}: {item:InventoryItem}) => {
  if (item == null) return <View></View>
  return (
  <View style={styles.flexColumnFlexStart}>
    <Text style={styles.myBigBlackText}>Item: {item.text}</Text>
    <Text style={styles.slightlyBiggerNormalText}>Quantity: {item.capacity + ""}</Text>
    <Text style={styles.splitTextNormal}>Tags: {item.getTags()}</Text>
  </View>
  )
}

//initializing data to pass into this page's components

const dbd1 = new DescBoxData("food", "4", "Products");
const dbd2 = new DescBoxData("emoticon-sad-outline", "2", "Expired");
const data = [dbd1, dbd2];




/*OLD CODE THAT I DO NOT WANT TO DELETE SO THAT I CAN COPY IT LATER

// const SIGN_UP = gql`
// mutation signUp($email: String!, $password: String!) {
//   signUp(email: $email, password: $password){
//     email
//   }
// }
// `



END BLOCK OF OLD CODE */

const FullInvView = () => {
  const [addItemView, toggleAddItem] = useState(false);
  return(
    <View>

    {!addItemView && <InvView switchViewFunction={toggleAddItem}/>}
    {addItemView && <AddItemView switchViewFunction={toggleAddItem}/>}

    </View>
  )

}


//the view in question
const InvView = ({switchViewFunction} : {switchViewFunction:Function})=>{

  const [showDoubleDescBox, toggleDoubleDescBox] = useState(true);
  const[chosenCategory, selectCategory] = useState(-1);
  const[chosenItem, selectItem] = useState(-1);
  const [addingCategory, tryToAdd] = useState(0);

  const [chosenItemData, selectItemData] = useState(new InventoryItem("none", "none", "none", "none"));

  const chooseItem = ({item}: {item:InventoryItem})=>{
    selectItemData(item);
    selectItem(1);
    selectCategory(-1);
   
  }


const [addCategory, {loading, error}] = useMutation(ADD_CATEGORY);
const addCategoryHandler=(item: InventoryCategory) => {
  console.log("Adding category " + item.text + " to the database");
  addCategory({variables: {"categoryName":item.text, "inventoryKey":item.inventoryKey}});
  selectItem(-1);
  selectCategory(-1);
  tryToAdd(0);
}

  const backButton = () => {selectCategory(-1); tryToAdd(0); selectItem(-1);}
  const seleCat =  new FunctionObject(selectCategory, null, "select Category");
  const selItem =  new FunctionObject(selectItem, null, "select Item");

  const folderItem = new FolderItemData("Seven's favourite food", "food-steak", "32233", seleCat);
const folderItem2 = new FolderItemData("Seven's least favourite food", "carrot", "0239", seleCat);
const folderItemList = new FolderItemList([folderItem, folderItem2], "Categories");

const folderItemA = new InventoryItem("Potatoes", "vegetable", "today", "testcat");
const folderItemB = new InventoryItem("Tomatoes", "fruit", "tomorrow", "5033");
const folderItemList2 = new FolderItemList([folderItemA, folderItemB], "Items");

const [categoryFormNameInput, setName] = useState("Name");
const [categoryFormDescInput, setDesc] = useState("Description");
const categoryFormName = <TextForm input={categoryFormNameInput} title={ "Category Name"} hintText={"My Category"} setText={setName}/>
const categoryFormDesc = <TextForm input={categoryFormDescInput} title={ "Description"} hintText={"My Category"} setText={setDesc}/>

const buttonInfo: FolderBackdropActionButtonArgument = {
  title: "Add Category"
}
const submitButton = <FolderBackdropActionButton buttonFunction={addCategoryHandler} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, "testInv")} info = {buttonInfo}/>

const formItemA = new FormItem("Category Name", "idk", categoryFormName);
const formItemB = new FormItem("Description", "idk2", categoryFormDesc);
const formItemC = new FormItem("Add Category", "idk3", submitButton);



const formItemList = new FormItemList([formItemA, formItemB, formItemC], "Add Category");

const buttonInfo2: FolderBackdropActionButtonArgument = {
  title: "Edit"
}

const buttonInfo3: FolderBackdropActionButtonArgument = {
  title: "Add"
}

const buttonInfo4: FolderBackdropActionButtonArgument = {
  title: "Subtract"
}

const selItemData = <ItemDataChosen item={chosenItemData}/>
const editItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{}} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, "testInv")} info = {buttonInfo2}/>
const addToItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{}} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, "testInv")} info = {buttonInfo3}/>
const subtractFromItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{}} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, "testInv")} info = {buttonInfo4}/>


const formHeader = new FormItem("", "idkidk", selItemData);
const formItemD = new FormItem("", "idk4", editItemButton);
const formItemE = new FormItem("", "idk5", addToItemButton);
const formItemF = new FormItem("", "idk6", subtractFromItemButton);
const formItemList2 = new FormItemList([formHeader, formItemD, formItemE, formItemF], "");

const folderFormData2 = new FolderSvgForm(formItemList2, seleCat)

const folderFormData = new FolderSvgForm(formItemList, seleCat);

const headerData= new HeaderData("Food Inventory", new FunctionObject(backButton, -1, "go back"));

return(
      //the background is a gradient so...
      <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
        <MyHeader backFunction={headerData.backFunction} title={headerData.title}/>{// the title of the page plus the back button, could make this more modular but lazy
        }
        <View style={styles.flexPage}>{// container for rest of page...
        }


            {//Boxes of information with own gradient bg, made it a duple cuz i saw on a couple pages there were 2 shown in
            //the same row at once
          }


            {showDoubleDescBox && <DoubleDescBox data={data}/>}
            {//I rendered the folder u see across the ui by converting it to a vector image using the
            //"REACT VECTOR IMAGE CONVERTER SITE: google it cuz i do not remember the link
            //I then rendered the title and list of folder items onto it
          }
 
           
            {chosenCategory == -1 && addingCategory == 0 &&  chosenItem == -1 &&//This is the category folder
            <FolderSvg folder={folderItemList} 
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            itemFunction={new FunctionObject(selectCategory, null, "selectCategory")}
            />}

            {//this is the add category folder
            chosenCategory == -1 && addingCategory != 0 &&  chosenItem == -1 && <FolderFormSvg
            folder={folderFormData.folder}
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            />}

            {//this is the view items folder
            chosenCategory != -1 && chosenItem == -1 &&
            <FolderSvg folder={folderItemList2} 
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            itemFunction={new FunctionObject(chooseItem, null, "selectItem")}
            />}

              {//this is the add item view
              chosenItem != -1 && <FolderFormSvg folder={folderFormData2.folder} 
              swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")} 
              />}

          
            {//add category button
            addingCategory== 0 && chosenCategory == -1 && chosenItem==-1 && <FloatingActionButton 
            name="add category" 
            argument={1} 
            myFunction={tryToAdd}/>}

            {//add item button
            addingCategory== 0 && chosenCategory != -1 && chosenItem==-1 && <FloatingActionButton 
            name="add item" 
            argument={1} 
            myFunction={switchViewFunction}/>}  

            

        </View>
      </LinearGradient>
      
 
)
}





const ADD_CATEGORY=gql`
mutation AddCategory($categoryName: string, $inventoryKey: string){
  addCategory(categoryName: $categoryName, inventoryKey: $inventoryKey)
}
`

const FIND_CATS = gql`
query findCategoriesByInventoryId($inventoryId: String!) {
  findCatsByInvId(input: $input)
}
`;


//only export, could make this default but eh...
export default FullInvView



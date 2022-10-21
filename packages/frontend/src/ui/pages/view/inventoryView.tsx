import React, { useState, useEffect, ReactComponentElement } from 'react';
import {  StatusBar, Text, View, Button, Touchable, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { FloatingAction } from "react-native-floating-action";

import { gql, useMutation, useQuery } from '@apollo/client';

import inventoryController from '../controller/inventoryController';
import DropDownPicker from 'react-native-dropdown-picker';

import AddItemView from './AddFoodItemView';
import {MyHeader, FunctionObject, HeaderData, DescBoxData, FolderItemData, InventoryItem,FolderItemList,FolderSvgForm,FormItemList,FormItem, styles, TextForm, FolderFormSvg, FloatingActionButton, FolderSvg,DoubleDescBox,FolderBackdropActionButton, FolderBackdropActionButtonArgument,InventoryCategory} from '../../fragments/view'

export const FIND_CATS = gql`
query Query($inventoryId: String) {
  findCatsByInvId(inventoryId: $inventoryId) {
    id
    inventoryId
    categoryId
    categoryName
    categoryDesc
  }
}
`


export const ADD_CATEGORY=gql`
mutation Mutation($inventoryId: String, $categoryName: String, $categoryDesc: String) {
  addCat(inventoryId: $inventoryId, categoryName: $categoryName, categoryDesc: $categoryDesc)
}
`
export const FIND_ITEMS=gql`
query ItemsQuery($categoryId: String) {
  findItemsByCategory(categoryId: $categoryId) {
    id
    quantity
    expiration
    tags
    categoryId
    name
  }
}
`

export const CREATE_ITEM = gql`
mutation CreateItemMutation($categoryId: String, $name: String, $expiration: String) {
  createItem(categoryId: $categoryId, name: $name, expiration: $expiration)
}
`

export const ADD_CAPACITY = gql`
mutation AddCapacity($itemId: String) {
  addItem(itemId: $itemId)
}
`

export const SUBTRACT_CAPACITY = gql`
mutation SubtractItem($itemId: String) {
  subtractItem(itemId: $itemId)
}
`

export const MODIFY_ITEM_NAME=gql`
mutation ModifyItemName($itemId: String, $name: String) {
  modifyItemName(itemId: $itemId, name: $name)
}
`

export const MODIFY_ITEM_CATEGORY=gql`
mutation ModifyItemCategory($itemId: String, $categoryId: String) {
  modifyItemCategory(itemId: $itemId, categoryId: $categoryId)
}
`


const ItemDataChosen = ({item}: {item:InventoryItem}) => {
  if (item == null) return <View></View>
  return (
  <View style={styles.flexColumnFlexStart}>
    <Text style={styles.myBigBlackText}>Item: {item.name}</Text>
    <Text style={styles.slightlyBiggerNormalText}>Quantity: {item.capacity + ""}</Text>
    <Text style={styles.splitTextNormal}>Tags: {item.getTags()}</Text>
  </View>
  )
}










//initializing data to pass into this page's components

const dbd1 = new DescBoxData("food", "4", "Products");
const dbd2 = new DescBoxData("emoticon-sad-outline", "2", "Expired");
const data2 = [dbd1, dbd2];




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
  const [addItemView, setAddItem] = useState(false);
  const toggleAddItem = () => {setAddItem(!addItemView)}
  const [addItemFunction, setAddItemFunciton] = useState({function:new Function})
  console.log("Modifying FullInvView");
  return(
    <View>

    {!addItemView && <InvView switchViewFunction={toggleAddItem} inventoryId="huh" setAddItemFunction={setAddItemFunciton}/>}
    {addItemView && <AddItemView switchViewFunction={toggleAddItem} submitFunction={addItemFunction.function}/>}

    </View>
  )

}


//the view in question
const InvView = ({switchViewFunction, inventoryId, setAddItemFunction} : {switchViewFunction:Function, inventoryId:string, setAddItemFunction:Function})=>{

  const dummyItem = new InventoryItem("none", "none", "none", "none")
  dummyItem.id = "none"

  const [showDoubleDescBox, toggleDoubleDescBox] = useState(true);
  const[chosenCategory, selectCategory] = useState("none");
  const[chosenItem, selectItem] = useState("none");
  const [addingCategory, tryToAdd] = useState(false);
  const [addingItem, tryToAddItem] = useState(false);
  const [catList, setCatList] = useState([] as InventoryCategory[]);
  const [itemList, setItemList] = useState([] as InventoryItem[]);
  const [categoryFormNameInput, setName] = useState("Name");
  const [itemFormNameInput, setItemName] = useState("Name");
const [categoryFormDescInput, setDesc] = useState("Description");
const [itemFormCategoryInput, setItemCategory] = useState("Category");
const [openCatDropDown, setOpenCatDropDown] = useState(false);
const [editItemFlag, setEditItemFlag] = useState(false);
const [reloadQueries, setReloadQueries] = useState(true);


  const [chosenItemData, selectItemData] = useState(dummyItem);

  const chooseItem = ({item}: {item:InventoryItem})=>{
    selectItemData(item);
    selectItem(item.name);
  }


  console.log("Inventory ID is:" + inventoryId)
  console.log("Chosen category ID is:" + chosenCategory)
  const categoryQuery = useQuery(FIND_CATS, {
    variables: {inventoryId: inventoryId}
  });

  const [addCategoryMutationFunction, addCategoryMutationData] = useMutation(ADD_CATEGORY,
    {
      refetchQueries: [{query: FIND_CATS}, "Query"],
      awaitRefetchQueries: true
      
    });

    const [addItemMutationFunction, addItemMutationData] = useMutation(CREATE_ITEM,
      {
        refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery"],
        awaitRefetchQueries: true
      });


      const [editItemNameMutationFunction, editItemNameMutationData] = useMutation(MODIFY_ITEM_NAME,
        {
          refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery"],
          awaitRefetchQueries: true
        });

        const [editItemCategoryMutationFunction, editItemCategoryMutationData] = useMutation(MODIFY_ITEM_CATEGORY,
          {
            refetchQueries: [{query: FIND_ITEMS}, "ItemsQuery"],
            awaitRefetchQueries: true
          });

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
  


  const findItemsQuery = useQuery(FIND_ITEMS, {
    variables: {categoryId: chosenCategory}
  })

  


  

  const addCategoryHandler=(item: InventoryCategory) => {
    console.log("Adding category " + item.name + " to the database");
    console.log("The inventory key is: " + item.inventoryKey)
    addCategoryMutationFunction({variables: {"categoryName":item.name, "inventoryId":item.inventoryKey, "categoryDesc":item.description}});
    while (addCategoryMutationData.loading) {
      console.log("Waiting")
    }
    setReloadQueries(true);

    tryToAdd(false);

  }

  const addItemHandler=(item: InventoryItem) => {
    item.categoryKey=chosenCategory
    console.log("Adding item " + item.name + " to the database");
    console.log("The category key is: " + item.categoryKey)
    addItemMutationFunction({variables: {"name":item.name, "categoryId":item.categoryKey, "expiration":"none"}});
    setReloadQueries(true);

    // while (addItemMutationData.loading) {
    //   console.log("Waiting")
    // } 
    backButton();
  }

  const editItemHandler=(item: InventoryItem) => {
    console.log("Item Stringified:\n" + JSON.stringify(item));
    item.categoryKey=itemFormCategoryInput
    item.name=itemFormNameInput
    console.log("Modifying item " + item.name + " to the database. It has ID: " + item.id);
    console.log("The category key is: " + item.categoryKey)
    editItemCategoryMutationFunction({variables: {itemId: item.id, categoryId:item.categoryKey}})
    editItemNameMutationFunction({variables:{itemId:item.id, name:item.name}})
    setReloadQueries(true);

    // while (addItemMutationData.loading) {
    //   console.log("Waiting")
    // } 
    backButton();
  }

  const addCapacityHandler=(item: InventoryItem) => {
    console.log("Item Stringified:\n" + JSON.stringify(item));
    
    console.log("Modifying item " + item.name + " to the database. It has ID: " + item.id);
    console.log("The category key is: " + item.categoryKey)
    addCapacityMutationFunction({variables: {itemId: item.id}});
    setReloadQueries(true);

    // while (addItemMutationData.loading) {
    //   console.log("Waiting")
    // } 
    
  }

  const subtractCapacityHandler=(item: InventoryItem) => {
    console.log("Item Stringified:\n" + JSON.stringify(item));
    
    console.log("Modifying item " + item.name + " to the database. It has ID: " + item.id);
    console.log("The category key is: " + item.categoryKey)
    subtractCapacityMutationFunction({variables: {itemId: item.id}});
    setReloadQueries(true);
    // while (addItemMutationData.loading) {
    //   console.log("Waiting")
    // } 
    
  }



  //console.log(":C");
  if (editItemCategoryMutationData.loading||editItemNameMutationData.loading||categoryQuery.loading || addCategoryMutationData.loading || findItemsQuery.loading || addItemMutationData.loading || addCapacityMutationData.loading || subtractCapacityMutationData.loading) return <Text>Loading...</Text>
  else if (categoryQuery.error) return <Text>Error: {categoryQuery.error.name} - {categoryQuery.error.message}{"\n"}Caused by: {categoryQuery.error.cause}{"\n"}Extra info: {categoryQuery.error.extraInfo}</Text>
  else if (addCategoryMutationData.error) return <Text>Error: {addCategoryMutationData.error.name} - {addCategoryMutationData.error.message}{"\n"}Caused by: {addCategoryMutationData.error.cause}{"\n"}Extra info: {addCategoryMutationData.error.extraInfo}</Text>
  else if (findItemsQuery.error) return <Text>Error: {findItemsQuery.error.name} - {findItemsQuery.error.message}{"\n"}Caused by: {findItemsQuery.error.cause}{"\n"}Extra info: {findItemsQuery.error.extraInfo}</Text>
  


  const queryCatList = categoryQuery.data.findCatsByInvId; 
  const queryItemList = findItemsQuery.data.findItemsByCategory;

  // console.log("LOOK AT QUERY CAT LIST")
  // console.log(JSON.stringify(queryCatList));
 

 


    

    
 

    //console.log(":C:C");




  const backButton = () => {
    if (addingCategory) tryToAdd(false)
    else if (addingItem) tryToAddItem(false)
    else if (chosenItem != "none") chooseItem({item:dummyItem})
    else if (chosenCategory != "none") selectCategory("none")

   
  }

  const seleCat =  new FunctionObject(selectCategory, null, "select Category");
  const selItem =  new FunctionObject(selectItem, null, "select Item");
  var count = 0
  var tempList = [] as InventoryCategory[]
  for (var litem of queryCatList){
    //console.log(litem.categoryName+ "\n" + litem.categoryDesc+  "\n" + litem.inventoryId)
    tempList[count] = new InventoryCategory(litem.categoryName, litem.categoryDesc, litem.inventoryId)
    tempList[count].touchFunction = seleCat;
    tempList[count].id = litem.id
    count++;
    
  }

  count = 0
  var tempList2 = [] as InventoryItem[]
  for (var litem of queryItemList){
    //console.log(litem.categoryName+ "\n" + litem.categoryDesc+  "\n" + litem.inventoryId)
    tempList2[count] = new InventoryItem(litem.name, "", litem.expiration, litem.categoryId)
    tempList2[count].id = litem.id;
    tempList2[count].capacity = litem.quantity
    count++;
   
  }




  // console.log("LOOK AT TEMP LIST:")
  // console.log(JSON.stringify(tempList))

  //if (tempList != catList) setCatList(tempList);


  //resets cat list if length changes... naive solution until we get listeners
  //if (queryCatList.length != catList.length) 


  //newer solution we just set a flag whenever we edit something 
  //edit: combine methods 1 and 3
  if (reloadQueries || queryItemList.length != itemList.length || queryCatList.length != catList.length){
    setCatList(tempList);
    setItemList(tempList2);
    console.log(chosenItemData.id);
    if (chosenItemData.id != "none") {
      console.log("funny business is going on here");
      chooseItem({item: tempList2.find((value:InventoryItem)=>value.id==chosenItemData.id)!})
    }

    console.log(chosenItemData.capacity)
    setReloadQueries(false);
  }

  //new solution, we map list of qualities

  
  // if (queryCatList.map(
  //   (value:any)=>{return [value.id, value.name, value.description]}
  //   ) != catList.map((value:InventoryCategory)=>{return [value.id, value.name, value.description]})) setCatList(tempList);


    //if (queryItemList.length != itemList.length) setItemList(tempList2);

  // if (queryItemList.map(
  //   (value:any)=>{return [value.id, value.name, value.categoryId, value.capacity]}
  //   ) != itemList.map((value:InventoryItem)=>{return [value.id, value.name, value.categoryKey, value.capacity]})) setItemList(tempList2);
 
  //console.log("LOOK AT CAT LIST")
 //console.log(JSON.stringify(catList));
  //console.assert(queryCatList == catList)
  
  //console.log("what even")
  
  //console.log(catList[0].touchFunction.name)


  if (chosenCategory != "none"){

  }




  const folderItem = new FolderItemData("Seven's favourite food", "food-steak", "32233", seleCat);
const folderItem2 = new FolderItemData("Seven's least favourite food", "carrot", "0239", seleCat);
const folderItemList = new FolderItemList([folderItem, folderItem2], "Categories");


//console.log("what even")

const queriedCategoryList = new FolderItemList(catList, "Categories")
const queriedItemList = new FolderItemList(itemList, "Items")

const folderItemA = new InventoryItem("Potatoes", "vegetable", "today", "testcat");
const folderItemB = new InventoryItem("Tomatoes", "fruit", "tomorrow", "5033");
const folderItemList2 = new FolderItemList([folderItemA, folderItemB], "Items");


const categoryFormName = <TextForm input={categoryFormNameInput} title={ "Category Name"} hintText={"My Category"} setText={setName}/>
const categoryFormDesc = <TextForm input={categoryFormDescInput} title={ "Description"} hintText={"My Category"} setText={setDesc}/>

const buttonInfo: FolderBackdropActionButtonArgument = {
  title: "Add Category"
}
const submitButton = <FolderBackdropActionButton buttonFunction={addCategoryHandler} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, inventoryId)} info = {buttonInfo}/>

const formItemA = new FormItem("Category Name", "idk", categoryFormName);
const formItemB = new FormItem("Description", "idk2", categoryFormDesc);
const formItemC = new FormItem("Add Category", "idk3", submitButton);

//console.log("what even")

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

const buttonInfo5: FolderBackdropActionButtonArgument = {
  title: "Save Changes"
}

//console.log("what even")

const selItemData = <ItemDataChosen item={chosenItemData}/>
const editItemButton = <FolderBackdropActionButton buttonFunction={() =>{console.log("pls stop touching my tralala this is harrassment");setEditItemFlag(true);console.log("editFlag: "+ editItemFlag)}} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, "testInv")} info = {buttonInfo2}/>
const addToItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{addCapacityHandler(chosenItemData)}} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, "testInv")} info = {buttonInfo3}/>
const subtractFromItemButton = <FolderBackdropActionButton buttonFunction={(filler:any) =>{subtractCapacityHandler(chosenItemData)}} argument={new InventoryCategory(categoryFormNameInput, categoryFormDescInput, "testInv")} info = {buttonInfo4}/>



const changeItemNameInput = <TextForm input={itemFormNameInput} title={ "Item Name"} hintText={"My Category"} setText={setItemName}/>

const submitButton2 = <FolderBackdropActionButton buttonFunction={()=>{editItemHandler(chosenItemData)}} argument={chosenItemData} info = {buttonInfo5}/>


var categoryDropDown
if (catList.length != 0 && chosenItem != "none"){
  console.log("uhhh idk")
  console.log(catList.find((value:InventoryCategory)=>value.id==chosenItemData.categoryKey))
categoryDropDown = 
<DropDownPicker
        open={openCatDropDown}
        value={itemFormCategoryInput}
        items={catList.map((value:InventoryCategory)=>{return {"label":value.categoryName, "value":value.id}})}
        setOpen={setOpenCatDropDown}
        setValue={setItemCategory}
       

        theme="DARK"
        multiple={false}
      />;
}

else categoryDropDown = <View></View>;







//console.log("what even")

const formHeader = new FormItem("", "idkidk", selItemData);
const formItemD = new FormItem("", "idk4", editItemButton);
const formItemE = new FormItem("", "idk5", addToItemButton);
const formItemF = new FormItem("", "idk6", subtractFromItemButton);
const formItemList2 = new FormItemList([formHeader, formItemD, formItemE, formItemF], "");

const folderFormData2 = new FolderSvgForm(formItemList2, seleCat);

const formHeader2 = new FormItem("", "idkidk", selItemData);
const formItemD2 = new FormItem("", "idk7", changeItemNameInput);
const formItemE2 = new FormItem("", "idk8", categoryDropDown);
const formItemF2 = new FormItem("Save Changes", "idk3", submitButton2);
const formItemList3 = new FormItemList([formHeader2, formItemD2, formItemE2, formItemF2], "");



const folderFormData = new FolderSvgForm(formItemList, seleCat);

const folderFormData3 = new FolderSvgForm(formItemList3, new FunctionObject(()=>{}, null, "Edit Item"))

const headerData= new HeaderData("Food Inventory", new FunctionObject(backButton, -1, "go back"));
//console.log("what even")

const showCategoryFolder = chosenCategory == "none" && addingCategory == false &&  chosenItem == "none";
const showAddCategoryForm = addingCategory == true
const showItemDetailFolder = chosenItem!="none" && !editItemFlag;
const showEditItemFolder = editItemFlag;
const showItemFolder = chosenCategory != "none" && chosenItem == "none" && addingItem == false;

console.log("show Edit Item Folder: " + showEditItemFolder + "\nShow Item Detail Folder: "+ showItemDetailFolder);
console.log("chosen item name is: " + chosenItemData.name)
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


            {showDoubleDescBox && <DoubleDescBox data={data2}/>}
            {//I rendered the folder u see across the ui by converting it to a vector image using the
            //"REACT VECTOR IMAGE CONVERTER SITE: google it cuz i do not remember the link
            //I then rendered the title and list of folder items onto it 
            
          }
 
           
            {showCategoryFolder &&
            //This is the category folder
            <FolderSvg folder={queriedCategoryList} 
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            itemFunction={new FunctionObject(selectCategory, chosenCategory, "selectCategory")}
            />}

            {//this is the add category folder
             showAddCategoryForm && <FolderFormSvg
            folder={folderFormData.folder}
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            />}

            {//this is the view items folder
            showItemFolder &&
            <FolderSvg folder={queriedItemList} 
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            itemFunction={new FunctionObject(chooseItem, null, "selectItem")}
            />}

              {//this is the chosenItemView
              showItemDetailFolder && <FolderFormSvg folder={folderFormData2.folder} 
              swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")} 
              />}

              {//this is the editChosenItemView
              showEditItemFolder && <FolderFormSvg folder={folderFormData3.folder} 
              swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")} 
              />}

          
            {//add category button
            showCategoryFolder && <FloatingActionButton 
            name="add category" 
            argument={1} 
            myFunction={tryToAdd}/>}

            {//add item button
            showItemFolder && <FloatingActionButton 
            name="add item" 
            argument={null} 
            myFunction={()=>{console.log("I AM CONFUSION");setAddItemFunction({function: addItemHandler});console.log("I SEE THE FUNNY");switchViewFunction();console.log("SHHHHHUT UP")}}/>}  

            

        </View>
      </LinearGradient>
      
 
)
}








//only export, could make this default but eh...
export default FullInvView



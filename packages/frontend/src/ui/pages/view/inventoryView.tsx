import React, { useState, useEffect, ReactComponentElement, ReactElement } from 'react';
import {  SafeAreaView,  FlatList,  StatusBar, Text, View, StyleSheet, Button, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import SvgComponent from '../../../assets/images/Vector';
import SvgComponentLightBlue from '../../../assets/images/LightBlueVector';
import { FloatingAction } from "react-native-floating-action";

import { ApolloClient, gql, InMemoryCache, useMutation } from '@apollo/client';

import inventoryController from '../controller/inventoryController';

import GestureRecognizer from 'react-native-swipe-gestures';






//react wouldn't let me pass a string into a component without this
class TextOBJ{
  text: string;



  constructor(){
      this.text = "";

  }
}

class HeaderData{
  title: string;
  backFunction:FunctionObject;
  constructor(title:string, backFunction:FunctionObject){
    this.backFunction = backFunction;
    this.title = title;
  }
}


//template for the rounded corner boxes across the ui with 3 parts, 1 icon and 2 strings
class DescBoxData{
  iconName: string;
  text1: string;
  text2: string;

  constructor(iconName: string, text1: string, text2: string){
      this.iconName = iconName;
      this.text1 = text1;
      this.text2 = text2;
  }
}


//react wouldnt let me pass a normal list of the box data class so
//i had to make another class just to hold the list and pass that
class DescBoxList{
  data:DescBoxData[];

  constructor(dbl: DescBoxData[]){
      this.data = []
  }

}

//a lot of the app uses folders so i made this class to store data to put into a list for a listview that renders inside
//the folder image
class FolderItemData{
  text: string;
  iconName: string;
  id: string
  touchFunction: FunctionObject;
  constructor(text: string, iconName: string, id: string, touchFunction: FunctionObject){
    this.text = text;
    this.iconName = iconName;
    this.id = id;
    this.touchFunction = touchFunction;
  }

}


class InventoryItem extends FolderItemData{
  capacity: number;
  expirationDate: Date;
  categoryKey: string;
  constructor(itemName: string, itemId: string, capacity: number, categoryKey: string){
    super(itemName, "", itemId, new FunctionObject(() => {}, null, itemName + "'s TouchFunction"), );
    this.capacity = capacity;
    this.expirationDate = new Date();
    this.categoryKey = categoryKey;
  }
}

class InventoryCategory extends FolderItemData{
  inventoryKey: string;
  constructor(categoryName: string, categoryId: string, inventoryKey: string){
    super(categoryName, "", categoryId, new FunctionObject(() => {}, null, categoryName + "'s TouchFunction"), );
    this.inventoryKey = inventoryKey;
  }
}


//list of the above class with a title... basically all u need for the folder composition
//technically i could make the data class abstract so that we can use it across all folder images as a couple have
//different structures but not right now cuz i am lazy
class FolderItemList{
  list: FolderItemData[];
  title: string;
  constructor(list: FolderItemData[], title:string){
    this.list = list;
    this.title = title;
  }
}

class FunctionObject{

  myFunction: Function;
  argument: any;
  name: string;
  constructor(myFunction:Function, argument:any, name:string){
    this.myFunction = myFunction;
    this.argument = argument;
    this.name=name;
  }


}

class FolderSvgClass{
  folder: FolderItemList;
  swipeFunction: FunctionObject;
  itemFunction: FunctionObject;
  constructor(folder: FolderItemList, swipeFunction: FunctionObject, itemFunction: FunctionObject){
    this.folder = folder;
    this.swipeFunction = swipeFunction;
    this.itemFunction = itemFunction;
  }
}

class FolderSvgForm{

  folder: FormItemList;
  swipeFunction: FunctionObject;
  constructor(folder: FormItemList, swipeFunction: FunctionObject){
    this.folder = folder;
    this.swipeFunction = swipeFunction;
  }

}

class FormItemList{
  list: FormItem[];
  title: string;

  constructor(list :FormItem[], title:string){
    this.list = list;
    this.title = title;
  }

}

class FormItem{

  id:string;
  title: string;
  component:ReactElement;
  constructor(title: string, id:string, component:ReactElement){
    this.title = title;
    this.id = id;
    this.component = component;
  }

}












//initializing data to pass into this page's components

const dbd1 = new DescBoxData("food", "4", "Products");
const dbd2 = new DescBoxData("emoticon-sad-outline", "2", "Expired");
const data = [dbd1, dbd2];






const invCont = new inventoryController.inventoryController();




/*OLD CODE THAT I DO NOT WANT TO DELETE SO THAT I CAN COPY IT LATER

// const SIGN_UP = gql`
// mutation signUp($email: String!, $password: String!) {
//   signUp(email: $email, password: $password){
//     email
//   }
// }
// `

// const client = new ApolloClient({
//     uri: 'http://localhost:8000/graphql',
//     name: 'test',
//     cache: new InMemoryCache(),
//     version: '0'
//   });

END BLOCK OF OLD CODE */


//the view in question
const InvView = ()=>{

  useEffect(() => {

  }, []);
  const [showDoubleDescBox, toggleDoubleDescBox] = useState(true);
  const[chosenCategory, selectCategory] = useState(-1);
  const[chosenItem, selectItem] = useState(-1);
  const [addingCategory, tryToAdd] = useState(0);


const [addItem, {loading, error}] = useMutation(ADD_ITEM);

  const backButton = () => {selectItem(0); selectCategory(-1); tryToAdd(0);}
  const seleCat =  new FunctionObject(selectCategory, null, "select Category");
  const selItem =  new FunctionObject(selectItem, null, "select Item");

  const folderItem = new FolderItemData("Seven's favourite food", "food-steak", "77777", seleCat);
const folderItem2 = new FolderItemData("Seven's least favourite food", "carrot", "77778", seleCat);
const folderItemList = new FolderItemList([folderItem, folderItem2], "Categories");

const folderItemA = new FolderItemData("Potatoes", "none", "444", selItem);
const folderItemB = new FolderItemData("Tomatoes", "none", "5033", selItem);
const folderItemList2 = new FolderItemList([folderItemA, folderItemB], "Items");

const [categoryFormNameInput, setName] = useState("Name");
const [categoryFormDescInput, setDesc] = useState("Description");
const categoryFormName = <TextForm input={categoryFormNameInput} title={ "Category Name "} hintText={"My Category"} setText={setName}/>
const categoryFormDesc = <TextForm input={categoryFormDescInput} title={ "Description"} hintText={"My Category"} setText={setDesc}/>
const categoryFormButton = <TouchableOpacity></TouchableOpacity>

const formItemA = new FormItem("Category Name", "idk", categoryFormName);
const formItemB = new FormItem("Description", "idk2", categoryFormDesc);

const formItemList = new FormItemList([formItemA, formItemB], "Add Category");

const folderFormData = new FolderSvgForm(formItemList, seleCat);

const headerData= new HeaderData("Food Inventory", new FunctionObject(backButton, -1, "go back"));




const addItemHandler=(item: InventoryItem) => {
  console.log("Adding item " + item.text + " to the database");
  addItem({variables: {"itemName":item.text, "capacity":item.capacity, "categoryKey":item.categoryKey}});

}
  /*OLD CODE THAT I DO NOT WANT TO DELETE SO THAT I CAN COPY IT LATER


  // console.log(data[1].iconName)

  // const [input] = useState()
  // const [signup,  { loading, error }] = useMutation(SIGN_UP)
  // if(loading){
  //     return  <View style={styles.flexContainer}><Text style={styles.input}>{'loading failed'} </Text></View>
  // }
  // if(error){
  //     return <View style={styles.flexContainer}><Text style={styles.input}>{'error occured'}</Text></View>
  // }

  END BLOCK OF OLD CODE */
return(

      //the background is a gradient so...
      <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
        <MyHeader backFunction={headerData.backFunction} title={headerData.title}/>{// the title of the page plus the back button, could make this more modular but lazy
        }
        <View style={styles.flexPage}>{// container for rest of page...
        }


          {

            //OLD CODE THAT I DO NOT WANT TO DELETE SO THAT I CAN COPY IT LATER
            // <TextInput
            //style={styles.input}
            //defaultValue={input}
            //value = {input}
            //onChangeText={input}
            //textAlign="center"
            //placeholder="TYPE HERE"
            //onSubmitEditing={submitHandle}/>*/}
            //* <Button
            //onPress={submitHandle}
            //title="CREATE RESOURCE"
            //color="red"/>

          //END BLOCK OF OLD CODE */
          }

            {//Boxes of information with own gradient bg, made it a duple cuz i saw on a couple pages there were 2 shown in
            //the same row at once
          }


            {showDoubleDescBox && <DoubleDescBox data={data}/>}
            {//I rendered the folder u see across the ui by converting it to a vector image using the
            //"REACT VECTOR IMAGE CONVERTER SITE: google it cuz i do not remember the link
            //I then rendered the title and list of folder items onto it
          }


            {chosenCategory == -1 && addingCategory == 0 && //This is the category folder
            <FolderSvg folder={folderItemList}
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            itemFunction={new FunctionObject(selectCategory, null, "selectCategory")}
            />}

            {//this is the add category folder
            chosenCategory == -1 && addingCategory != 0 &&  <FolderFormSvg
            folder={folderFormData.folder}
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            />}

            {chosenCategory != -1 &&
            <FolderSvg folder={folderItemList2}
            swipeFunction={new FunctionObject(toggleDoubleDescBox, !showDoubleDescBox, "toggle box")}
            itemFunction={new FunctionObject(selectCategory, null, "selectCategory")}
            />}


            {}

             {//Button in bottom right corner to add something
             }
             <Button title={"debug"} onPress={() => toggleDoubleDescBox(showDoubleDescBox)}></Button>
            {addingCategory== 0 && <FloatingActionButton
            name="add category"
            argument={1}
            myFunction={tryToAdd}/>}

        </View>
      </LinearGradient>


)
}







const DescBox = (data:DescBoxData) =>{
  return (
        <View style={styles.rcorners1}>
          <TouchableOpacity style={styles.container}>
          <LinearGradient colors={['#106A7C', '#3E436C']} style={styles.linearGradient1} start={[-0.04, 0]} end={[1.34, 1.34]}>
                <MaterialCommunityIcons
                size={24}
                color={"#FFFFFF"}
                //I ignore typescript below so that i can make the name a parameter
                //as the icon class is typed only for valid string
                //@ts-ignore
                name={data.iconName} ></MaterialCommunityIcons>
                <Text style={styles.whiteText2}>{data.text1}</Text>
                <Text style={styles.whiteText1}>{data.text2}</Text>
            </LinearGradient>

          </TouchableOpacity>

        </View>
  );
}

//same as the above but different color, technically i could make the gradient style a
//field but right now that is too much work
const DescBox2 = (data:DescBoxData) =>{
    return (

          <View style={styles.rcorners1}>
            <TouchableOpacity style={styles.container}>
              <LinearGradient colors={['#34ACBC', '#9FD3DE']} style={styles.linearGradient1} start={[-0.04, 0]} end={[1.34, 1.34]}>
                  <MaterialCommunityIcons
                  size={24}
                  color={"#FFFFFF"}
                  //@ts-ignore
                  name={data.iconName} ></MaterialCommunityIcons>
                  <Text style={styles.whiteText2}>{data.text1}</Text>
                  <Text style={styles.whiteText1}>{data.text2}</Text>
              </LinearGradient>
              </TouchableOpacity>
          </View>
    );
  }




//i explained this above
const DoubleDescBox = (data:DescBoxList) =>{


    return (
        <View style={styles.rowFlex1}>

            <DescBox iconName={data.data[0].iconName} text1={data.data[0].text1} text2={data.data[0].text2}/>


            <DescBox2 iconName={data.data[1].iconName} text1={data.data[1].text1} text2={data.data[1].text2}/>
        </View>
    )
}



//self explanatory
const MyHeader = (data:HeaderData) =>{
    return (
        <View style={styles.myHeader}>

          <View style={styles.rowFlex2}>


            <TouchableOpacity style={styles.headerIcon} onPress={() => data.backFunction.myFunction(data.backFunction.argument)}>
              <MaterialCommunityIcons name="arrow-left" size={24}/>
              </TouchableOpacity>

            <Text style={styles.myHeaderText}>{data.title}</Text>

          </View>

        </View>
    )
}

//doing this to avoid having the style for each text look annoying in the code
const WhiteText1 = () =>{
    return(
        <View>
            <Text style={styles.whiteText1}></Text>
        </View>
    )
}


//explained this already... only thing of note is that i didnt make the list view yet so i only show 1 item at a time
// z-index of vector is set to -1 so that other stuff is guaranteed to render on top of it
const FolderSvg = (data: FolderSvgClass) =>{

  console.log(data.swipeFunction.name);

  return (
    <View style={styles.maxContainer}>
      <SvgComponent zIndex={-1}/>


      <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => data.swipeFunction.myFunction(true)} onSwipeUp={() => data.swipeFunction.myFunction(false)}>
        <View>
        <Text style={styles.folderLabel}>{data.folder.title}</Text>
        </View>
      </GestureRecognizer>

        <View style={styles.folderList}>


          <SafeAreaView style={styles.container}>
           <FlatList style={styles.container}
           data={data.folder.list}
           renderItem={({item})=>(<FolderListItem iconName={item.iconName} text={item.text} id={item.id} touchFunction={new FunctionObject(data.itemFunction.myFunction, item.id, item.text)}/>)}
           keyExtractor={item => item.id}>
           </FlatList>
          </SafeAreaView>

        </View>

    </View>
  )
}




//i explained this
const FloatingActionButton = (myFunction: FunctionObject) =>{
  return (
    <TouchableOpacity style={styles.fab} onPress={ () => myFunction.myFunction(myFunction.argument)}>


      <MaterialCommunityIcons name="plus" size={32} color={"#767171"}/>


    </TouchableOpacity>
  )
}

//i explained this
const FolderListItem = (item:FolderItemData) =>{
  return (
    <TouchableOpacity onPress={() => item.touchFunction.myFunction(item.touchFunction.argument)}>
      <View style={styles.folderListItem}>
       {item.iconName != "none" && <BorderIcon text={item.iconName}></BorderIcon>}



<Text style={styles.splitTextNormal} >{item.text}</Text>

</View>
    </TouchableOpacity>

  )
}






const FolderFormListItem = (item:FormItem) =>{
  const component = item.component
  return (
      <View>
        {component}
      </View>

  )
}

const FolderFormSvg = (data: FolderSvgForm) =>{

  console.log(data.folder.title);

  return (
    <View style={styles.maxContainer}>
      <SvgComponentLightBlue zIndex={-1}/>


      <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => data.swipeFunction.myFunction(true)} onSwipeUp={() => data.swipeFunction.myFunction(false)}>
        <View>
        <Text style={styles.folderLabelBlack}>{data.folder.title}</Text>
        </View>
      </GestureRecognizer>

        <View style={styles.folderList}>


          <SafeAreaView style={styles.container}>
           <FlatList style={styles.container}
           data={data.folder.list}
           renderItem={({item})=>(<FolderFormListItem title={item.title} component={item.component} id={item.id}/>)}
           keyExtractor={item => item.id}>
           </FlatList>
          </SafeAreaView>

        </View>

    </View>
  )
}

const TextForm = ({input, title, hintText, setText}: {input:string, title:string, hintText:string, setText:Function}) => {
  // const [input] = useState()
  // const [addCategory, {loading, error}] = useMutation(ADD_CATEGORY);

  // const addItemHandler=(item: InventoryCategory) => {
  //   console.log("Adding item " + item.text + " to the database");
  //   addCategory({variables: {"categoryName":item.text, "inventoryKey":item.inventoryKey}});

  // }

  return(

    <View>
      <Text>{title}</Text>
     <View style={styles.inputBox}>

      <TextInput
            style={styles.input}
            defaultValue={input}
            value = {input}
            onChangeText={(inputText) => {setText(inputText)}}
            textAlign="center"
            placeholder="TYPE HERE"
            onSubmitEditing={()=>{}}/>

    </View>


    </View>
  )
}










const BorderIcon = (iconName: TextOBJ) => {
  return(

    <View style={styles.iconBorder}>
    <View style={styles.center}>

      {/*@ts-ignore*/}
       <MaterialCommunityIcons name={iconName.text} size={32} style={styles.splitIcon}/>
    </View>
  </View>

  )
}


const ToggleList = () => {



}





const ADD_ITEM=gql`
mutation AddItem($itemName: string, $capacity: number, $categoryKey: string){
  addItem(itemName: $itemName, capacity: $capacity, categoryKey: $categoryKey)
}
`

const ADD_CATEGORY=gql`
mutation AddCategory($categoryName: string, $inventoryKey: string){
  addItem(categoryName: $categoryName, inventoryKey: $inventoryKey)
}
`


//only export, could make this default but eh...
export default InvView

//not explaining the styles there are too many
//there are probably some unused ones but vs code isn't showing me
//a lot of decisions here work but i do not know why
//btw the box shadow thing isn't working but i will figure that out some other time
const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: "center",
  },
  rcorners1: {
    borderRadius: 10,
    width: "40%",
    margin: "8%",


    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5

  },

  myHeader: {

    paddingHorizontal:"4%",
    marginTop:"14%",
    width:"100%",
    height: '4%',

  },

  myHeaderText: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Arial",
    width: "66.67%",

  },

  myNormalText: {
    fontWeight: "normal",
    fontSize: 16,
    fontFamily: "Arial"
  },

  splitIcon: {
    width: "33%",
  },

  splitTextNormal: {
    width: "66%",
    fontWeight: "normal",
    fontSize: 18,
    fontFamily: "Arial"
  },


  linearGradient1: {

    width:"100%",
    height:"100%",
    borderRadius: 10,
    backgroundColor: '#73AD21',
    padding: 20,
    flex: 1,
    flexDirection: "column",
    alignItems: 'flex-start',
    justifyContent: 'space-around',

  },

  whiteText1: {
    fontWeight: "normal",
    fontSize: 15,
    fontFamily: "Arial",
    color: "#FFFFFF",

  },

  whiteText2: {
    fontWeight: "normal",
    fontSize: 25,
    fontFamily: "Arial",
    color: "#FFFFFF",

  },

  whiteIcon1: {
    backgroundColor: "#FFFFFF"
  },

  rowFlex1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    height:"100%",
    width:"100%",
    minHeight: 200,
  },

  rowFlex2:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    height:"100%",
    width:"100%",

    alignItems: 'center',
  },

  bg1Page: {
    width: "100%",
    height: "100%",

  },

  svgContainer: {
    width: "100%",
    height: "100%",
    zIndex: -1,

  },

  container: {
    width:"100%",
    height:"100%",
  },

  fab:{
    position: "absolute",
    right:0,
    bottom:0,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    backgroundColor: '#FFFFFFCC',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
    alignItems: 'center',
    justifyContent: 'center',
    margin: "2%",
    padding:"2%"

  },

  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    color: "#000000",


  },
  inputBox: {
    height: "100%",
    minHeight: 30,
    maxHeight: 80,
    width: "100%",
    backgroundColor: "#FFFFFF90",
    borderRadius: 15,
    alignContent: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0.5,
      height: 2
    },
    shadowRadius: 0.5,
    shadowOpacity: 0.5,




  },

  marginContainer: {
    width:"100%",
    height:"100%",

  },
  inputBoxBox:{
    borderRadius: 15,
    alignContent: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,

  },
  page: {
    width: "100%",
    height: "100%",

  },

  page2: {
    width: "100%",
    height: "100%",
  },

  flexPage: {

    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start'



  },

  headerIcon: {
   width: "23.33%",
  },

  folderList: {
    marginTop:"7%",

    position: "absolute",
    top:0,
    left:0,
    right:0,
    padding: "10%",
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  folderListItem: {
    height: "10%",
    minHeight: 100,
    maxHeight: 110,
    width: "100%",

    backgroundColor: "#FFFFFFCC",
    borderRadius: 10,

    flex:1,
    flexDirection: "row",
    justifyContent:"space-evenly",
    marginTop:"4%",
    padding: "4%",

    alignContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5


  },

  iconBorder: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#FFFFFF"
  },

  folderLabel: {

    fontSize: 16,
    fontFamily: "Arial",
    color: "#FFFFFF",
    zIndex: 1
  },

  folderLabelBlack: {

    fontSize: 16,
    fontFamily: "Arial",
    color: "#000000",
    zIndex: 1
  },

  folderLabelHolder:{
    marginTop:"2%",
    padding:"1%",
    position: "absolute",
    top:0,
    left: 15,
    zIndex: 1
  },

  maxContainer:{
    height:"200%",
    width: "100%"
  }






})

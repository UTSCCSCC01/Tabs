import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SvgComponent from '../../../assets/images/Vector';
import { FloatingAction } from "react-native-floating-action";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import SVGImg from '../../../assets/images/Vector.svg'
import { ApolloClient, gql, InMemoryCache, useMutation } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { Circle } from 'react-native-svg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import inventoryController from '../controller/inventoryController';




//react wouldn't let me pass a string into a component without this
class TextOBJ{
  text: string;



  constructor(){
      this.text = "";

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
  constructor(text: string){
    this.text = text;
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



//initializing data to pass into this page's components

const dbd1 = new DescBoxData("food", "4", "Products");
const dbd2 = new DescBoxData("emoticon-sad-outline", "2", "Expired");
const data = [dbd1, dbd2];



const folderItem = new FolderItemData("Seven's favourite food");
const folderItemList = new FolderItemList([folderItem], "Categories");

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
  
  // const submitHandle = ()=>{
  //     signup({variables: {"email":String(input), "password":'password'}})
  //     console.log("created resuorce in db")
  // }

  END BLOCK OF OLD CODE */
return(

      //the background is a gradient so...
      <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
        <MyHeader text="Food Inventory"/>{// the title of the page plus the back button, could make this more modular but lazy
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
            <DoubleDescBox data={data}/>
            {//I rendered the folder u see across the ui by converting it to a vector image using the 
            //"REACT VECTOR IMAGE CONVERTER SITE: google it cuz i do not remember the link
            //I then rendered the title and list of folder items onto it
          }
            <FolderSvg list={folderItemList.list} title={folderItemList.title}/>
             {//Button in bottom right corner to add something
             }
            <FloatingActionButton/>

        </View>
      </LinearGradient>
      
 
)
}







const DescBox = (data:DescBoxData) =>{
  return (
        <View style={styles.rcorners1}>
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
        </View>
  );
}

//same as the above but different color, technically i could make the gradient style a 
//field but right now that is too much work
const DescBox2 = (data:DescBoxData) =>{
    return (
          <View style={styles.rcorners1}>
              <LinearGradient colors={['#34ACBC', '#9FD3DE']} style={styles.linearGradient1} start={[-0.04, 0]} end={[1.34, 1.34]}>
                  <MaterialCommunityIcons
                  size={24}
                  color={"#FFFFFF"}
                  //@ts-ignore
                  name={data.iconName} ></MaterialCommunityIcons>
                  <Text style={styles.whiteText2}>{data.text1}</Text>
                  <Text style={styles.whiteText1}>{data.text2}</Text>
              </LinearGradient>
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
const MyHeader = (text:TextOBJ) =>{
    return (
        <View style={styles.myHeader}>

          <View style={styles.rowFlex2}>
  
            <MaterialCommunityIcons name="arrow-left" size={24} style={styles.headerIcon}/>

            <Text style={styles.myHeaderText}>{text.text}</Text>

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
const FolderSvg = (folderItemList: FolderItemList) =>{
  return (
    <View>
      <SvgComponent zIndex={-1}/>
      <Text style={styles.folderLabel}>{folderItemList.title}</Text>
      <View style={styles.folderList}>
<TouchableOpacity>
<FolderListItem text={folderItemList.list[0].text}/>
</TouchableOpacity>
          
          
        </View>
    </View>
  )
}


//i explained this
const FloatingActionButton = () =>{
  return (
    <View style={styles.fab}>
      <TouchableOpacity onPress={ () => invCont.touch_item("name", "id")}>
      <FloatingAction color='#FFFFFFCC' floatingIcon={<MaterialCommunityIcons name="plus" size={24}/>}/>
      </TouchableOpacity>
    </View>
  )
}

//i explained this
const FolderListItem = (text:TextOBJ) =>{
  return (
    <View style={styles.folderListItem}>

      <View style={styles.iconBorder}>
        <View style={styles.center}>
          <MaterialCommunityIcons name="food-steak" size={24} style={styles.splitIcon}/>
        </View>
      </View>
      
  
      <Text style={styles.splitTextNormal} >{text.text}</Text>

    </View>
  )
}






//only export, could make this default but eh...
export {InvView}

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
    
    boxShadow: '4px 4px 3px rgba(0, 0, 0, 0.25)',
  },

  myHeader: {

    paddingHorizontal:"4%",
    marginTop:"14%",
    width:"100%",
    height: '4%',



  },

  myHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Arial",
    width: "66%",

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
    fontSize: 16,
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
  },

  flexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    color: "#FF0000",
    height: 0,
    margin: 0,
    borderWidth: 0,
    padding: 0,
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
   width: "33%",
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
    maxHeight: 100,
    width: "100%",
    backgroundColor: "#FFFFFFCC",
    borderRadius: 10,

    flex:1,
    flexDirection: "row",
    justifyContent:"space-evenly",
    margin:"4%",
    padding: "4%",

    alignContent: "center",
    alignItems: "center",


  },

  iconBorder: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#FFFFFF"
  },

  folderLabel: {
    marginTop:"7%",
    padding:"1%",
    position: "absolute",
    top:0,
    left: 15,
    fontSize: 16,
    fontFamily: "Arial",
    color: "#FFFFFF"
  }

  




})


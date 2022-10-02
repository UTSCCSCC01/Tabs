import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class test{
    name: string;



    constructor(){
        this.name = "";

    }
}

class TextOBJ{
    text: string;



    constructor(){
        this.text = "";

    }
}

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

class DescBoxList{
    data:DescBoxData[];

    constructor(dbl: DescBoxData[]){
        this.data = []
    }

}




const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  },
  rcorners1: {
    borderRadius: 10,
    width: "40%",
    height: "20%",
    boxShadow: '4px 4px 3px rgba(0, 0, 0, 0.25)',
  },

  myHeader: {

    padding: 20,
    height: "7%",
    alignItems:'center',

  },

  myHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Arial",
  },

  myNormalText: {
    fontWeight: "normal",
    fontSize: 14,
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
    justifyContent: "space-between",
    height:"100%",
    width:"100%",
  },

  bg1Page: {
    width: "100%",
    height: "100%",
    padding:20,
    paddingTop: 30,

    
  },




})

const DescBox = (data:DescBoxData) => {
  return (
        <View style={styles.rcorners1}>
            <LinearGradient colors={['#106A7C', '#3E436C']} style={styles.linearGradient1} start={[-0.04, 0]} end={[1.34, 1.34]}>
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

const DescBox2 = (data:DescBoxData) => {
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



const DoubleDescBox = (data:DescBoxList) => {
    return (
        <View style={styles.rowFlex1}>
            <DescBox iconName={data.data[0].iconName} text1={data.data[0].text1} text2={data.data[0].text2}/>
            <DescBox2 iconName={data.data[1].iconName} text1={data.data[1].text1} text2={data.data[1].text2}/>
        </View>
    )
}

const InventoryItem = () => {
    
}

const MyHeader = (text:TextOBJ) => {
    return (
        <View style={styles.myHeader}>
            <Text style={styles.myHeaderText}>{text.text}</Text>
        </View>
    )
}

const WhiteText1 = () => {
    return(
        <View>
            <Text style={styles.whiteText1}></Text>
        </View>
    )
}

const Bg1 = (props:any) =>{
    return(
        <View>
            <LinearGradient colors={["#127589", "#85C4CF", "#FFFFFF"]}>
            
            </LinearGradient>
        </View>

    )
}



export {DoubleDescBox, DescBox, MyHeader, DescBoxData, DescBoxList, Bg1}

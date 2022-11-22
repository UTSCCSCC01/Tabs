import React, { useState } from "react"
import { View, FlatList, Text } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import SvgComponent from "../../../../assets/images/Vector"
import ItemListComponent from "./itemList"
import { styles } from "../common/mainViewStyles"
import { FloatingActionButton } from "../common/FloatingActionButton"
import AddFoodItemView2 from "./AddFoodItemView2"



export const ItemListFolder = ({setItemId, userId, swipeFunction, itemListViewPortId, switchOuterViewPort, switchViewPort, categoryId, }: {setItemId:Function, userId:string, categoryId:string,swipeFunction: Function, switchViewPort:Function, itemListViewPortId: number, switchOuterViewPort: Function}) => {
    console.log("In item list folder. User ID is: " + userId);

    const [innerViewPortId, setInnerViewPortId] = useState(0);


  
    return(
    <View style={{width:"100%", height:"100%", flexGrow:1}}>
      <SvgComponent/>


       <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => swipeFunction(true)} onSwipeUp={() => swipeFunction(false)}>
        <View>
          <Text style={styles.folderLabel}>Categories</Text>
        </View>
      </GestureRecognizer>

      <View style={styles.folderList}>

        <ItemListComponent setItemId={setItemId} userId={userId} categoryId={categoryId} switchViewPort={switchViewPort} itemListViewPortId={itemListViewPortId} />
       
        <FloatingActionButton 
            name="add item" 
            argument={null} 
            myFunction={()=>{console.log("I AM CONFUSION");console.log("I SEE THE FUNNY"); switchOuterViewPort(1);console.log("SHHHHHUT UP")}}/>

        
      </View>

 

    </View>
    )
    

    
}
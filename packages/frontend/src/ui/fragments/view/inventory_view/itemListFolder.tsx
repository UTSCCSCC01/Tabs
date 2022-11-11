import React from "react"
import { View, FlatList, Text } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import SvgComponent from "../../../../assets/images/Vector"
import ItemListComponent from "./itemList"
import { styles } from "../mainViewStyles"



export const ItemListFolder = ({setItemId, userId, swipeFunction, itemListViewPortId, switchViewPort, categoryId}: {setItemId:Function, userId:string, categoryId:string,swipeFunction: Function, switchViewPort:Function, itemListViewPortId: number}) => {
    console.log("In item list folder. User ID is: " + userId);
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
       

      </View>

    </View>
    )
}
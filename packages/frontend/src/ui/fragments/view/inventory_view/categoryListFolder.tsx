import React from "react"
import { View, FlatList, Text } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import SvgComponent from "../../../../assets/images/Vector"
import CategoryListComponent from "./categoryList"
import { styles } from "../mainViewStyles"



export const CategoryListFolder = ({userId, swipeFunction, inventoryId, itemListViewPortId, switchViewPort, setCategoryId}: {userId:string, inventoryId:string,swipeFunction: Function, switchViewPort:Function, itemListViewPortId: number, setCategoryId:Function}) => {
    console.log("In category list folder. User ID is: " + userId);
    return(
    <View style={{width:"100%", height:"100%", flexGrow:1}}>
      <SvgComponent/>


       <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => swipeFunction(true)} onSwipeUp={() => swipeFunction(false)}>
        <View>
          <Text style={styles.folderLabel}>Categories</Text>
        </View>
      </GestureRecognizer>

      <View style={styles.folderList}>

        <CategoryListComponent setCategoryId={setCategoryId} userId={userId} inventoryId={inventoryId} switchViewPort={switchViewPort} itemListViewPortId={itemListViewPortId} />
       

      </View>

    </View>
    )
}
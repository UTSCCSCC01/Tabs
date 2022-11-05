import React from "react"
import { View, FlatList, Text } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import SvgComponent from "../../../assets/images/taskListFolderBg"
import { FolderListItem } from "./FolderListItem"
import { styles } from "./mainViewStyles"
import TaskListComponent from "./TaskListComponent"


export const TaskListFolder = ({userId, houseId, swipeFunction}: {userId:string, houseId: string, swipeFunction: Function}) => {
    console.log("In task list folder. User ID is: " + userId);
    return(
    <View style={{width:"100%", height:"100%", flexGrow:1}}>
      <SvgComponent style={{zIndex:-1}} />


       <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => swipeFunction(true)} onSwipeUp={() => swipeFunction(false)}>
        <View>
          <Text style={styles.folderLabel}>Tasks</Text>
        </View>
      </GestureRecognizer>

      <View style={styles.folderList}>

        <TaskListComponent userId={userId} houseId={houseId}/>
       

      </View>

    </View>
    )
}
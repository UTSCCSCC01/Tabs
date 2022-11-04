import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FolderItemData } from './FolderItemData';
import { styles } from './mainViewStyles';
import { BorderIcon } from './BorderIcon';
import { InventoryItem } from './InventoryItem';
import { InventoryCategory } from './InventoryCategory';
import Checkbox from 'expo-checkbox';
import { gql, useMutation } from '@apollo/client';


export const TOGGLE_COMPLETION =gql`
mutation DoneTask($taskId: String) {
  doneTask(taskId: $taskId)
}`

export const TaskListItem = ({taskDone, taskName, dueDate, author, subtasks, taskId}:{taskDone: boolean, 
    taskName: string, dueDate:string, author:string, taskId: string, 
    subtasks:{taskDone:boolean, taskName:string, dueDate:string, author: string}[]}) => {
  
  console.log("LOADING TASK LIST ITEM");

  const [toggleCompletionMutationFunction, toggleCompletionMutationData] = useMutation(TOGGLE_COMPLETION,
    {
      refetchQueries: [],
      awaitRefetchQueries: true
      
    });

    React.useEffect(()=>{taskDone = !taskDone;}, [toggleCompletionMutationData.called])


    
   const toggleCompletionHandler = (value:boolean) => {

    toggleCompletionMutationFunction({variables: {taskId: taskId}})
    

   }

   if (toggleCompletionMutationData.loading) return <Text>Loading...</Text>
  

  
    return (

  
       
        <View style={styles.taskListItem}>
          <Checkbox onValueChange={toggleCompletionHandler}/>
  
  
  
          <Text style={styles.myNormalText}>{taskName}</Text>
          {subtasks!= null && subtasks.length > 0 && 
          <Text style={styles.smallBlueText}>Swipe to View List</Text>
          }
          
  
  
        </View>

  
    );

}
  


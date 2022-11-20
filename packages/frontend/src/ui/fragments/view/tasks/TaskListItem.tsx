import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../common/mainViewStyles';
import Checkbox from 'expo-checkbox';
import { gql, useMutation } from '@apollo/client';
import { GET_ALL_TASKS } from './TaskListComponent';

export const TOGGLE_COMPLETION =gql`
mutation ToggleDoneTask($taskId: String, $doneStatus: Boolean) {
    toggleDoneTask(taskId: $taskId, doneStatus: $doneStatus)
}`

export const TaskListItem = ({taskDone, taskName, dueDate, author, subtasks, taskId, userId}:{taskDone: boolean, 
  taskName: string, dueDate:string, author:string, taskId: string, userId:string,
  subtasks:{taskDone:boolean, taskName:string, dueDate:string, author: string}[]}) => {
  
  console.log("LOADING TASK LIST ITE WITH NAME:" + taskName + "\nWITH ID: " + taskId);

  const [doneTask, toggleDoneTask] = useState(taskDone);

  const [toggleCompletionMutationFunction, toggleCompletionMutationData] = useMutation(
    TOGGLE_COMPLETION,
    {
      refetchQueries: [{query: GET_ALL_TASKS, variables:{userId: userId}}],
      awaitRefetchQueries: true
      
    }
  );

  //React.useEffect(()=>{toggleDoneTask(!doneTask)}, [toggleCompletionMutationData.called])
  const toggleCompletionHandler = (value:boolean) => {
    console.log("Toggling completion with value: " + value)
    toggleCompletionMutationFunction({variables: {taskId: taskId, doneStatus: !value}});
    toggleDoneTask(value);
   }

   if (toggleCompletionMutationData.loading)
    return <Text>Loading...</Text>
  
   console.log("\n\nShould render task list item now with name: ", taskName + "\n\n\n")

  return (
    <View>
      <View style={styles.taskListItem}>

        <Checkbox style = {{marginRight: 15, borderRadius: 5 , height:"70%", width:"15%" , backgroundColor: "white"}} value={doneTask} onValueChange={toggleCompletionHandler}/>

        <Text style={styles.whiteText1}>{taskName}</Text>
        {subtasks!= null && subtasks.length > 0 && 
        <Text style={styles.smallBlueText}>Swipe to View List</Text>
        }
      </View>
    </View>
  );
}
  


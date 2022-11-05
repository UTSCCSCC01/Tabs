import { gql, useMutation, useQuery } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl, ScrollView } from 'react-native';
import { DoubleDescBox } from './DoubleDescBox';
import { FloatingActionButton } from './FloatingActionButton';
import { FolderBackdropActionButton } from './FolderBackdropActionButton';
import { FolderBackdropTextInputField } from './FolderBackdropTextInputField';
import { styles } from './mainViewStyles';
import { MyHeader } from './MyHeader';
import RentContainerComponent from './RentContainerComponent';
import { TaskListFolder } from './TaskListFolder';
import { TaskListItem } from './TaskListItem';

// export type Props = {
//     houseId: string;
//     isUpdatingRent: boolean,
//     setIsUpdatingRent: any,
// };

// const wait = (timeout: number | undefined) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
// }



const CREATE_TASK=gql`
mutation CreateTask($taskListId: String, $ownerId: String, $taskName: String, $dateDue: String, $houseId: String) {
    createTask(taskListId: $taskListId, owner: $ownerId, task: $taskName, dateDue: $dateDue, houseId: $houseId) {
      id
    }
  }
`

const CREATE_SUB_TASK=gql`
mutation CreateSubtask($parentId: String!, $ownerId: String, $taskName: String, $houseId: String, $dateDue: String) {
    createSubtask(parentId: $parentId, owner: $ownerId, task: $taskName, houseId: $houseId, dateDue: $dateDue) {
      id
      houseId
      parentId
      taskListId
      owner
      task
      dateDue
      doneStatus
    }
  }
`

/**
* @name AddTaskComponent
* @param userId id of current user
* @param houseId id of user's house
* @param setViewPortId function to swap which view parent renders
* @returns React component with a form for adding a task for current user
* @see ViewTasksAdminPage where RentListComponent is used
*/
const AddTaskComponent = ({userId, houseId, setViewPortId}: {userId: string, houseId: string, setViewPortId: Function}) => {



    const [taskName, setTaskName] = useState("none");

    const [storedTaskName, setStoredTaskName] = useState("none")


    
    const [subTaskList, setSubTaskList] = useState([] as String[]);
    const [subTaskName, setSubTaskName] = useState("none");
    const [viewType, setViewType] = useState(0);
    //const [taskId, setTaskId] =
    

    const [createTaskMutation, createTaskMutationData] = useMutation(CREATE_TASK, {refetchQueries: [], awaitRefetchQueries: true})
    const [creatSubTaskMutation, createSubTaskMutationData] = useMutation(CREATE_SUB_TASK, {refetchQueries: [], awaitRefetchQueries: true})

    const addTaskHandler = () =>{
        
        createTaskMutation({variables:{taskListId: "none", ownerId: userId, taskName: taskName, dateDue: "ASAP", houseId: houseId}}).then(()=>{
            console.log("MUTATION DATA IS: " +JSON.stringify(createSubTaskMutationData.data));
        for (var i in subTaskList){
            creatSubTaskMutation({variables:{parentId: createTaskMutationData.data.createTask.id, ownderId: userId, taskName: i, dateDue: "ASAP", houseId: houseId}})

        }
        })
            
        

        

        setViewPortId(0);
    }
    const addTaskSublistHandler = (subTaskName: string) =>{
        setSubTaskList(subTaskList => [...subTaskList, subTaskName]);
        //setSubTaskName("");
    }

    const switchViewHandler = (type: number) => {
        setViewType(type);
        // setStoredTaskName(storedTaskName)
        // setTaskName("");
    }

    console.log("\n\nSubtask list is: " + JSON.stringify(subTaskList) + "\n\n");

    
    const queries =  [] as any
    const mutations = [createTaskMutationData, createSubTaskMutationData]

    for (var i of queries){
        if (i.loading || i.loading) return <Text>Loading ...</Text>;
        if (i.error) return <Text style={{fontSize: 8}}>{i.error.message}:{"\n" + JSON.stringify(i.error)}</Text>;
        console.log(JSON.stringify(i.data) + "\nThis is data... hoping it is not null");
    }
    for (var j of mutations){
        if (j.loading || j.loading) return <Text>Loading ...</Text>;
        if (j.error) return <Text style={{fontSize: 8}}>{j.error.message}:{"\n" + JSON.stringify(j.error)}</Text>;
        console.log(JSON.stringify(j.data) + "\nThis is data... hoping it is not null");
    }
     

    const dummyTask = {taskDone: false, taskName: "Make a task!", subtasks: [], author: "testUser", dueDate: "ASAP", taskId: "dummyTaskId"}
    
    //const allTasks = getAllTasksQuery.data.getAllOwnerTasks

    if (viewType == 0){
        return (

            <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
            <MyHeader title={"Add Task"} backFunction={{myFunction: setViewPortId, argument: 0, name:"Go back to view tasks page"}}></MyHeader>
                
        <View style={[styles.flexPage, {justifyContent:'flex-end'}]}>

            

            
            <View style={styles.thumbFormLightBlue}>
                <FolderBackdropTextInputField info={{title: "Task Name", hint:"Enter task..."}} backRefFunction={setTaskName}/>
                <FolderBackdropActionButton info={{title: "Add Sublist"}} buttonFunction={switchViewHandler} argument={1}/>      
                <FolderBackdropActionButton info={{title: "Add"}} buttonFunction={addTaskHandler} argument={null}/>           
            </View>

 
           
           
          
          

        </View>
      </LinearGradient>
        );
    }else{

        return (

            <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
            <MyHeader title={"Add Task"} backFunction={{myFunction: setViewType, argument: 0, name:"Go back to add tasks page"}}></MyHeader>
                
        <View style={[styles.flexPage, {justifyContent:'flex-end'}]}>

            

            
            <View style={styles.thumbFormLightBlue}>
                <FolderBackdropTextInputField info={{title: "Subtask Name", hint:"Enter subtask..."}} backRefFunction={setSubTaskName}/>
                <FolderBackdropActionButton info={{title: "Add Item"}} buttonFunction={addTaskSublistHandler} argument={subTaskName}/>      
                <FolderBackdropActionButton info={{title: "Add"}} buttonFunction={addTaskHandler} argument={null}/>           
            </View>

 
           
           
          
          

        </View>
      </LinearGradient>
        );

    }
    

}
    

// const styles2 = StyleSheet.create({
//     listContainer: {
//         marginTop: '10%',
//         height: '165%',
//         width: '100%',
//       },
// });

export default AddTaskComponent;
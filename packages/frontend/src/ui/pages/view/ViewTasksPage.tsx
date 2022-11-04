import React, { useState } from 'react';
import {  View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';




import {MyHeader, DescBoxData, styles, DoubleDescBox, FloatingActionButton} from '../../fragments/view'
import TaskListComponent from '../../fragments/view/TaskListComponent';


















//initializing data to pass into this page's components

const dbd1 = new DescBoxData("none", "7", "Assigned");
const dbd2 = new DescBoxData("none", "1", "Completed");
const data2 = [dbd1, dbd2];




/*OLD CODE THAT I DO NOT WANT TO DELETE SO THAT I CAN COPY IT LATER

// const SIGN_UP = gql`
// mutation signUp($email: String!, $password: String!) {
//   signUp(email: $email, password: $password){
//     email
//   }
// }
// `



END BLOCK OF OLD CODE */


/**
* @name FullViewTaskaPage
* @returns Component holding the entire view tasks page. Swaps between different sections depending on actions taken.
*/
const FullViewTaskaPage = () => {
 
  const [viewPortId, setViewPortId] = useState(0)
  return(
    <View>

    {viewPortId == 0 && <ViewTasksPage inventoryId='testId' userId='testUser' setViewportId={setViewPortId}></ViewTasksPage>}
    </View>
  )

}


/**
* @name ViewTasksPage
* @returns Component to display every roommate's current taks, both completed and in progress.
*/
const ViewTasksPage = ({inventoryId, userId, setViewportId} : {inventoryId:string, userId:string, setViewportId: Function})=>{


    console.log("Inventory ID is:" + inventoryId);
    const ADD_TASK_VIEWPORT_ID = 1;

  //HOOKS
  const [showDoubleDescBox, toggleDoubleDescBox] = useState(true);



  




  
 

 
  



  console.log("all hooks passed in code");

    //END HOOKS

  //query handlers


  

  
  //end query handlers
  console.log("all handlers passed in code");




 

 
  console.log("the above should never be null");

  // console.log("LOOK AT QUERY CAT LIST")
  // console.log(JSON.stringify(queryCatList));
 

 


    

    
 

    //console.log(":C:C");




  const backButton = () => {

  }



  




  console.log("what even")
  
  


  









return(
      //the background is a gradient so...
      <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
        <MyHeader backFunction={{myFunction:()=>{}, name:"unset", argument:null}} title={"Tasks"}/>{// the title of the page plus the back button, could make this more modular but lazy
        }
        <View style={styles.flexPage}>{// container for rest of page...
        }


            {//Boxes of information with own gradient bg, made it a duple cuz i saw on a couple pages there were 2 shown in
            //the same row at once
          }


            {showDoubleDescBox && <DoubleDescBox data={data2}/>}
            {//I rendered the folder u see across the ui by converting it to a vector image using the
            //"REACT VECTOR IMAGE CONVERTER SITE: google it cuz i do not remember the link
            //I then rendered the title and list of folder items onto it 
            }

            <TaskListComponent userId={userId} inventoryId={inventoryId}/>

            <FloatingActionButton myFunction= {setViewportId} argument= {ADD_TASK_VIEWPORT_ID} name="Add Task"/>
 
           
           
          
          

        </View>
      </LinearGradient>
      
 
)
}








//only export, could make this default but eh...
export default FullViewTaskaPage



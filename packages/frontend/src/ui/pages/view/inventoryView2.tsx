import { LinearGradient } from "expo-linear-gradient"
import React, { useState } from "react"
import { View } from "react-native"
import { DescBoxData, DoubleDescBox, MyHeader, styles } from "../../fragments/view"
import { InventoryWrapper } from "../../fragments/view/inventory_view/inventoryWrapper";



const dbd1 = new DescBoxData("food", "4", "Products");
const dbd2 = new DescBoxData("emoticon-sad-outline", "2", "Expired");
const data2 = [dbd1, dbd2];


const FullInvView2 = () => {
    const [showDoubleDescBox, toggleDoubleDescBox] = useState(true);
    const inventoryId = "testInv"
    const userId="testUser"



    return(
    //the background is a gradient so...
    <LinearGradient colors={["#FFFFFF", "#85C4CF", "#127589" ]} style={styles.page} start={[0, 0]} end={[1, 1]} locations={[0.05, 0.1, 1]}>
      <MyHeader backFunction={{myFunction:()=>{}, name: "none", argument:null}} title={"Inventory"}/>{// the title of the page plus the back button, could make this more modular but lazy
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


        <InventoryWrapper inventoryId={inventoryId} userId={userId} swipeFunction={toggleDoubleDescBox}/>

         
          

      </View>
    </LinearGradient>
    

)
}








//only export, could make this default but eh...
export default FullInvView2



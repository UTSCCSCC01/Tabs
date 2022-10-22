import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FolderItemData } from './FolderItemData';
import { styles } from './mainViewStyles';
import { BorderIcon } from './BorderIcon';
import { InventoryItem } from './InventoryItem';
import { InventoryCategory } from './InventoryCategory';

//i explained this
export const FolderListItem = ({item}:{item:FolderItemData}) => {
  
  console.log("LOADING FOLDER LIST ITEM")

  if (item instanceof InventoryItem){
    console.log("Will soon say hey listen!");
    console.log(item.name);
    
    return (
      <TouchableOpacity style={{flex:1}} onPress={() => item.touchFunction.myFunction({item})}>
        <View style={styles.flexPage}>

      
        <View style={styles.folderListItem}>
          {item.iconName != "none" && <BorderIcon text={item.iconName}></BorderIcon>}



          {item.capacity == -1 && <Text style={styles.splitTextNormal}>{item.name}</Text>}
          {item.capacity != -1 && <Text style={styles.splitTextNormal}>{item.name}: {item.capacity}</Text>}

        </View>
        <View style={styles.rowFlex2}>
        <Text style={styles.splitTextNormal}>{item.getTags()}</Text>
        <Text style={styles.splitTextNormal}>Expires: {item.expirationDate}</Text>
        </View>
        
        </View>
      </TouchableOpacity>

    );

  }

  else if (item instanceof InventoryCategory){
    console.log("not gonna say hey listen ever");
    console.log(item.name)
    console.log(item.touchFunction.argument)
    return (
      <TouchableOpacity style={{flex:1, flexGrow:1}} onPress={() => {item.touchFunction.myFunction(item.id)}}>
  
  
       
        <View style={styles.folderListItem}>
          {item.iconName != "none" && <BorderIcon text={item.iconName}></BorderIcon>}
  
  
  
          <Text style={styles.splitTextNormal}>{item.name}</Text>
          
  
  
        </View>
      </TouchableOpacity>
  
    );
  }
  else{
    
    return (
      <TouchableOpacity style={{flex:1}} onPress={() => {item.touchFunction.myFunction(item.touchFunction.argument)}}>
  
  
       
        <View style={styles.folderListItem}>
          {item.iconName != "none" && <BorderIcon text={item.iconName}></BorderIcon>}
  
  
  
          <Text style={styles.splitTextNormal}>{item.name}</Text>
          
  
  
        </View>
      </TouchableOpacity>
  
    );

  }
  
};

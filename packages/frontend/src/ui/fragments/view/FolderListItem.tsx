import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FolderItemData } from './FolderItemData';
import { styles } from './mainViewStyles';
import { BorderIcon } from './BorderIcon';
import { InventoryItem } from './InventoryItem';

//i explained this
export const FolderListItem = ({item}:{item:FolderItemData}) => {
  


  if (item instanceof InventoryItem){
    console.log("Will soon say hey listen!");
    console.log(item.text);
    
    return (
      <TouchableOpacity onPress={() => item.touchFunction.myFunction({item})}>
        <View style={styles.flexPage}>

      
        <View style={styles.folderListItem}>
          {item.iconName != "none" && <BorderIcon text={item.iconName}></BorderIcon>}



          {item.capacity == -1 && <Text style={styles.splitTextNormal}>{item.text}</Text>}
          {item.capacity != -1 && <Text style={styles.splitTextNormal}>{item.text}: {item.capacity}</Text>}

        </View>
        <Text style={styles.splitTextNormal}>{item.getTags()}</Text>
        </View>
      </TouchableOpacity>

    );

  }

  else 
  return (
    <TouchableOpacity onPress={() => item.touchFunction.myFunction(item.touchFunction.argument)}>


     
      <View style={styles.folderListItem}>
        {item.iconName != "none" && <BorderIcon text={item.iconName}></BorderIcon>}



        <Text style={styles.splitTextNormal}>{item.text}</Text>
        


      </View>
    </TouchableOpacity>

  );
};

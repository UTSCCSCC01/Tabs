import React from 'react';
import { SafeAreaView, FlatList, Text, View } from 'react-native';
import SvgComponent from '../../../assets/images/Vector';
import GestureRecognizer from 'react-native-swipe-gestures';
import { FunctionObject } from './FunctionObject';
import { FolderSvgClass } from './FolderSvgClass';
import { styles } from './mainViewStyles';
import { FolderListItem } from './FolderListItem';
import { FolderItemList } from './FolderItemList';
import { FolderItemData } from './FolderItemData';
import { InventoryItem } from './InventoryItem';
import { InventoryCategory } from './InventoryCategory';

//explained this already... only thing of note is that i didnt make the list view yet so i only show 1 item at a time
// z-index of vector is set to -1 so that other stuff is guaranteed to render on top of it
export const FolderSvg = (data: FolderSvgClass) => {

  console.log(data.swipeFunction.name);
  
  if (data.folder.list[0] instanceof InventoryItem){
    for (var i = 0; i < data.folder.list.length; i++){
      data.folder.list[i].touchFunction = data.itemFunction;
    }
    return (
      <View style={styles.maxContainer}>
        <SvgComponent zIndex={-1} />


        <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => data.swipeFunction.myFunction(true)} onSwipeUp={() => data.swipeFunction.myFunction(false)}>
          <View>
            <Text style={styles.folderLabel}>{data.folder.title}</Text>
          </View>
        </GestureRecognizer>

        <View style={styles.folderList}>


          <SafeAreaView style={styles.container}>
            <FlatList style={styles.container}
              data={data.folder.list}
              renderItem={({ item }) => (<FolderListItem item={item}/>)}
              keyExtractor={item => item.id}>
            </FlatList>
          </SafeAreaView>

        </View>

      </View>
    );
  }
  else return (
    <View style={styles.maxContainer}>
      <SvgComponent zIndex={-1} />


      <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => data.swipeFunction.myFunction(true)} onSwipeUp={() => data.swipeFunction.myFunction(false)}>
        <View>
          <Text style={styles.folderLabel}>{data.folder.title}</Text>
        </View>
      </GestureRecognizer>

      <View style={styles.folderList}>


        <SafeAreaView style={styles.container}>
          <FlatList style={styles.container}
            data={data.folder.list}
            renderItem={({ item }) => (<FolderListItem item={item}/>)}
            keyExtractor={item => item.id}>
          </FlatList>
        </SafeAreaView>

      </View>

    </View>
  );
};

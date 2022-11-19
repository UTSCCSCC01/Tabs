import React from 'react';
import { SafeAreaView, FlatList, Text, View } from 'react-native';
import SvgComponentLightBlue from '../../../../assets/images/LightBlueVector';
import GestureRecognizer from 'react-native-swipe-gestures';
import { FolderSvgForm } from './FolderSvgForm';
import { styles } from './mainViewStyles';
import { FolderFormListItem } from "./FolderFormListItem";

export const FolderFormSvg = (data: FolderSvgForm) => {

  console.log(data.folder.title);
  console.log("\n\nLoading a folder form svg\n\n")

  return (
    <View style={styles.maxContainer}>
      <SvgComponentLightBlue />


      <GestureRecognizer style={styles.folderLabelHolder} onSwipeDown={() => data.swipeFunction.myFunction(true)} onSwipeUp={() => data.swipeFunction.myFunction(false)}>
        <View>
          <Text style={styles.folderLabelBlack}>{data.folder.title}</Text>
        </View>
      </GestureRecognizer>

      <View style={[styles.folderList, {minHeight: "100%"}]}>


        <SafeAreaView>
          <FlatList
            data={data.folder.list}
            renderItem={({ item }) => (<FolderFormListItem title={item.title} component={item.component} id={item.id} />)}
            keyExtractor={item => item.id}>
          </FlatList>
        </SafeAreaView>

      </View>

    </View>
  );
};

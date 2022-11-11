import React from 'react';
import { View } from 'react-native';
import { FormItem } from './FormItem';







export const FolderFormListItem = (item: FormItem) => {
  const component = item.component;
  console.log("Rendering folder form list item with name: "+ item.title)
  return (
    <View>
      {component}
    </View>

  );
};

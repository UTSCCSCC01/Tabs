import React from 'react';
import { View } from 'react-native';
import { FormItem } from './FormItem';

export const FolderFormListItem = (item: FormItem) => {
  const component = item.component;
  return (
    <View>
      {component}
    </View>

  );
};

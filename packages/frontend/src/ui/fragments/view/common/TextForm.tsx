import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { styles } from './mainViewStyles';

export const TextForm = ({ input, title, hintText, setText }: { input: string; title: string; hintText: string; setText: Function; }) => {
  // const [input] = useState()
  // const [addCategory, {loading, error}] = useMutation(ADD_CATEGORY);
  // const addItemHandler=(item: InventoryCategory) => {
  //   console.log("Adding item " + item.text + " to the database");
  //   addCategory({variables: {"categoryName":item.text, "inventoryKey":item.inventoryKey}});
  // }
  return (

    <View style={styles.pleaseStaySmall}>
      <Text>{title}</Text>
      <View style={styles.inputBox}>

        <TextInput
          style={styles.input}
          
          value={input}
          onChangeText={(inputText) => { setText(inputText); }}
          textAlign="center"
          placeholder={hintText}
          onSubmitEditing={() => { }} />

      </View>


    </View>
  );
};

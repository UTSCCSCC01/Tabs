import {  SafeAreaView,  FlatList,  StatusBar, Text, View, StyleSheet, Button, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ReactString } from '../../String';
import { folderCommonStyles } from './FolderCommonStyles';

/**
 * @name FolderBackdropTextInputFieldArgument
 * @field title Title of the text field
 * @field hint Hint for the text field
 */
export interface FolderBackdropTextInputFieldArgument {
    title: string
    hint: string
}

interface FolderBackdropTextInputFieldArgumentFields {
    info: FolderBackdropTextInputFieldArgument
}

/**
 * Text field styled for a folder backdrop.
 * 
 * @name FolderBackdropTextInputField
 * @param info Hint and title of the text field
 * @param backRefFunction Callback function when textfield is edited
 * @returns Text field React element
 */
export const FolderBackdropTextInputField = ({info, backRefFunction}: {info: FolderBackdropTextInputFieldArgument, backRefFunction: Function}) => {
    return (
        <View style = {[folderCommonStyles.row, {
                justifyContent: "center",
                alignContent: "center",
                paddingTop: 20
            }]}>
            <View style = {[folderCommonStyles.column, {
                // width: "fit-content"
                alignSelf: "stretch",
                width: "70%"
            }]}>
                <Text style = {{
                    fontSize: 15,
                    paddingBottom: 5
                }}>
                    {info.title}
                </Text>    
                <TextInput
                    style = {[folderBackdropTextInputFieldStyles.text]}
                    placeholder = {info.hint}
                    onChange = {(input) => backRefFunction(input)}
                />
            </View>
        </View>
    )
}

const folderBackdropTextInputFieldStyles = StyleSheet.create({
    text: {
        padding: 15,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 15,
        backgroundColor: "white",
        borderRadius: 15
    }
})
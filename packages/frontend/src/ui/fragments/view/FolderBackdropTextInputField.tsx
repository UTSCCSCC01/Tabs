import {  SafeAreaView,  FlatList,  StatusBar, Text, View, StyleSheet, Button, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ReactString } from '../../String';
import { folderCommonStyles } from './FolderCommonStyles';

export interface FolderBackdropTextInputFieldArgument {
    title: string
    hint: string
}

interface FolderBackdropTextInputFieldArgumentFields {
    info: FolderBackdropTextInputFieldArgument
}

export const FolderBackdropTextInputField = ({info}: FolderBackdropTextInputFieldArgumentFields) => {
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
import { Button, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { folderCommonStyles } from "./FolderCommonStyles"

export interface FolderBackdropActionButtonArgument {
    title: string
}

interface FolderBackdropActionButtonArgumentFields {
    info: FolderBackdropActionButtonArgument
}

export const FolderBackdropActionButton = ({info}: FolderBackdropActionButtonArgumentFields) => {
    return (
        <View style = {[folderCommonStyles.row, {
            justifyContent: "center",
            width: "100%",
            marginTop: 40
        }]}>
           <TouchableOpacity style = {{
                padding: 10,
                backgroundColor: "#127589",
                borderRadius: 30,
                paddingRight: 70,
                paddingLeft: 70,
                width: "100%"
           }}>
                <Text style = {{
                    color: "white",
                    fontSize: 35
                }}>
                    {info.title}
                </Text>
           </TouchableOpacity>
        </View>
    )
}
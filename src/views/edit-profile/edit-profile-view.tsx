import { EditProfileComp } from "@/src/components/edit-profile/edit-profile-comp";
import { View } from "react-native";
import styles from "./styles";

export function EditProfileView () {
    return(
        <View style={styles.container}>
            <EditProfileComp/>
        </View>
    );
}
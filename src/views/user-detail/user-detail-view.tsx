import { UserDetailComp } from "@/src/components/user-detail/user-detail-comp";
import { View } from "react-native";
import styles from "./styles";

export function UserDetailView () {
    return(
        <View style={styles.container}>
            <UserDetailComp/>
        </View>
    );
}
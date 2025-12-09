import { cinemas } from "@/assets/images/dummydata";
import { CinemaSectionComp } from "@/src/components/cinema-section/cinema-section";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";


export function HomeScreenView() {
    return( 
        <SafeAreaView style={styles.container}> <FlatList data={cinemas}
        renderItem={({item}) => <CinemaSectionComp cinema={item} />}
        keyExtractor={(item) => item.id.toString()}/>        
        </SafeAreaView>
    );
}
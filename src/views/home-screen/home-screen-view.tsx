import { cinemas } from "@/assets/images/dummydata";
import { CinemaSectionComp } from "@/src/components/cinema-section/cinema-section";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export function HomeScreenView() {
    return( 
        <SafeAreaView> <FlatList data={cinemas}
        renderItem={({item}) => <CinemaSectionComp cinema={item} />}
        keyExtractor={(item) => item.id.toString()}/>        
        </SafeAreaView>
    );
}
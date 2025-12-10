import MovieDetailsComp from "@/src/components/movie-screen/movie-details";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";


export function MovieScreenView() {
  return (
    <ScrollView style={styles.container}>
        <MovieDetailsComp/>
    </ScrollView>
  );
}
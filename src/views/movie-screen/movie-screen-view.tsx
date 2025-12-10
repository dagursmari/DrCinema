import { useAppSelector } from "@/src/redux/hooks";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export function MovieScreenView() {
  const {id} = useLocalSearchParams()

  const movie = useAppSelector((state) => 
    state.movies.movies.find(m => m.id === Number(id))
  );

  if (!movie) {
  return <Text>Movie not found</Text>;
  }
  return (
    <View>
      <Text>Movie Screen Page</Text>
      <Text>Movie ID:{movie.id}</Text>
      <Text>Movie title:{movie.title}</Text>

    </View>
  );
}
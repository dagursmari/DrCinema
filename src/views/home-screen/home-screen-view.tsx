import { cinemas } from "@/assets/images/dummydata";
import { CinemaSectionComp } from "@/src/components/cinema-section/cinema-section";
import SearchBarComp from "@/src/components/searchbar/searchbar";
import React, { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";


export function HomeScreenView() {

    const [filteredCinemas, setFilteredCinemas] = useState(cinemas);

    const handleSearch = (text: string) => {

    if (text.trim() === "") {
      setFilteredCinemas(cinemas); // reset
      return;
    }

    const lower = text.toLowerCase();

    // Filter inside each cinema
    const filtered = cinemas
      .map((cinema) => ({
        ...cinema,
        movies: cinema.movies.filter((movie) =>
          movie.title.toLowerCase().includes(lower)
        ),
      }))
      // Remove cinemas with NO matching movies
      .filter((cinema) => cinema.movies.length > 0);

    setFilteredCinemas(filtered);
  };
    return( 
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View>
        <SearchBarComp onSearch={handleSearch} />
      </View>

      <FlatList
        data={filteredCinemas}
        renderItem={({ item }) => <CinemaSectionComp cinema={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={{ paddingTop: 0 }}
      />
    </SafeAreaView>
    );
}
import { CinemaSectionComp } from "@/src/components/cinema-section/cinema-section";
import SearchBarComp from "@/src/components/searchbar/searchbar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";


export function HomeScreenView({ movies }) {

    const [filteredCinemas, setFilteredCinemas] = useState([]);
    const [cinemas, setCinemas] = useState([]);

    useEffect(() => {
    if (!movies?.length) return;

    const cinemasMap = {};
    movies.forEach((movie) => {
      movie.showtimes?.forEach((showtime) => {
        const cinemaId = showtime.cinema.id;
        if (!cinemasMap[cinemaId]) {
          cinemasMap[cinemaId] = {
            id: cinemaId,
            name: showtime.cinema.name,
            movies: [],
          };
        }
        cinemasMap[cinemaId].movies.push(movie);
      });
    });


    const cinemasArray = Object.values(cinemasMap);
        setCinemas(cinemasArray);
        setFilteredCinemas(cinemasArray);
    }, [movies]);

    const handleSearch = (text: string) => {

    if (text.trim() === "") {
      setShowtimes(movie.showtimes); // reset
      return;
    }

    const lower = text.toLowerCase();

    const filtered = cinemas
      .map((cinema) => ({
        ...cinema,
        movies: cinema.movies.filter((movie) =>
          movie.title.toLowerCase().includes(lower)
        ),
      }))
      .filter((cinema) => cinema.movies.length > 0);
  };    
    
    type CinemaWithMovies = {
        cinema: { id: number; name: string };
        movies: { movie: any; showtime: any }[];
    };


    return( 
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View>
        <SearchBarComp onSearch={handleSearch} />
      </View>

      <FlatList<CinemaWithMovies>
        data={filteredCinemas}
        renderItem={({ item }) => <CinemaSectionComp cinema={item}/>}
        keyExtractor={(item) => item.cinema.id.toString()}
        style={styles.list}
        contentContainerStyle={{ paddingTop: 0 }}
      />
    </SafeAreaView>
    );
}
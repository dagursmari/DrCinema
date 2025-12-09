import { Text, View } from "react-native";
import { FlatList } from "react-native";
import MovieCard from "../movie-card/movie-card";
import styles from "./styles";
import React from "react";

export function CinemaSectionComp({ cinema }) {
    return (
        <View>
            <Text style={styles.cinemaName}>{cinema.name}</Text>
            <FlatList 
            horizontal 
            data={cinema.movies}
            renderItem={({item}) => <MovieCard movie={item} />} keyExtractor={(item) => item.id.toString()} showsHorizontalScrollIndicator={false}/>
            
        </View>
    );
}
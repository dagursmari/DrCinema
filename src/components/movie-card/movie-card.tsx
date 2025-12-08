import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import styles from "./styles";

export default function MovieCard({movie}) {
    return (
        <TouchableOpacity style={styles.card}>
            <Card>
                <Card.Image
                source={{uri:movie.poster}}
                style={styles.poster}
                resizeMode="cover"
                />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
            <View style={styles.badge}>
            <Text style={styles.badgeText}>{movie.genres}</Text>
            </View>
            </Card>
        </TouchableOpacity>
    )
}
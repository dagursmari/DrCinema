import React, { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useAppSelector } from "@/src/redux/hooks";
import { RatingsSection } from "../ratings/rating-section";
import { ShowtimesSection } from "../showtimes/showtimes-section";
import { TrailerPlayer } from "../trailer/trailerplayer";
import styles from "./styles";

import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "@/src/services/favourites-storage"; // 👈 favourites helpers

export default function MovieDetailsComp() {
  const router = useRouter();
  const { id, cinemaId } = useLocalSearchParams<{ id: string; cinemaId: string }>();

  const movie = useAppSelector((state) =>
    state.movies.movies.find((m) => m.id === Number(id))
  );

  const [isFavourite, setIsFavourite] = useState(false);

  // 🔍 Check if this movie is already in favourites
  useEffect(() => {
    const checkFavourite = async () => {
      if (!movie) return;
      const favs = await getFavourites();
      const exists = favs.some((m) => m.id === movie.id);
      setIsFavourite(exists);
    };

    checkFavourite();
  }, [movie?.id]);

  if (!movie) {
    return <Text>Movie not found</Text>;
  }

  const omdbData = movie.omdb?.[0];
  const writers = omdbData?.Writer ? omdbData.Writer.split(",").map((w) => w.trim()) : [];

  const cinemaShowtime = movie.showtimes?.find(
    (st) => st.cinema.id === Number(cinemaId)
  );

  const trailers = movie.trailers?.[0]?.results ?? [];

  const officialTrailer =
    trailers.find((trailer) => trailer.name.toLowerCase().includes("official trailer")) ??
    null;

  // ❤️ Toggle favourite
  const handleFavoritePress = async () => {
    if (!movie) return;

    if (isFavourite) {
      await removeFavourite(movie.id);
      setIsFavourite(false);
    } else {
      await addFavourite(movie);
      setIsFavourite(true);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  // Get certificate/rating - show N/A if not available
  const certificate = movie.omdb?.[0]?.Rated || "N/A";

  // Calculate average rating from all sources
  const calculateAverageRating = (): string => {
    const ratings: number[] = [];

    // IMDB rating (string -> number if possible)
    if (movie.ratings?.imdb && !isNaN(Number(movie.ratings.imdb))) {
      ratings.push(Number(movie.ratings.imdb));
    }

    // Rotten Tomatoes audience (percentage string -> number)
    if (movie.ratings?.rotten_audience && !isNaN(Number(movie.ratings.rotten_audience))) {
      ratings.push(Number(movie.ratings.rotten_audience) / 10);
    }

    // Rotten Tomatoes critics
    if (movie.ratings?.rotten_critics && !isNaN(Number(movie.ratings.rotten_critics))) {
      ratings.push(Number(movie.ratings.rotten_critics) / 10);
    }

    if (ratings.length === 0) {
      return "N/A";
    }

    const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    return average.toFixed(1);
  };

  const averageRating = calculateAverageRating();

  return (
    <View style={styles.container}>
      {/* Back and Favorite buttons */}
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
          <Ionicons
            name={isFavourite ? "heart" : "heart-outline"} // 👈 filled when favourited
            size={28}
            color={isFavourite ? "#E94560" : "#C4C4C4"}
          />
        </TouchableOpacity>
      </View>

      {/* Poster */}
      <View style={styles.posterContainer}>
        <Image style={styles.poster} source={{ uri: movie.poster }} />
      </View>

      {/* Title and Certificate */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {/* Info Box - with average rating */}
      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Text style={styles.infoNumber}>{movie.durationMinutes}</Text>
          <Text style={styles.infoLabel}>Minutes</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoNumber}>{certificate}</Text>
          <Text style={styles.infoLabel}>PG-Rating</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoNumber}>{movie.year}</Text>
          <Text style={styles.infoLabel}>Year</Text>
        </View>
      </View>

      {/* Plot */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plot</Text>
        <Text style={styles.sectionText}>{movie.plot}</Text>
      </View>

      {/* Credits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Credits</Text>
        <View style={styles.creditRow}>
          <Text style={styles.creditLabel}>Director:</Text>
          <Text style={styles.creditValue}>
            {movie.directors_abridged?.map((director, index) => (
              <Text key={index}>
                {director.name}
                {index < movie.directors_abridged.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.creditLabel}>Writers:</Text>
          <Text style={styles.creditValue}>{writers.join(", ") || "N/A"}</Text>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.creditLabel}>Starring:</Text>
          <Text style={styles.creditValue}>
            {movie.actors_abridged?.map((actor, index) => (
              <Text key={index}>
                {actor.name}
                {index < movie.actors_abridged.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.creditLabel}>Country:</Text>
          <Text style={styles.creditValue}>{movie.omdb?.[0]?.Country ?? "N/A"}</Text>
        </View>
      </View>

      {/* Ratings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ratings</Text>
        <RatingsSection ratings={movie.ratings} />
      </View>

      {/* Genres */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Genres</Text>
        <View style={styles.genresContainer}>
          {movie.genres?.map((genre, index) => (
            <View style={styles.genreBadge} key={index}>
              <Text style={styles.genreBadgeText}>{genre.Name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Showtimes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Showtimes</Text>
        {cinemaShowtime ? (
          <ShowtimesSection
            showtimes={[
              {
                cinema: cinemaShowtime.cinema,
                schedule: cinemaShowtime.schedule,
              },
            ]}
          />
        ) : (
          <Text style={styles.noShowtimesText}>
            No showtimes available for this cinema
          </Text>
        )}
      </View>

      {/* Trailer */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Watch Trailer</Text>
        <TrailerPlayer trailer={officialTrailer} />
      </View>
    </View>
  );
}

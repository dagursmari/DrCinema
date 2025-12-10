import { useAppSelector } from "@/src/redux/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RatingsSection } from "../ratings/rating-section";
import { ShowtimesSection } from "../showtimes/showtimes-section";
import { TrailerPlayer } from "../trailer/trailerplayer";
import styles from "./styles";

export default function MovieDetailsComp() {
  const router = useRouter();
  const { id, cinemaId } = useLocalSearchParams<{ id: string; cinemaId: string }>();

  const movie = useAppSelector((state) =>
    state.movies.movies.find((m) => m.id === Number(id))
  );

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
    trailers.find((trailer) => trailer.name.toLowerCase().includes("official trailer")) ?? null;

  const handleFavoritePress = () => {
    console.log("Favorite button pressed - functionality coming soon!");
  };

  const handleBackPress = () => {
    router.back();
  };

  // Get certificate/rating - show N/A if not available
  const certificate = movie.omdb?.[0]?.Rated || "PG - N/A";

  // Calculate average rating from all sources
  const calculateAverageRating = (): string => {
    const ratings = [];
    
    // IMDB rating (out of 10)
    if (movie.ratings?.imdb && typeof movie.ratings.imdb === 'number') {
      ratings.push(movie.ratings.imdb);
    }
    
    // Rotten Tomatoes (convert from percentage to 10 scale)
    if (movie.ratings && 'rottenTomatoes' in movie.ratings && typeof movie.ratings.rottenTomatoes === 'number') {
      ratings.push(movie.ratings.rottenTomatoes / 10);
    }
    
    // Metacritic (convert from 100 scale to 10 scale)
    if (movie.ratings && 'metacritic' in movie.ratings && typeof movie.ratings.metacritic === 'number') {
      ratings.push(movie.ratings.metacritic / 10);
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
          <Ionicons name="heart-outline" size={28} color="#E94560" />
        </TouchableOpacity>
      </View>

      {/* Poster */}
      <View style={styles.posterContainer}>
        <Image style={styles.poster} source={{ uri: movie.poster }} />
      </View>

      {/* Title and Certificate */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.certificateBadge}>
          <Text style={styles.certificateText}>{certificate}</Text>
        </View>
      </View>

      {/* Info Box - with average rating */}
      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Text style={styles.infoNumber}>{movie.durationMinutes}</Text>
          <Text style={styles.infoLabel}>Minutes</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoNumber}>{averageRating}</Text>
          <Text style={styles.infoLabel}>Rating</Text>
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
          <Text style={styles.noShowtimesText}>No showtimes available for this cinema</Text>
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
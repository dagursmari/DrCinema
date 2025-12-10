import { useAppSelector } from "@/src/redux/hooks";
import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";
import { RatingsSection } from "../ratings/rating-section";
import { ShowtimesSection } from "../showtimes/showtimes-section";
import styles from "./styles";

export default function MovieDetailsComp () {

    

    const {id, cinemaId} = useLocalSearchParams<{ id: string; cinemaId: string }>()
    
      const movie = useAppSelector((state) => 
        state.movies.movies.find(m => m.id === Number(id))
      );

      const omdbData = movie.omdb?.[0];
        const writers = omdbData?.Writer 
        ? omdbData.Writer.split(',').map(w => w.trim())
       : [];

       const cinemaShowtime = movie.showtimes?.find(
            st => st.cinema.id === Number(cinemaId)
        );

        console.log('Found cinema showtime:', cinemaShowtime);
        console.log("Raw cinemaId:", cinemaId);
        console.log("Parsed cinemaId:", Number(cinemaId));  
        
      if (!movie) {
      return <Text>Movie not found</Text>;
      }

    return (
        <View>
        <Image style={styles.poster} source={{ uri: movie.poster }} />
              <Text style={styles.title}>{movie.title}</Text>

              <View style={styles.infoBox}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoNumber}>{movie.durationMinutes}</Text>
                    <Text style={styles.infoLabel}>Minútur</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoNumber}>{movie.ratings?.average || "N/A"}</Text>
                    <Text style={styles.infoLabel}>Rating</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoNumber}>{movie.year}</Text>
                    <Text style={styles.infoLabel}>Year</Text>
                </View>
                </View>

              <Text style={styles.subheader}>Plot</Text>
              <Text style={styles.subtext}>{movie.plot}</Text>

              <Text style={styles.subheader}>Credits</Text>
              <Text style={styles.subtext}>Director: {movie.directors_abridged?.map((director, index) => (
                <Text key={index}>
                    {director.name}{index < movie.directors_abridged.length - 1 ? ', ' : ''}
                    </Text>
              ))}</Text>
              <Text style={styles.subtext}>Writers: {writers.join(", " || "N/A" )}</Text>
              <Text style={styles.subtext}>
                Starring: {movie.actors_abridged?.map((actor, index) => (
                    <Text key={index}>
                    {actor.name}{index < movie.actors_abridged.length - 1 ? ', ' : ''}
                    </Text>
                ))}
                </Text>
              <Text style={styles.subtext}>Country: {movie.omdb[0].Country || "N/A"}</Text>

              <Text style={styles.subheader}>Ratings</Text>
              <View style={styles.ratings}>
                <RatingsSection ratings={movie.ratings} />
              </View>

              <Text style={styles.subheader}>Genres</Text>
                <View style={styles.badgeContainer}>
                {movie.genres?.map((genre, index) => (
                    <View style={styles.badge} key={index}>
                    <Text style={styles.badgeText}>{genre.Name}</Text>
                    </View>
                ))}
                </View>
            
            

              <Text style={styles.subheader}>Showtimes</Text>
            <View style={styles.showtimesection}>
            {cinemaShowtime ? (
            <>
                <ShowtimesSection 
                showtimes={[
                    {
                    cinema: cinemaShowtime.cinema,
                    schedule: cinemaShowtime.schedule
                    }
                ]}
                />
            </>
            ) : (
            <Text>No showtimes available for this cinema</Text>
            )}

            </View>


              <Text style={styles.subheader}>Watch Trailer</Text>

              


        </View>
    );
}
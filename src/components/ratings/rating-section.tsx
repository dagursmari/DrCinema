import { View } from "react-native";
import { RatingCard } from "./rating-card";
import styles from "./styles";

interface RatingsSectionProps {
  ratings: {
    imdb?: string | null;
    rotten_audience?: string | null;
    rotten_critics?: string | null;
  };
}

export function RatingsSection({ ratings }: RatingsSectionProps) {
  return (
    <View style={styles.container}>
      {ratings.imdb && (
        <RatingCard
          logo={require("@/assets/images/imdb-logo.png")}
          rating={ratings.imdb}
          suffix="/10"
        />
      )}

      {ratings.rotten_critics && (
        <RatingCard
          logo={require("@/assets/images/rotten-logo.png")}
          rating={ratings.rotten_critics}
          suffix="%"
        />
      )}

      {ratings.rotten_audience && (
        <RatingCard
          logo={require("@/assets/images/rotten-audience-logo.png")}
          rating={ratings.rotten_audience}
          suffix="%"
        />
      )}
    </View>
  );
}

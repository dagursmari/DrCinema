import { Image, Text, View } from 'react-native';
import styles from './styles';

interface RatingCardProps {
  logo: any;
  rating: string;
  suffix?: string; // "/10" or "%"
}

export function RatingCard({ logo, rating, suffix }: RatingCardProps) {
  return (
    <View style={styles.card}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.rating}>
        <Text style={styles.ratingValue}>{rating}</Text>
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </Text>
    </View>
  );
}

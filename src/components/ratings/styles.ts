import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 100,
  },
  logo: {
    width: 60,
    height: 30,
    marginBottom: 8,
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingValue: {
    color: '#e50914',
  },
  suffix: {
    color: '#333',
  },
  container: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
});
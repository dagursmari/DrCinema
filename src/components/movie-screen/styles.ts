import { StyleSheet } from "react-native";
import { shadow, mainPink, black, white, lighterGray } from "@/src/styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },

  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: lighterGray,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  posterContainer: {
    alignItems: "center",
    paddingBottom: 16,
  },

  poster: {
    width: 200,
    height: 300,
    borderRadius: 12,
    shadowColor: shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },

  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
  },

  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    marginRight: 12,
  },

  certificateText: {
    color: mainPink,
    fontSize: 14,
    fontWeight: "700",
  },

  infoBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  infoItem: {
    alignItems: "center",
    flex: 1,
  },

  infoNumber: {
    fontSize: 24,
    fontWeight: 700,
    color: mainPink,
    marginBottom: 4,
  },

  infoLabel: {
    fontSize: 13,
    color: "#6c757d",
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },

  sectionText: {
    fontSize: 15,
    color: "#4a4a4a",
    lineHeight: 22,
  },

  creditRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  creditLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: "#6c757d",
    width: 80,
  },

  creditValue: {
    flex: 1,
    fontSize: 15,
    color: black,
    lineHeight: 22,
  },

  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  genreBadge: {
    backgroundColor: "rgba(233, 69, 96, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  genreBadgeText: {
    color: mainPink,
    fontSize: 14,
    fontWeight: "600",
  },

  noShowtimesText: {
    fontSize: 15,
    color: "#6c757d",
    fontStyle: "italic",
  },

  // 🔽 NEW styles for grouped showtimes by cinema
  cinemaShowtimesBlock: {
    marginBottom: 16,
  },

  cinemaShowtimesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 6,
  },
});

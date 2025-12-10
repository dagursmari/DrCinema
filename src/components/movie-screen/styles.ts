import { StyleSheet } from "react-native";

export default StyleSheet.create({
    title:{
        fontSize:24,
        fontWeight:"800",
        marginBlockStart:15,
        marginHorizontal:15,
    },

    poster: {
        width: 200,
        height: 300,
        borderRadius: 12,
        margin:20,
        justifyContent:"center",
        alignContent:"center"
    },

    year:{

    },

    ratings:{
        alignItems:"center",
        margin:15
    },

    certificate:{

    },

    trailer:{

    },

    subheader: {
        fontSize:20,
        fontWeight:"700",
        marginBottom:10,
        marginTop:15,
        marginHorizontal:10,
    },

    subtext:{
        marginHorizontal:15,
    },

    showtimesection:{
        margin:10,
    },

    badgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 0.5,
        marginHorizontal:10,
        justifyContent:"center" 
    },

    badge: {
        backgroundColor: "rgba(255, 182, 193, 0.3)", 
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
        marginHorizontal: 15,
    },

    badgeText: {
        color: "#E46C8A", 
        fontSize: 12,
        fontWeight: "600",
    },

    infoBox: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 16,
        marginHorizontal:16,
        paddingVertical: 8,
        backgroundColor: "#f7f7f7", 
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoItem: {
        alignItems: "center",
        flex: 1,
    },
    infoNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#e50914", 
    },
    infoLabel: {
        fontSize: 12,
        color: "#555",
        marginTop: 2,
    },




});
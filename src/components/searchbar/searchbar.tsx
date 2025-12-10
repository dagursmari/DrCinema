import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type SearchBarProps = {
  onSearch: (text: string) => void;
  onFilterPress?: () => void;
};

export default function SearchBarComp({ onSearch, onFilterPress}: SearchBarProps) {
  const [search, setSearch] = useState("");

  const updateSearch = (text: string) => {
    setSearch(text);
    onSearch(text);
  };

  const handleFilterPress = () => {
    if (onFilterPress) {
      onFilterPress();
    } else {
      console.log("Filter button pressed - functionality coming soon!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color="#999" 
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={updateSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity 
        style={styles.filterButton}
        onPress={handleFilterPress}
        activeOpacity={0.7}
      >
        <Ionicons name="options-outline" size={24} color="#1a1a1a" />
      </TouchableOpacity>
    </View>
  );
}
import React, { useState } from "react";
import { View, TextInput, ViewStyle, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

type SearchBarProps = {
  onSearch: (text: string) => void;
  style?:ViewStyle;
};

export default function SearchBarComp({ onSearch, }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const updateSearch = (text: string) => {
    setSearch(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setSearch("");
    onSearch("");
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

        {search.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
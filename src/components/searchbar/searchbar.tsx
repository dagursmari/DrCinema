import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import styles from "./styles";


type SearchBarProps = {
  onSearch: (text: string) => void;
};

export default function SearchBarComp({ onSearch}: SearchBarProps) {
  const [search, setSearch] = useState("");

  const updateSearch = (text: string) => {
    setSearch(text);
    onSearch(text);
  };



  return (
    <SearchBar
      placeholder="Search movies..."
      value={search}
      onChangeText={updateSearch}
      lightTheme
      round
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
    />
  );
}

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./styles";

export interface Filters {
  imdbRating?: number;
  rottenRating?: number;
  actor?: string;
  director?: string;
  certificate?: string;
  showtimeFrom?: string;
  showtimeTo?: string;
}

type FilterButtonProps = {
  onPress: () => void;
};

export function FilterButton({ onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity style={styles.filterButton} onPress={onPress}>
      <Ionicons name="options-outline" size={24} color="#1a1a1a" />
    </TouchableOpacity>
  );
}

type FilterCompProps = {
  onApplyFilters: (filters: Filters) => void;
  onClose: () => void;
};

export function FilterComp({ onApplyFilters, onClose }: FilterCompProps) {
  const [imdbRating, setImdbRating] = useState<string>("");
  const [rottenRating, setRottenRating] = useState<string>("");
  const [actor, setActor] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [certificate, setCertificate] = useState<string>("");
  const [showtimeFrom, setShowtimeFrom] = useState<string>("");
  const [showtimeTo, setShowtimeTo] = useState<string>("");

  const handleApply = () => {
    Keyboard.dismiss();
    const filters: Filters = {};
    
    if (imdbRating) filters.imdbRating = parseFloat(imdbRating);
    if (rottenRating) filters.rottenRating = parseFloat(rottenRating);
    if (actor.trim()) filters.actor = actor.trim();
    if (director.trim()) filters.director = director.trim();
    if (certificate.trim()) filters.certificate = certificate.trim();
    if (showtimeFrom.trim()) filters.showtimeFrom = showtimeFrom.trim();
    if (showtimeTo.trim()) filters.showtimeTo = showtimeTo.trim();

    onApplyFilters(filters);
  };

  const formatTime = (text: string) => {
  const cleaned = text.replace(/\D/g, ""); // numbers only

    if (cleaned.length <= 2) {
        return cleaned;
    }

    return cleaned.slice(0, 2) + ":" + cleaned.slice(2, 4);
    };

  const handleClear = () => {
    Keyboard.dismiss();
    setImdbRating("");
    setRottenRating("");
    setActor("");
    setDirector("");
    setCertificate("");
    setShowtimeFrom("");
    setShowtimeTo("");
    onApplyFilters({});
  };

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filters</Text>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={24} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.filterContent}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>IMDb Rating (min)</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="e.g., 7.0"
            placeholderTextColor="#999"
            value={imdbRating}
            onChangeText={setImdbRating}
            keyboardType="decimal-pad"
            blurOnSubmit={true}
          />
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Rotten Tomatoes (min)</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="e.g., 80"
            placeholderTextColor="#999"
            value={rottenRating}
            onChangeText={setRottenRating}
            keyboardType="numeric"
            blurOnSubmit={true}
          />
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Actor</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="Search by actor name"
            placeholderTextColor="#999"
            value={actor}
            onChangeText={setActor}
            blurOnSubmit={true}
          />
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Director</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="Search by director name"
            placeholderTextColor="#999"
            value={director}
            onChangeText={setDirector}
            blurOnSubmit={true}
          />
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Certificate</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="Enter the PG age e.g. 13"
            placeholderTextColor="#999"
            value={certificate}
            onChangeText={setCertificate}
            blurOnSubmit={true}
          />
        </View>

        <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Showtime From (HH:MM)</Text>
            <TextInput
                style={styles.filterInput}
                placeholder="e.g., 14:00"
                placeholderTextColor="#999"
                value={showtimeFrom}
                onChangeText={(t) => setShowtimeFrom(formatTime(t))}
                blurOnSubmit={true}
                keyboardType="number-pad"
            />
            </View>

            <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Showtime To (HH:MM)</Text>
            <TextInput
                style={styles.filterInput}
                placeholder="e.g., 22:00"
                placeholderTextColor="#999"
                value={showtimeTo}
                onChangeText={(t) => setShowtimeTo(formatTime(t))}
                blurOnSubmit={true}
                keyboardType="number-pad"
            />
            </View>

        {/* Add extra padding at bottom for scrolling */}
        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.filterActions}>
        <TouchableOpacity 
          style={[styles.filterActionButton, styles.clearButton]} 
          onPress={handleClear}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterActionButton, styles.applyButton]} 
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
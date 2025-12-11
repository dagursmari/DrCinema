// src/views/footer/ScreenWithFooter.tsx
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "@/src/components/footer/Footer";
import styles from "./styles";

type ScreenWithFooterProps = {
  children: ReactNode;
};
export const ScreenWithFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
        {children}
      </SafeAreaView>

      <View pointerEvents="box-none" style={styles.footerOverlay}>
        <Footer />
      </View>
    </View>
  );
};


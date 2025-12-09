// src/views/footer/ScreenWithFooter.tsx
import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "@/src/components/footer/Footer";
import styles from "./styles";

type ScreenWithFooterProps = {
  children: ReactNode;
};

export const ScreenWithFooter: React.FC<ScreenWithFooterProps> = ({ children }) => {
  return (
    <View style={styles.root}>
      {/* Content (top/side safe area only) */}
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {children}
      </SafeAreaView>

      {/* Footer overlaid on top, stuck to the very bottom */}
      <View pointerEvents="box-none" style={styles.footerOverlay}>
        <Footer />
      </View>
    </View>
  );
};

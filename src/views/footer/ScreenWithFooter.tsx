import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import Footer from "@/src/components/footer/Footer";
import styles from "./styles";

type ScreenWithFooterProps = {
  children: ReactNode;
};

export const ScreenWithFooter: React.FC<ScreenWithFooterProps> = ({ children }) => {
  return (
    <View style={styles.root}>
      {/* Safe area only for the content */}
      <SafeAreaView style={styles.safeArea}>
        {children}
      </SafeAreaView>

      {/* Footer always at the bottom */}
      <Footer />
    </View>
  );
};

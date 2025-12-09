import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
import  Footer  from "@/src/components/footer/Footer"; // adjust path if default export

type ScreenWithFooterProps = {
  children: ReactNode;
};

export const ScreenWithFooter: React.FC<ScreenWithFooterProps> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
      <Footer />
    </SafeAreaView>
  );
};

import { Slot, SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NAV_THEME } from "@/lib/constants";
import { type Theme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { AuthProvider } from "@/lib/auth/auth-provider";
import "../global.css";

const fonts: Theme["fonts"] = {
  regular: {
    fontFamily: "Inter",
    fontWeight: "400",
  },
  bold: {
    fontFamily: "Inter",
    fontWeight: "700",
  },
  medium: {
    fontFamily: "Inter",
    fontWeight: "500",
  },
  heavy: {
    fontFamily: "Inter",
    fontWeight: "800",
  },
};

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts,
};

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    async function loadColorScheme() {
      const theme = await AsyncStorage.getItem("theme");
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      // const colorTheme = "light";
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
      SplashScreen.hideAsync();
    }

    loadColorScheme();
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <AuthProvider>
          <TRPCReactProvider>
            <GestureHandlerRootView className="flex-1">
              <Slot />
            </GestureHandlerRootView>
          </TRPCReactProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

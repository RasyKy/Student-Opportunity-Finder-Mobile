import NetInfo from "@react-native-community/netinfo";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { type Href, Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  initialRouteName: "index",
};

const OFFLINE_ROUTE = "/(tabs)/no-internet" as Href;
const FALLBACK_ONLINE_ROUTE = "/(tabs)" as Href;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const lastOnlinePathRef = useRef<Href | null>(null);

  const handleNetworkState = useCallback(
    (state: {
      isConnected: boolean | null;
      isInternetReachable: boolean | null;
    }) => {
      const isOffline =
        state.isConnected === false || state.isInternetReachable === false;

      if (isOffline) {
        if (pathnameRef.current !== OFFLINE_ROUTE) {
          router.replace(OFFLINE_ROUTE);
        }
        return;
      }

      if (pathnameRef.current === OFFLINE_ROUTE) {
        router.replace(lastOnlinePathRef.current ?? FALLBACK_ONLINE_ROUTE);
      }
    },
    [router],
  );

  useEffect(() => {
    pathnameRef.current = pathname;

    if (pathname !== OFFLINE_ROUTE) {
      lastOnlinePathRef.current = pathname as Href;
    }
  }, [pathname]);

  useEffect(() => {
    NetInfo.fetch().then(handleNetworkState);
    const unsubscribe = NetInfo.addEventListener(handleNetworkState);

    return () => unsubscribe();
  }, [handleNetworkState]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="opportunity-detail"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="opportunity/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="organizer/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen
          name="language-settings"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="language-onboarding"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="about-us" options={{ headerShown: false }} />
        <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
        <Stack.Screen name="edit-interests" options={{ headerShown: false }} />
        <Stack.Screen
          name="survey"
          options={{ presentation: "fullScreenModal", headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

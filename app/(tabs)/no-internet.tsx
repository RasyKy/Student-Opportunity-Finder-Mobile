import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NoInternetScreen() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const handleRetryConnection = async () => {
    if (isChecking) {
      return;
    }

    setIsChecking(true);

    try {
      const state = await NetInfo.fetch();
      const isOffline =
        state.isConnected === false || state.isInternetReachable === false;

      if (!isOffline) {
        router.replace("/(tabs)");
      }
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.iconCard}>
          <Ionicons name="cloud-offline-outline" size={84} color="#4332B3" />
        </View>

        <Text style={styles.title}>No Internet{"\n"}Connection</Text>
        <Text style={styles.subtitle}>
          It looks like you are offline. Please check your connection and try
          again to discover new opportunities.
        </Text>

        <TouchableOpacity
          style={[styles.retryButton, isChecking && styles.retryButtonDisabled]}
          activeOpacity={0.88}
          onPress={handleRetryConnection}
          disabled={isChecking}
        >
          {isChecking ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.retryButtonText}>Retry Connection</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F8",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
  },
  iconCard: {
    width: 196,
    height: 184,
    borderRadius: 28,
    backgroundColor: "#F8F8FC",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#261E6F",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  title: {
    marginTop: 8,
    fontSize: 46,
    lineHeight: 52,
    textAlign: "center",
    color: "#121933",
    fontWeight: "800",
  },
  subtitle: {
    maxWidth: 360,
    textAlign: "center",
    fontSize: 24,
    lineHeight: 36,
    color: "#4D5C75",
    fontWeight: "500",
  },
  retryButton: {
    marginTop: 18,
    width: "100%",
    maxWidth: 560,
    borderRadius: 16,
    backgroundColor: "#4332B3",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 62,
    shadowColor: "#34278F",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  retryButtonDisabled: {
    opacity: 0.75,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
});

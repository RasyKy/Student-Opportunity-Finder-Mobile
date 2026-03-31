import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <View style={styles.center}>
        <Text style={styles.title}>Saved</Text>
        <Text style={styles.subtitle}>Your bookmarked opportunities will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#151B43",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#6F758B",
    textAlign: "center",
  },
});
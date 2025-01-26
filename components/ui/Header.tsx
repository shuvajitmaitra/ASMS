import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";

const Header = ({ title, onBackPress }: { title: string; onBackPress: () => void }) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <StatusBar style="dark" />
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Feather name="arrow-left" size={24} color={Colors.white} />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: Colors.white }}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.bg,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    shadowColor: Colors.body,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 10,
  },
  backButton: {
    marginVertical: 10,
  },
});

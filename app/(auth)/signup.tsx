import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayName, setPin } from "@/redux/userReducer/userReducer";
import { RootState } from "@/redux/store";
import { handleRegister } from "@/constants/ApiCall";
import { router, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { handleCopyText } from "@/utils/commonFunction";
import Loading from "@/components/ui/Loading";
import { borderRadius, buttonHeights, fontSizes } from "@/constants/sizes";
import { useGlobalContext } from "@/hooks/useGlobalContext";
type logInfoType = {
  displayName: string;
  userName: string;
  password: string;
  pin: string;
  isLoading: boolean;
};

const SignupScreen = () => {
  const [logInfo, setLogInfo] = useState<logInfoType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Handle PIN Submission
  const handleSignup = async () => {
    await handleRegister({
      displayName: logInfo?.displayName || "",
      pin: logInfo?.pin || "",
      password: logInfo?.password || "",
      username: logInfo?.userName || "",
      setIsLoading,
    });
  };

  // Default Login Screen
  return (
    <LinearGradient colors={[Colors.bg, "transparent"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false, statusBarTranslucent: true }} />
      <Text style={styles.logo}>UI</Text>
      <Text style={styles.subtitle}>vector interface</Text>

      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.signInText}>Sign up to continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter display name"
        placeholderTextColor="#A0A0A0"
        value={logInfo?.displayName || ""}
        autoCapitalize="none"
        onChangeText={(text) => setLogInfo({ ...logInfo!, displayName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter unique username"
        placeholderTextColor="#A0A0A0"
        value={logInfo?.userName || ""}
        onChangeText={(text) => setLogInfo({ ...logInfo!, userName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#A0A0A0"
        value={logInfo?.password || ""}
        onChangeText={(text) => setLogInfo({ ...logInfo!, password: text })}
      />
      <TextInput
        style={styles.input}
        maxLength={4}
        placeholder="Enter PIN"
        keyboardType="number-pad"
        placeholderTextColor={Colors.body}
        value={logInfo?.pin || ""}
        onChangeText={(text) => setLogInfo({ ...logInfo!, pin: text })}
      />
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => {
          handleSignup();
        }}
      >
        <Text style={styles.signInButtonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)")}>
        <Text style={styles.recoverText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#2D2D2D",
    borderRadius: 7,
    width: "100%",
    padding: 10,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.black,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 40,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#2D2D2D",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: Colors.body,
    fontSize: 16,
    marginBottom: 15,
  },
  signInButton: {
    width: "100%",
    height: buttonHeights.default,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: fontSizes.subHeading,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  recoverText: {
    color: "#FFFFFF",
    fontSize: fontSizes.body,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  createAccountText: {
    color: "#FFFFFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  infoText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

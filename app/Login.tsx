import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayName, setPin } from "@/redux/userReducer/userReducer";
import { RootState } from "@/redux/store";
import { handleRegister } from "@/constants/ApiCall";
import { router, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { handleCopyText } from "@/utils/commonFunction";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pin, setPinInput] = useState("");

  const dispatch = useDispatch();
  const { displayName, hash } = useSelector((state: RootState) => state.user);

  // Handle PIN Submission
  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      Alert.alert("Invalid PIN", "PIN must be exactly 4 digits");
      return;
    }
    dispatch(setPin(pin));
    await handleRegister({ displayName, pin });
  };

  // If hash is present, navigate to app screen
  if (hash) {
    return (
      <LinearGradient colors={[Colors.bg, "transparent"]} style={styles.container}>
        <Text style={styles.infoText}>
          Please copy and securely save this hash to recover your account in the future. If you lose it, you may not be able to regain
          access to your account.
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{hash}</Text>
          <Feather onPress={() => handleCopyText(hash)} name="copy" size={24} color={Colors.body} />
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={() => router.push("/(app)")}>
          <Text style={styles.signInButtonText}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // If username (displayName) exists, show PIN input
  if (displayName) {
    return (
      <LinearGradient colors={[Colors.bg, "transparent"]} style={styles.container}>
        <TextInput
          style={styles.input}
          maxLength={4}
          placeholder="Enter PIN"
          keyboardType="number-pad"
          placeholderTextColor={Colors.body}
          value={pin}
          onChangeText={setPinInput}
        />
        <TouchableOpacity
          style={[styles.signInButton, pin.length !== 4 && styles.disabledButton]}
          disabled={pin.length !== 4}
          onPress={handlePinSubmit}
        >
          <Text style={styles.signInButtonText}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // Default Login Screen
  return (
    <LinearGradient colors={[Colors.bg, "transparent"]} style={styles.container}>
      <Stack.Screen options={{ headerShown: false, statusBarTranslucent: true }} />
      <Text style={styles.logo}>UI</Text>
      <Text style={styles.subtitle}>vector interface</Text>

      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.signInText}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter display name"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.signInButton} onPress={() => dispatch(setDisplayName(email))}>
        <Text style={styles.signInButtonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/screens/recover/recover")}>
        <Text style={styles.recoverText}>Recover your account</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  recoverText: {
    color: "#FFFFFF",
    fontSize: 14,
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

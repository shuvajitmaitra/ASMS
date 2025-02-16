import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setRefreshToken, setUser } from "@/redux/userReducer/userReducer";
import { RootState } from "@/redux/store";
import { router, Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { handleCopyText, showToast } from "@/utils/commonFunction";
import Loading from "@/components/ui/Loading";
import { borderRadius, buttonHeights, fontSizes, gWidth, margin, padding } from "@/constants/sizes";
import axiosInstance from "@/constants/axiosInstance";
import { registerIndieID } from "native-notify";
type logInfoType = {
  username: string;
  password: string;
  pin: string;
};

const LoginScreen = () => {
  const [logInfo, setLogInfo] = useState<logInfoType | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // If hash is present, navigate to app screen
  if (false) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bg, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flexDirection: "row", gap: gWidth(10), marginBottom: margin.default, alignItems: "center" }}>
          <View style={{ height: buttonHeights.small, width: 100, backgroundColor: Colors.primary }}></View>
          <View style={{ height: buttonHeights.default, width: 100, backgroundColor: Colors.primary }}></View>
          <View style={{ height: buttonHeights.large, width: 100, backgroundColor: Colors.primary }}></View>
        </View>
        <View style={{ flexDirection: "row", gap: gWidth(10), marginBottom: margin.default }}>
          <View style={{ height: 80, width: 80, backgroundColor: Colors.primary, borderRadius: borderRadius.small }}></View>
          <View style={{ height: 80, width: 80, backgroundColor: Colors.primary, borderRadius: borderRadius.default }}></View>
          <View style={{ height: 80, width: 80, backgroundColor: Colors.primary, borderRadius: borderRadius.large }}></View>
          <View style={{ height: 80, width: 80, backgroundColor: Colors.primary, borderRadius: borderRadius.circle }}></View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colors.border, marginBottom: margin.default }}>
          <Text
            style={{
              color: Colors.white,
              borderColor: Colors.white,
              fontSize: fontSizes.body,
              margin: margin.small,
              padding: padding.small,
              backgroundColor: Colors.body,
            }}
          >
            sample "small" margin padding
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colors.border, marginBottom: margin.default }}>
          <Text
            style={{
              backgroundColor: Colors.body,
              color: Colors.white,
              fontSize: fontSizes.body,
              margin: margin.default,
              padding: padding.default,
            }}
          >
            sample "default" margin padding
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colors.border, marginBottom: margin.default }}>
          <Text
            style={{
              color: Colors.white,
              fontSize: fontSizes.body,
              margin: margin.large,
              padding: padding.large,
              backgroundColor: Colors.body,
            }}
          >
            sample "large" margin padding
          </Text>
        </View>
        <Text style={{ color: Colors.white, fontSize: fontSizes.small }}>Font size small {fontSizes.small}</Text>
        <Text style={{ color: Colors.white, fontSize: fontSizes.body }}>Font size body {fontSizes.body}</Text>
        <Text style={{ color: Colors.white, fontSize: fontSizes.subHeading }}>Font size subHeading {fontSizes.subHeading}</Text>
        <Text style={{ color: Colors.white, fontSize: fontSizes.heading }}>Font size heading {fontSizes.heading}</Text>
        <Text style={{ color: Colors.white, fontSize: fontSizes.largeTitle }}>Font size largeTitle {fontSizes.largeTitle}</Text>
      </View>
    );
  }
  const handleLogin = async () => {
    console.log("logInfo", JSON.stringify(logInfo, null, 2));
    await axiosInstance
      .post("/user/login", logInfo)
      .then((response) => {
        if (response.data.success) {
          registerIndieID("shuvo", 27503, "DYq9JGic71pEzAFNhpfNsd");
          console.log("response.data", JSON.stringify(response.data, null, 2));
          dispatch(setAccessToken(response.data.token.accessToken));
          dispatch(setRefreshToken(response.data.token.refreshToken));
          dispatch(setUser(response.data.data));
          showToast({ message: "Logged in successfully", color: Colors.white, background: Colors.primary });
          router.replace("/(app)");
        }
        // console.log("response.data", JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        console.log("error to login user", JSON.stringify(error.response.data, null, 2));
        showToast({ message: error.response.data.message, color: Colors.white, background: Colors.primary });
      });
  };

  if (false) {
    return (
      <LinearGradient colors={[Colors.bg, "transparent"]} style={styles.container}>
        <Pressable style={styles.backButton}>
          <Feather onPress={() => {}} name="arrow-left" size={24} color={Colors.white} />
        </Pressable>
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
          style={[styles.signInButton, logInfo?.pin?.length !== 4 && styles.disabledButton]}
          disabled={logInfo?.pin?.length !== 4}
          onPress={() => {}}
        >
          {isLoading ? <Loading /> : <Text style={styles.signInButtonText}>Next</Text>}
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
        placeholder="Enter unique username"
        placeholderTextColor="#A0A0A0"
        value={logInfo?.username || ""}
        autoCapitalize="none"
        onChangeText={(text) => setLogInfo({ ...logInfo!, username: text })}
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
          handleLogin();
        }}
      >
        <Text style={styles.signInButtonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/recover")}>
        <Text style={styles.recoverText}>Recover your account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.recoverText}>Create your account</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoginScreen;

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

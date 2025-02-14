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
import { handleCopyText, showToast } from "@/utils/commonFunction";
import Loading from "@/components/ui/Loading";
import { borderRadius, buttonHeights, fontSizes, gWidth, margin, padding } from "@/constants/sizes";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import axiosInstance from "@/constants/axiosInstance";
type logInfoType = {
  userName: string;
  password: string;
  pin: string;
  setIsLoading: (isLoading: boolean) => void;
};

const LoginScreen = () => {
  const [logInfo, setLogInfo] = useState<logInfoType | null>(null);
  const { globalData, setGlobalData } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { displayName, hash } = useSelector((state: RootState) => state.user);

  // Handle PIN Submission
  const handlePinSubmit = async () => {
    if (logInfo?.pin.length !== 4) {
      Alert.alert("Invalid PIN", "PIN must be exactly 4 digits");
      return;
    }
    dispatch(setPin(logInfo?.pin));
    // await handleRegister({ displayName, pin: logInfo?.pin, setIsLoading });
  };

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
    await axiosInstance
      .post("/user/login", { username: globalData.username, password: globalData.password, pin: globalData.pin })
      .then((response) => {
        // console.log("response.data", JSON.stringify(response.data, null, 2));
        setGlobalData({
          ...globalData!,
          refreshToken: response.data.token.refreshToken,
          accessToken: response.data.token.accessToken,
        });

        dispatch(setPin(response.data.pin));
        showToast({ message: "Logged in successfully", color: Colors.white, background: Colors.primary });
      })
      .catch((error) => {
        console.log("error", JSON.stringify(error.response.data, null, 2));
        showToast({ message: error.response.data.message, color: Colors.white, background: Colors.primary });
      });
  };
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

  // if (true) {
  //   return (
  //     <SkeletonGroup numberOfItems={4} direction="row" stagger={{ delay: 30 }}>
  //       <Skeleton w={20} h={20} bR={50} />
  //     </SkeletonGroup>
  //   );
  // }

  // If username (displayName) exists, show PIN input
  if (false) {
    return (
      <LinearGradient colors={[Colors.bg, "transparent"]} style={styles.container}>
        <Pressable style={styles.backButton}>
          <Feather onPress={() => dispatch(setDisplayName(""))} name="arrow-left" size={24} color={Colors.white} />
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
        value={globalData?.username || ""}
        autoCapitalize="none"
        onChangeText={(text) => setGlobalData({ ...globalData!, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#A0A0A0"
        value={globalData?.password || ""}
        onChangeText={(text) => setGlobalData({ ...globalData!, password: text })}
      />
      <TextInput
        style={styles.input}
        maxLength={4}
        placeholder="Enter PIN"
        keyboardType="number-pad"
        placeholderTextColor={Colors.body}
        value={globalData?.pin || ""}
        onChangeText={(text) => setGlobalData({ ...globalData!, pin: text })}
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

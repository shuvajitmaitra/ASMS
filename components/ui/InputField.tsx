import { Colors } from "@/constants/Colors";
import React, { useState, useRef } from "react";
import { Animated, StyleSheet, TextInput, View, Text, TextInputProps, Platform } from "react-native";

// Props Interface
interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: object;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelAnimatedStyle = {
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    // fontSize: animatedLabel.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [16, 12],
    // }),
    color: Colors.body,
    backgroundColor: Colors.bg,
    zIndex: 1,
    paddingHorizontal: 5,
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.Text style={[styles.label, labelAnimatedStyle]}>{label}</Animated.Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} onFocus={handleFocus} onBlur={handleBlur} {...props} />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 10,
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#000",
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 5,
  },
});

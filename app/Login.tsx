import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayName, setPin } from "@/redux/userReducer/userReducer";
import { RootState } from "@/redux/store";

const Login = () => {
  const [username, setUsername] = React.useState<string>("");
  const [number, setNumber] = React.useState<string>("");
  const dispatch = useDispatch();
  const { displayName } = useSelector((state: RootState) => state.user);

  const handlePinSubmit = () => {
    if (number.length !== 4) {
      Alert.alert("Invalid PIN", "PIN must be exactly 4 digits");
      return;
    }
    dispatch(setPin(parseInt(number, 10)));
  };

  return (
    <>
      {!displayName ? (
        <View style={styles.container}>
          <Text>Login</Text>
          <TextInput placeholder="Enter username" value={username} onChangeText={setUsername} />
          <Button
            title="Next"
            onPress={() => {
              dispatch(setDisplayName(username));
            }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput maxLength={4} placeholder="Enter pin" keyboardType="number-pad" value={number} onChangeText={setNumber} />
          <Button disabled={number.length !== 4} title="Next" onPress={handlePinSubmit} />
        </View>
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

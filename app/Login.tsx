import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayName } from "@/redux/userReducer/userReducer";
import { RootState } from "@/redux/store";

const Login = () => {
  const [username, setUsername] = React.useState<string>("");
  const dispatch = useDispatch();
  const { displayName } = useSelector((state: RootState) => state.user);

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Enter username" value={username} onChangeText={setUsername} />
      <Button
        title="Next"
        onPress={() => {
          dispatch(setDisplayName(username));
        }}
      />
      {displayName && <Text>Welcome, {displayName}!</Text>}
    </View>
  );
};

export default Login;

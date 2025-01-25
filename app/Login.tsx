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
        // separator

        <View style={styles.container}>
          <Text>-----------------------------</Text>
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

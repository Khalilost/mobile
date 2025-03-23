import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import BGImg from "../../../assets/images/smart-H3.jpg";
import { WindowHeight, WindowWidth } from "../../utils/Variables";
import axios from "axios";

let url = "http://192.168.43.15:4000/";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Showpassword, setShowPassword] = useState(true);
  const submit = async () => {
    console.log(email)
    console.log(password)
    await axios
      .post(`${url}user/login`, { email, password })
      .then((res) => {
        console.log(res)
        // if (res.data && res.data.success) {
        //   Alert.alert("Welcome", "Enjoy our app Mr(s)" + res.data.data?.name, [
        //     { text: "Ok" },
        //   ]);
        //   return navigation.reset(`main`);
        // } else {
        //   Alert.alert("Error", res.data.message || "Unknown error", [
        //     { text: "Ok" },
        //   ]);
        // }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Something went wrong mobile!", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.backgroundContainer}>
        <Image source={BGImg} style={styles.backgroundImage} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0, 0.85)", "rgba(0,0,0, 1)"]}
          style={styles.overlay}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>WELCOME!</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          right={<TextInput.Icon icon="email" color="white" />}
          style={styles.input}
          textColor="white"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={Showpassword}
          right={
            <TextInput.Icon
              icon="eye"
              color="white"
              onPress={() => setShowPassword(!Showpassword)}
            />
          }
          style={styles.input}
          textColor="white"
          outlineColor="white"
        />
        <View style={styles.edView}>
          <TouchableOpacity onPress={() => navigation.navigate("forgetpass")}>
            <Text
              style={[
                styles.loginTxt,
                { textAlign: "right", width: "100%", fontSize: 13 },
              ]}
            >
              Forget password ?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <Button
            icon="lock"
            mode="contained"
            textColor="black"
            onPress={submit}
            buttonColor="white"
          >
            Log In
          </Button>
        </View>

        <View style={styles.endView}>
          <Text style={styles.endTxt}>Create an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.loginTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    width: WindowWidth,
    height: WindowHeight,
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  textContainer: {
    width: WindowWidth,
    height: WindowHeight * 0.45,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    gap: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  input: {
    backgroundColor: "transparent",
  },
  btnContainer: {
    width: WindowWidth * 0.4,
    alignSelf: "center",
    marginTop: 0,
  },
  edView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 0,
  },
  endView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },

  endTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  loginTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00BFFF",
    marginLeft: 5,
  },
});

export default LoginScreen;

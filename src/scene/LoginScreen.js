import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { btn1, colors, hr80, title } from "../styles/style";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { firebase } from "../services/Firebase/FirebaseConfig.js";

const LoginScreen = ({ navigation }) => {
  
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setcustomError] = useState("");

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Signed in
        var user = userCredential.user;
        console.log("Logged in successfully  !!!!!!!!!   ");
        // console.log(user);
        //..

        navigation.navigate("Welocomepage");
      })
      .catch((error) => {
        var errorMessage = error.message;
        // console.log(errorMessage);
        if (
          errorMessage ==
          "Firebase : The email address is budly formatted. (auth/invalid-email)."
        ) {
          setcustomError("please enter a valid email address");
        } else {
          setcustomError("Incorrect email or password");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Sign In </Text>

      {customError !== "" && <Text style={styles.errormsg}>{customError}</Text>}

      <View style={styles.inputout}>
        <AntDesign
          name="user"
          size={24}
          color={emailfocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmailfocus(true);
            setPasswordfocus(false);
            setShowpassword(false);
            setcustomError("");
          }}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>

      <View style={styles.inputout}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={24}
          color={passwordfocus == true ? colors.text1 : colors.text2}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onFocus={() => {
            setEmailfocus(false);
            setPasswordfocus(true);
            setcustomError("");
          }}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={showpassword === false ? true : false}
        />

        <Octicons
          name={showpassword == false ? "eye-closed" : "eye"}
          size={24}
          color="red"
          onPress={() => setShowpassword(!showpassword)}
        />
      </View>

      <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
        <Text
          style={{
            color: colors.col1,
            fontSize: title.btntxt,
            fontWeight: "bold",
          }}
        >
          Sign ln
        </Text>
      </TouchableOpacity>

      <Text
        style={styles.forgotpassword}
        onPress={() => navigation.navigate("forgotpassword")}
      >
        {" "}
        Forgot Password
      </Text>
      <Text style={styles.or}>OR</Text>
      <Text style={styles.gftxt}>Sign In With</Text>

      <View style={styles.gf}>
        <TouchableOpacity>
          <View style={styles.gficon}>
            <AntDesign name="google" size={24} color="#EA4335" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.gficon}>
            <FontAwesome name="facebook-f" size={24} color="#426782" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={hr80}></View>
      <Text>
        Don't have an account?
        <Text
          style={styles.signup}
          onPress={() => navigation.navigate("signup")}
        >
          {" "}
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    // justifyContent:'center',
    marginTop: 60,
  },
  head1: {
    fontSize: title.title1,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 10,
  },
  inputout: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    //  alignSelf:'center',
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "80%",
  },
  forgot: {
    color: colors.text1,
    marginTop: 20,
    marginBottom: 10,
  },
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: "bold",
  },
  gftxt: {
    color: colors.text2,
    marginVertical: 10,
    fontSize: 25,
  },
  gf: {
    flexDirection: "row",
  },
  gficon: {
    backgroundColor: "white",
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 20,
  },
  signup: {
    color: colors.text1,
  },
});

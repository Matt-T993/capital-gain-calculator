import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform, StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";
import { CheckBox, Tooltip } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { useNavigate } from "react-router";
import api from "../utils/api";
import {
  getRememberMeToken, getSessionToken,
  getXsrfToken, setRememberMeToken, setSessionToken
} from "../utils/tokenManager";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginScreen = (props) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // just logging the tokens to make sure they were saved
  useEffect(() => {
    const checkTokens = async () => {
      const sessionToken = await getSessionToken();
      console.log("Session Token: ", sessionToken);

      const xsrfToken = await getXsrfToken();
      console.log("XSRF Token: ", xsrfToken);

      const rememberMeToken = await getRememberMeToken();
      console.log("RememberMe Token: ", rememberMeToken);

      if (rememberMeToken) {
        navigate("Dashboard");
      }
    };

    checkTokens();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        emailOrUsername: usernameOrEmail,
        password: password,
        rememberMe: rememberMe,
      });

      await setSessionToken(response.data.sessionToken);

      if (response.data.rememberMeToken) {
        await setRememberMeToken(response.data.rememberMeToken);
      }

      Toast.show({
        type: 'success',
        text1: 'Login successful',
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: error.response.data.error,
      });
      if (error.response && error.response.data.error) {
        Alert.alert("Error", error.response.data.error);
      } else {
        console.error(error);
      }
    }
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Image style={styles.image} source={require("../assets/login.png")} />
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.label}>Username or Email Address</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your username or email"
          onChangeText={(text) => setUsernameOrEmail(text)}
          value={usernameOrEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <View style={styles.rememberMeContainer}>
          <CheckBox
            checked={rememberMe}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Tooltip popover={<Text>Checking this will keep you logged in on this device.</Text>}>
            <Text style={styles.labelCheckbox}>Remember Me</Text>
          </Tooltip>
        </View>
        <TouchableHighlight
          style={styles.loginButton}
          underlayColor="#0050a0"
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  };

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    diplay: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: "bold",
   

  },
  image: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
    resizeMode: "contain",
    marginBottom: windowHeight * 0.02,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: 'flex-start',
    marginLeft: windowWidth * 0.1,
    marginBottom: windowHeight * 0.01,
  },
  textInput: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.05,
    fontSize: windowWidth * 0.04,
    color: "black",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: windowWidth * 0.02,
    marginBottom: windowHeight * 0.015,
    alignSelf: 'center',
  },
  loginButton: {
    width: windowWidth * 0.8,
    backgroundColor: "blue",
    height: windowHeight * 0.05,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: windowWidth * 0.04,
    color: "white",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: windowWidth * 0.1,
  },
  checkbox: {
    // marginRight: 10,
  },
  labelCheckbox: {
    fontSize: 16,
    // marginLeft: 5
  },
});

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,
} from "react-native";

const RegisterScreen = ({ navigation }: any) => {
  const formOpacity = useRef(new Animated.Value(0)).current; // Fade-in animation for the form
  const formTranslateY = useRef(new Animated.Value(50)).current; // Slide-up animation for the form
  const logoOpacity = useRef(new Animated.Value(0)).current; // Fade-in animation for the logo

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Animations for logo and form
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(formTranslateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleRegister = () => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    // Simulate a registration process (you should replace this with an API call)
    navigation.navigate("Verify", { email }); // Pass email to the Verify screen
  };

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Image source={require("../Assets/logo.png")} style={styles.logo} />
      </Animated.View>

      {/* Animated Form Container */}
      <Animated.View
        style={[
          styles.formContainer,
          {
            opacity: formOpacity,
            transform: [{ translateY: formTranslateY }],
          },
        ]}
      >
        <Text style={styles.title}>Create an Account</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F8FA", // Light background
  },
  logoContainer: {
    marginBottom: 30, // Space between logo and form
  },
  logo: {
    width: 120, // Adjust the logo width
    height: 120, // Adjust the logo height
    resizeMode: "contain", // Maintain aspect ratio
  },
  formContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  registerButton: {
    backgroundColor: "#259D8A",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  loginText: {
    marginTop: 15,
    color: "#259D8A",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;

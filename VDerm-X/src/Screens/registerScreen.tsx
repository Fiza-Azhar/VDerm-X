import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,
  Alert,
} from "react-native";
import { BASE_URL } from "../config";

const RegisterScreen = ({ navigation }: any) => {
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(formOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(formTranslateY, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Invalid email address.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert("Error", "Password must meet the complexity requirements.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.status === 409) {
        Alert.alert("Error", "Email already exists.");
      } else if (response.ok) {
        Alert.alert("Success", "Verification OTP sent. Check your email.");
        navigation.navigate("Verify", { email });
      } else {
        Alert.alert("Error", data.message || "Failed to sign up.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "An error occurred during signup.");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Image source={require("../Assets/logo.png")} style={styles.logo} />
      </Animated.View>

      <Animated.View
        style={[
          styles.formContainer,
          { opacity: formOpacity, transform: [{ translateY: formTranslateY }] },
        ]}
      >
        <Text style={styles.title}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#F7F8FA" },
  logoContainer: { marginBottom: 30 },
  logo: { width: 120, height: 120, resizeMode: "contain" },
  formContainer: { width: "100%", padding: 20, backgroundColor: "#FFFFFF", borderRadius: 10 },
  title: { fontSize: 22, fontWeight: "700", color: "#333", textAlign: "center", marginBottom: 20 },
  input: { height: 50, backgroundColor: "#F2F2F2", borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  registerButton: { backgroundColor: "#259D8A", paddingVertical: 15, borderRadius: 8, alignItems: "center" },
  registerButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "600" },
  loginText: { marginTop: 15, color: "#259D8A", fontSize: 16, textAlign: "center", textDecorationLine: "underline" },
});

export default RegisterScreen;

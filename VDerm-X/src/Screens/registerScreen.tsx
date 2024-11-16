import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,
  Modal,
  Alert
} from "react-native";

const RegisterScreen = ({ navigation }: any) => {
  const formOpacity = useRef(new Animated.Value(0)).current; // Fade-in animation for the form
  const formTranslateY = useRef(new Animated.Value(50)).current; // Slide-up animation for the form
  const logoOpacity = useRef(new Animated.Value(0)).current; // Fade-in animation for the logo

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP has been sent
  const [timer, setTimer] = useState(60); // Timer for 1 minute
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Timer effect
  useEffect(() => {
    let intervalId: any;
    if (otpSent && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      Alert.alert("OTP expired", "The OTP has expired. Please request a new one.");
    }

    return () => clearInterval(intervalId);
  }, [otpSent, timer]);

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

    // Send OTP (simulate by showing modal)
    setOtpSent(true);
    setModalVisible(true);

    // Send OTP to the email here (backend call to send OTP)
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      // OTP is correct, navigate to Login screen
      navigation.navigate("Login");
    } else {
      Alert.alert("Invalid OTP", "The OTP entered is incorrect. Please try again.");
    }
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

      {/* OTP Modal Dialog */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP</Text>

            {/* OTP Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#888"
              value={otp}
              onChangeText={(text) => setOtp(text)}
              keyboardType="numeric"
            />

            {/* Timer */}
            <Text style={styles.timerText}>Time Remaining: {timer}s</Text>

            {/* Verify OTP Button */}
            <TouchableOpacity style={styles.registerButton} onPress={handleVerifyOtp}>
              <Text style={styles.registerButtonText}>Verify OTP</Text>
            </TouchableOpacity>

            {/* Resend OTP Link */}
            {timer === 0 && (
              <TouchableOpacity onPress={() => setTimer(60)}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay background
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  resendText: {
    color: "#259D8A",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;

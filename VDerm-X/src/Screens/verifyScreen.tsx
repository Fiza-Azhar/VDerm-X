import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const VerifyScreen = ({ navigation }: any) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]); // For a 5-digit OTP
  const inputs = useRef<Array<TextInput | null>>([]); // Use refs for all input fields

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);

    // Simulated OTP validation logic
    if (enteredOtp === "25003") {
      Alert.alert("Success", "OTP Verified!");
      navigation.navigate("Login"); // Navigate to LoginScreen
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = () => {
    Alert.alert("OTP Resent", "A new OTP has been sent to your email.");
  };

  const handleInputChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent multiple characters in one input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input field
    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus(); // Focus on the next input
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>OTP Verification</Text>
        <Text style={styles.subText}>
          Please enter your correct OTP for number verification process.
        </Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)} // Assign refs dynamically
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            autoFocus={index === 0} // Autofocus only on the first input
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResendOtp}>
        <Text style={styles.resendOtp}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F6F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1D7874",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#259D8A",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  verifyButton: {
    backgroundColor: "#259D8A",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resendOtp: {
    marginTop: 15,
    color: "#259D8A",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default VerifyScreen;

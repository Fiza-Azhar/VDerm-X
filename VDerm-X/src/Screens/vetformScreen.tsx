/*import React, { useEffect, useRef, useState } from "react";
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

const VetFormScreen = ({ navigation }: any) => {
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [qualification, setQualification] = useState("");

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(formOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(formTranslateY, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const handleVetFormSubmit = async () => {
    if (!username || !email || !password || !phoneNumber || !licenseNumber || !qualification) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Add any additional validation or backend logic here if needed

   try {
           const response = await fetch(`${BASE_URL}/vets/createvets`, {
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
        <Text style={styles.title}>Veterinarian Registration</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="License Number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Qualification"
          value={qualification}
          onChangeText={setQualification}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleVetFormSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
  submitButton: { backgroundColor: "#259D8A", paddingVertical: 15, borderRadius: 8, alignItems: "center" },
  submitButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "600" },
});

export default VetFormScreen;
*/
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
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../config";

const VetFormScreen = ({ navigation }: any) => {
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [area, setarea] = useState("");
  const [qualification, setQualification] = useState("");
  const [availability, setAvailability] = useState("");
  const [imageurl, setProfileImage] = useState<any>(null);
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(formOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(formTranslateY, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const pickImage = async (setter: React.Dispatch<React.SetStateAction<any>>) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setter(result.assets[0]);
    }
  };

  const handleVetFormSubmit = async () => {
    if (!username || !email || !password || !phoneNumber || !area || !qualification) {
      Alert.alert("Error", "All fields are required except availability.");
      return;
    }
  
    setLoading(true); // Start loading
    console.log("Submitting form..."); // Debugging log
  
    const formData = new FormData();
  
    formData.append("name", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("contact", phoneNumber);
    formData.append("qualification", qualification);
    formData.append("area", area);
  
    if (availability) {
      formData.append("availability", availability);
    }
  
   if (certificate) {
  formData.append("certificate", {
    uri: certificate.uri,
    type: "image/jpeg",
    name: "certificate.jpg",
  }as any);
}


if (imageurl) {
  formData.append("imageUrl", {
    uri: imageurl.uri,
    type: "image/jpeg",
    name: "profile.jpg",
  }as any);
}

  
    try {
      console.log("Sending form data to:", `${BASE_URL}/vets/createvets`);
      const response = await fetch(`${BASE_URL}/vets/createvets`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Form submitted successfully:", data);
        Alert.alert("Success", "Vet registration completed successfully. Wait for our email to successfully registering as Vet.");
        navigation.navigate("Home");
      } else {
        console.error("Error response from server:", data);
        Alert.alert("Error", data.message || "Failed to register vet.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
      console.log("Loading state reset");
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Text style={styles.title}>Veterinarian Registration</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Area"
            value={area}
            onChangeText={setarea}
          />
          <TextInput
            style={styles.input}
            placeholder="Qualification"
            value={qualification}
            onChangeText={setQualification}
          />
          <TextInput
            style={styles.input}
            placeholder="Availability (e.g., 9:00 AM - 5:00 PM)"
            value={availability}
            onChangeText={setAvailability}
          />

          <Button title="Upload Profile Image" onPress={() => pickImage(setProfileImage)} />
          {imageurl && <Text style={styles.uploadText}>Profile Image Uploaded</Text>}

          <Button title="Upload Certificate" onPress={() => pickImage(setCertificate)} />
          {certificate && <Text style={styles.uploadText}>Certificate Uploaded</Text>}

          <TouchableOpacity
            style={[styles.submitButton, loading && { backgroundColor: "#b5e3d9" }]}
            onPress={loading ? undefined : handleVetFormSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#F7F8FA" },
  logoContainer: { marginBottom: 30 },
  logo: { width: 120, height: 120, resizeMode: "contain" },
  formContainer: { width: "100%", padding: 20, backgroundColor: "#FFFFFF", borderRadius: 10 },
  title: { fontSize: 22, fontWeight: "700", color: "#333", textAlign: "center", marginBottom: 20 },
  input: { height: 50, backgroundColor: "#F2F2F2", borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  submitButton: { backgroundColor: "#259D8A", paddingVertical: 15, borderRadius: 8, alignItems: "center" },
  submitButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "600" },
  uploadText: { marginVertical: 10, color: "#259D8A" },
});

export default VetFormScreen;

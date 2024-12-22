import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "../config";

const DiagnosticScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  const handleImagePick = async (type: "camera" | "gallery") => {
    try {
      // Request permissions if not already granted
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraPermission.status !== "granted" || libraryPermission.status !== "granted") {
        Alert.alert("Permission Denied", "We need permission to access your camera and gallery.");
        return;
      }

      let result;
      if (type === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Using the valid `MediaTypeOptions.Images`
          quality: 0.8, // Sets the image quality
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.8, // Sets the image quality
        });
      }

      if (!result.canceled) {
        // Normalize the URI for consistency
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred while selecting the image.");
      console.error(error);
    }
  };

  const uploadImageToAPI = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage,
      name: "image.jpg", // Modify if necessary
      type: "image/jpeg",
    } as any);

    setLoading(true); // Set loading to true when upload starts

    try {
      const response = await fetch(`${BASE_URL}/images/predicts`, {
        method: 'POST',
        body: formData, // Don't stringify FormData
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", JSON.stringify(data)); // Display the response data
      } else {
        Alert.alert("Error", data.message || "An error occurred.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload the image.");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when the upload completes
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={() => handleImagePick("camera")} />
      <Button title="Choose from Gallery" onPress={() => handleImagePick("gallery")} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}
      
      {/* Show loading spinner when uploading */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Upload Image" onPress={uploadImageToAPI} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 16,
    borderRadius: 10,
  },
});

export default DiagnosticScreen;

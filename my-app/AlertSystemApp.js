// AlertSystemApp.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const AlertSystemApp = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = () => {
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
      if (!response.didCancel) {
        setSelectedImage(response.uri);
      }
    });
  };

  const handleAlertSubmit = () => {
    // Logic to handle alert submission, such as sending it to a server
    console.log('Alert submitted:', alertMessage);
    console.log('Image:', selectedImage);
    // You can add further logic here, such as sending the alert message and image to a server or showing a confirmation message
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alert System</Text>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter your alert message"
        onChangeText={(text) => setAlertMessage(text)}
        value={alertMessage}
        multiline={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleAlertSubmit}>
        <Text style={styles.buttonText}>Submit Alert</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffebcd', 
  },
  input: {
    
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 60,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8b0000', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#8b0000', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
});

export default AlertSystemApp;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const AlertSystemApp = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Load the model when the component mounts
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      // Replace 'model.json' and 'weights.bin' with the actual paths to your model.json and weights.bin files
      const modelJSON = require('./my-app/assets/model.json');
      const modelWeights = require('./my-app/assets/group1-shard1of23.bin');

      const loadedModel = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights));
      setModel(loadedModel);
    } catch (error) {
      console.error('Error loading the model:', error);
    }
  };

  const handleImageUpload = () => {
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
      if (!response.didCancel) {
        setSelectedImage(response.uri);
      }
    });
  };

  const handleAlertSubmit = async () => {
    if (!model) {
      console.error('Model not loaded');
      return;
    }

    try {
      const imageTensor = await preprocessImage(selectedImage);
      const predictions = model.predict(imageTensor);
      
      // Process predictions as needed
      predictions.print();

      // Cleanup
      tf.dispose([imageTensor, predictions]);
    } catch (error) {
      console.error('Error making predictions:', error);
    }

    // Further logic for handling the alert submission
    console.log('Alert submitted:', alertMessage);
    console.log('Image:', selectedImage);
  };

  const preprocessImage = async (uri) => {
    // Preprocess the image before feeding it to the model
    const image = await tf.browser.fromPixels({ uri });
    const resizedImage = tf.image.resizeBilinear(image, [your_target_height, your_target_width]);
    const expandedImage = resizedImage.expandDims(0);
    
    // Normalize the pixel values to the range [0, 1]
    const normalizedImage = expandedImage.div(255.0);

    // Cleanup
    tf.dispose([image, resizedImage, expandedImage]);

    return normalizedImage;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alert System</Text>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.buttonText}>Upload Image</Text>
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
    fontFamily: 'Roboto', // Change this to your desired font family
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
    fontSize: 20,
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
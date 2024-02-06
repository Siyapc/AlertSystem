import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import AlertSystemApp from './AlertSystemApp'; // Assuming both files are in the same directory

export default function App() {
  return (
    <ImageBackground source={require('./image1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <AlertSystemApp />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
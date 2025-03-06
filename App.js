import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Data from './data';
import HomeScreen from './src/boutique';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black', 
  },
});

export default App;
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const products = [
  { id: '1', name: 'Produit 1', price: '10€', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Produit 2', price: '15€', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Produit 3', price: '20€', image: 'https://via.placeholder.com/100' },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <View style={styles.container}>
      {selectedProduct ? (
        <View style={styles.detailContainer}>
          <Image source={{ uri: selectedProduct.image }} style={styles.image} />
          <Text style={styles.title}>{selectedProduct.name}</Text>
          <Text style={styles.price}>{selectedProduct.price}</Text>
          <TouchableOpacity onPress={() => setSelectedProduct(null)} style={styles.button}>
            <Text style={styles.buttonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedProduct(item)} style={styles.product}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  product: { padding: 20, backgroundColor: 'white', marginVertical: 10, borderRadius: 10, alignItems: 'center' },
  image: { width: 100, height: 100, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'gray' },
  detailContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { marginTop: 20, padding: 10, backgroundColor: 'blue', borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16 },
});

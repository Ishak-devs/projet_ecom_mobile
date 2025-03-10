import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://172.16.18.40/ecomishak/api.php')
      .then((response) => response.json())
      .then((json) => {
        if (json.success && json.data) {
          setProducts(json.data);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Chargement des produits...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Boutique</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={products.filter(product =>
          product.nom_produit.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.produit_id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Image source={{ uri: item.image_url || 'https://via.placeholder.com/100' }} style={styles.productImage} />
            <Text style={styles.productName}>{item.nom_produit}</Text>
            <Text style={styles.productPrice}>{item.prix}€</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Insta</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, backgroundColor: '#6200ee', alignItems: 'center' },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  searchContainer: { padding: 10, backgroundColor: '#fff' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 },
  productCard: { flex: 1, margin: 5, backgroundColor: '#fff', borderRadius: 5, padding: 10, alignItems: 'center' },
  productImage: { width: 100, height: 100, resizeMode: 'cover' },
  productName: { fontSize: 16, marginTop: 10, textAlign: 'center' },
  productPrice: { fontSize: 14, color: '#6200ee', marginTop: 5, fontWeight: 'bold' },
  footer: { padding: 10, backgroundColor: '#6200ee', alignItems: 'center' },
  footerText: { color: '#fff', fontSize: 12 },
  errorText: { color: 'red', fontSize: 18, textAlign: 'center' }
});

export default HomeScreen;

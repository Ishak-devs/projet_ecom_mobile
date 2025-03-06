import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // Tous les produits
  const [searchQuery, setSearchQuery] = useState(''); // Valeur de la recherche
  const [filteredProducts, setFilteredProducts] = useState([]); // Produits filtrés
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Charger les produits depuis l'API
  useEffect(() => {
    fetch('http://172.16.18.40/ecomishak/api.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        return response.json();
      })
      .then((json) => {
        setProducts(json.produits); // Stocker tous les produits
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filtrer les produits en fonction de la recherche
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.nom_produit.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Réinitialiser les suggestions si la recherche est vide
    }
  }, [searchQuery, products]);

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
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenue sur notre boutique</Text>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Suggestions de recherche */}
      {searchQuery && (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.produit_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>{item.nom_produit}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      )}

      {/* Liste des produits (affichage principal) */}
      <FlatList
        data={products.slice(0, 4)} // Afficher seulement les 4 premiers produits
        keyExtractor={(item) => item.produit_id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Image
              source={{ uri: 'images/1.jpg' }} 
              style={styles.productImage}
            />
            <Text style={styles.productName}>{item.nom_produit}</Text>
            <Text style={styles.productPrice}>{item.prix}€</Text>
          </TouchableOpacity>
        )}
      />

      {/* Pied de page */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Mon E-commerce</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  suggestionsList: {
    maxHeight: 200, // Limiter la hauteur de la liste des suggestions
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 3, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#6200ee',
    marginTop: 5,
    fontWeight: 'bold',
  },
  footer: {
    padding: 10,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
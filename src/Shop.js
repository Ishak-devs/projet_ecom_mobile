import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export function Shop({ navigation }) {
  // Mes états perso pour la gestion des données
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Ma fonction pour charger mes produits
  const fetchMyProducts = () => {
    setRefreshing(true);
    fetch('http://172.16.19.86/ecomishak/api.php')
      .then((response) => response.json())
      .then((json) => {
        if (json.success && json.data) {
          setProducts(json.data);
        } else {
          setError('Aucun produit disponible');
        }
      })
      .catch((error) => {
        setError(`Erreur: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  // Je charge mes produits au démarrage
  useEffect(() => {
    fetchMyProducts();
  }, []);

  // Mon écran de chargement perso
  if (loading) {
    return (
      <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Chargement de mes produits...</Text>
      </LinearGradient>
    );
  }

  // Mon écran d'erreur perso
  if (error) {
    return (
      <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.errorContainer}>
        <Ionicons name="warning-outline" size={50} color="#e74c3c" />
        <Text style={styles.errorText}>Oups! {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchMyProducts}
        >
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.mainContainer}>
      {/* Mon header personnalisé */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ma Boutique</Text>
        <TouchableOpacity 
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Ma barre de recherche perso */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#95a5a6" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher mes produits..."
          placeholderTextColor="#95a5a6"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Ma liste de produits */}
      <FlatList
        data={products.filter(product =>
          product.nom_produit.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.produit_id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchMyProducts}
            colors={['#000000']}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image
              source={{ uri: item.image_url || 'https://via.placeholder.com/300' }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.nom_produit}
              </Text>
              <Text style={styles.productPrice}>{item.prix}€</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Ajouter</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

// Mes styles personnalisés
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7f8c8d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 15,
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  cartIcon: {
    padding: 5,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: '#2c3e50',
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2c3e50',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { 
  Card, 
  Button, 
  Searchbar,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FavoritesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Smartphone Pro',
      price: 799.99,
      image: 'https://via.placeholder.com/300/FF6B6B/FFFFFF?text=Smartphone',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Casque Audio',
      price: 199.99,
      image: 'https://via.placeholder.com/300/4ECDC4/FFFFFF?text=Casque',
      rating: 4.2,
    },
    {
      id: 3,
      name: 'Montre Connectée',
      price: 249.99,
      image: 'https://via.placeholder.com/300/FFE66D/000000?text=Montre',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Enceinte Bluetooth',
      price: 129.99,
      image: 'https://via.placeholder.com/300/6B66FF/FFFFFF?text=Enceinte',
      rating: 4.0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [removedItem, setRemovedItem] = useState(null);

  const removeFromFavorites = (id) => {
    const itemToRemove = favorites.find(item => item.id === id);
    setRemovedItem(itemToRemove);
    setFavorites(favorites.filter(item => item.id !== id));
    setSnackbarVisible(true);
  };

  const undoRemove = () => {
    if (removedItem) {
      setFavorites([...favorites, removedItem]);
      setRemovedItem(null);
    }
    setSnackbarVisible(false);
  };

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Rechercher dans les favoris..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#FF6B6B"
        />
      </View>

      {filteredFavorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike" size={60} color="#E0E0E0" />
          <Text style={styles.emptyTitle}>Aucun favori</Text>
          <Text style={styles.emptyText}>
            {searchQuery ? 'Aucun résultat pour votre recherche' : 'Ajoutez des produits à vos favoris pour les retrouver facilement'}
          </Text>
          {!searchQuery && (
            <Button 
              mode="contained" 
              style={styles.shopButton}
              onPress={() => navigation.navigate('Home')}
            >
              Explorer les produits
            </Button>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          renderItem={({ item }) => (
            <Card style={styles.favoriteCard} elevation={2}>
              <TouchableOpacity 
                style={styles.favoriteItem}
                onPress={() => navigation.navigate('Product', { product: item })}
              >
                <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                <View style={styles.favoriteDetails}>
                  <Text style={styles.favoriteName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.favoriteFooter}>
                    <Text style={styles.favoritePrice}>${item.price.toFixed(2)}</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeFromFavorites(item.id)}
                >
                  <Ionicons name="trash" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </TouchableOpacity>
            </Card>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.favoritesList}
        />
      )}

      {/* Snackbar for undo */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
        action={{
          label: 'Annuler',
          onPress: undoRemove,
        }}
      >
        Retiré des favoris
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF7',
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292F36',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    maxWidth: 300,
  },
  shopButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
  },
  favoritesList: {
    padding: 16,
  },
  favoriteCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  favoriteImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292F36',
    marginBottom: 8,
  },
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#292F36',
    marginLeft: 4,
  },
  removeButton: {
    padding: 8,
    marginLeft: 12,
  },
  snackbar: {
    backgroundColor: '#FF6B6B',
    marginBottom: 16,
  },
});

export default FavoritesScreen;
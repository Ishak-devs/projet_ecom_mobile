import React, { useState, useEffect } from 'react';
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
  Searchbar, 
  Chip, 
  Card, 
  ActivityIndicator,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Smartphone',
    'Casque audio',
    'Montre connectée',
    'T-shirt',
  ]);

  const categories = [
    { id: 'all', name: 'Tout' },
    { id: 'electronics', name: 'Électronique' },
    { id: 'fashion', name: 'Mode' },
    { id: 'home', name: 'Maison' },
    { id: 'beauty', name: 'Beauté' },
  ];

  const products = [
    {
      id: 1,
      name: 'Smartphone Pro',
      price: 799.99,
      image: 'https://via.placeholder.com/300/FF6B6B/FFFFFF?text=Smartphone',
      rating: 4.5,
      category: 'electronics',
    },
    {
      id: 2,
      name: 'Casque Audio',
      price: 199.99,
      image: 'https://via.placeholder.com/300/4ECDC4/FFFFFF?text=Casque',
      rating: 4.2,
      category: 'electronics',
    },
    {
      id: 3,
      name: 'Montre Connectée',
      price: 249.99,
      image: 'https://via.placeholder.com/300/FFE66D/000000?text=Montre',
      rating: 4.7,
      category: 'electronics',
    },
    {
      id: 4,
      name: 'T-shirt Classique',
      price: 29.99,
      image: 'https://via.placeholder.com/300/6B66FF/FFFFFF?text=T-shirt',
      rating: 4.0,
      category: 'fashion',
    },
  ];

const filteredProducts = activeCategory === 'all' 
  ? products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : products.filter(product => 
      product.category === activeCategory && 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      // Simulate search API call
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [searchQuery, activeCategory]);

  const renderProductItem = ({ item }) => (
    <Card style={styles.productCard} elevation={2}>
      <TouchableOpacity onPress={() => navigation.navigate('Product', { product: item })}>
        <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
        <Card.Content style={styles.productContent}>
          <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </Card.Content>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FF6B6B" />
        </TouchableOpacity>
        <Searchbar
          placeholder="Rechercher des produits..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#FF6B6B"
          onSubmitEditing={() => {}}
          autoFocus={!route.params?.query}
        />
      </View>

      {!searchQuery ? (
        <ScrollView contentContainerStyle={styles.recentSearchesContainer}>
          <Text style={styles.sectionTitle}>Recherches récentes</Text>
          <View style={styles.recentSearchesList}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => setSearchQuery(search)}
              >
                <Ionicons name="time" size={20} color="#A0A0A0" style={styles.recentSearchIcon} />
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Suggestions</Text>
          <View style={styles.suggestionsContainer}>
            <Chip
              mode="outlined"
              style={styles.suggestionChip}
              textStyle={styles.suggestionChipText}
              onPress={() => setSearchQuery('Smartphone')}
            >
              Smartphone
            </Chip>
            <Chip
              mode="outlined"
              style={styles.suggestionChip}
              textStyle={styles.suggestionChipText}
              onPress={() => setSearchQuery('Ordinateur portable')}
            >
              Ordinateur portable
            </Chip>
            <Chip
              mode="outlined"
              style={styles.suggestionChip}
              textStyle={styles.suggestionChipText}
              onPress={() => setSearchQuery('Chaussures')}
            >
              Chaussures
            </Chip>
            <Chip
              mode="outlined"
              style={styles.suggestionChip}
              textStyle={styles.suggestionChipText}
              onPress={() => setSearchQuery('Sac à main')}
            >
              Sac à main
            </Chip>
          </View>
        </ScrollView>
      ) : (
        <>
          {/* Categories Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <Chip
                key={category.id}
                mode="outlined"
                selected={activeCategory === category.id}
                onPress={() => setActiveCategory(category.id)}
                style={[
                  styles.categoryChip,
                  activeCategory === category.id && styles.selectedCategoryChip,
                ]}
                textStyle={[
                  styles.categoryChipText,
                  activeCategory === category.id && styles.selectedCategoryChipText,
                ]}
              >
                {category.name}
              </Chip>
            ))}
          </ScrollView>

          {/* Search Results */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true} color="#FF6B6B" size="large" />
            </View>
          ) : filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.productsRow}
              contentContainerStyle={styles.productsContainer}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search" size={60} color="#E0E0E0" />
              <Text style={styles.noResultsText}>Aucun résultat pour "{searchQuery}"</Text>
              <Text style={styles.noResultsSubText}>Essayez avec d'autres termes de recherche</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    marginRight: 12,
  },
  searchBar: {
    flex: 1,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  recentSearchesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292F36',
    marginBottom: 16,
  },
  recentSearchesList: {
    marginBottom: 24,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recentSearchIcon: {
    marginRight: 12,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#292F36',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  suggestionChip: {
    margin: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  suggestionChipText: {
    fontSize: 14,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryChip: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  selectedCategoryChip: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  categoryChipText: {
    fontSize: 14,
  },
  selectedCategoryChipText: {
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsContainer: {
    padding: 8,
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  productCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    height: 120,
  },
  productContent: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292F36',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#292F36',
    marginLeft: 4,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292F36',
    marginTop: 16,
    textAlign: 'center',
  },
  noResultsSubText: {
    fontSize: 16,
    color: '#A0A0A0',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SearchScreen;
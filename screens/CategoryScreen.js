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
  Searchbar, 
  Chip, 
  Card, 
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CategoryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'Tout' },
    { id: 'electronics', name: 'Électronique' },
    { id: 'fashion', name: 'Mode' },
    { id: 'home', name: 'Maison' },
    { id: 'beauty', name: 'Beauté' },
    { id: 'sports', name: 'Sports' },
    { id: 'toys', name: 'Jouets' },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Populaire' },
    { id: 'newest', name: 'Nouveautés' },
    { id: 'price-low', name: 'Prix croissant' },
    { id: 'price-high', name: 'Prix décroissant' },
    { id: 'rating', name: 'Meilleures notes' },
  ];

  const products = [
    {
      id: 1,
      name: 'Smartphone Pro',
      price: 799.99,
      image: 'https://via.placeholder.com/300/FF6B6B/FFFFFF?text=Smartphone',
      rating: 4.5,
      category: 'electronics',
      isNew: true,
    },
    {
      id: 2,
      name: 'Casque Audio',
      price: 199.99,
      image: 'https://via.placeholder.com/300/4ECDC4/FFFFFF?text=Casque',
      rating: 4.2,
      category: 'electronics',
      isNew: false,
    },
    {
      id: 3,
      name: 'Montre Connectée',
      price: 249.99,
      image: 'https://via.placeholder.com/300/FFE66D/000000?text=Montre',
      rating: 4.7,
      category: 'electronics',
      isNew: true,
    },
    {
      id: 4,
      name: 'T-shirt Classique',
      price: 29.99,
      image: 'https://via.placeholder.com/300/6B66FF/FFFFFF?text=T-shirt',
      rating: 4.0,
      category: 'fashion',
      isNew: false,
    },
    {
      id: 5,
      name: 'Chaussures de Sport',
      price: 89.99,
      image: 'https://via.placeholder.com/300/FFA5A5/000000?text=Chaussures',
      rating: 4.3,
      category: 'fashion',
      isNew: true,
    },
    {
      id: 6,
      name: 'Lampe de Bureau',
      price: 49.99,
      image: 'https://via.placeholder.com/300/4ECDC4/FFFFFF?text=Lampe',
      rating: 4.1,
      category: 'home',
      isNew: false,
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const loadMoreProducts = () => {
    setLoading(true);
    // Simulate loading more products
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const renderProductItem = ({ item }) => (
    <Card style={styles.productCard} elevation={2}>
      <TouchableOpacity onPress={() => navigation.navigate('Product', { product: item })}>
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>Nouveau</Text>
          </View>
        )}
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
        <Searchbar
          placeholder="Rechercher dans cette catégorie..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#FF6B6B"
          onIconPress={() => {}}
          onSubmitEditing={() => {}}
        />
      </View>

      {/* Categories Filter */}
      <View style={styles.section}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <Chip
              key={category.id}
              mode="outlined"
              selected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.selectedCategoryChip,
              ]}
              textStyle={[
                styles.categoryChipText,
                selectedCategory === category.id && styles.selectedCategoryChipText,
              ]}
            >
              {category.name}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Sort Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trier par:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortOptionsContainer}
        >
          {sortOptions.map((option) => (
            <Chip
              key={option.id}
              mode="outlined"
              selected={sortBy === option.id}
              onPress={() => setSortBy(option.id)}
              style={[
                styles.sortChip,
                sortBy === option.id && styles.selectedSortChip,
              ]}
              textStyle={[
                styles.sortChipText,
                sortBy === option.id && styles.selectedSortChipText,
              ]}
            >
              {option.name}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      <FlatList
        data={sortedProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productsRow}
        contentContainerStyle={styles.productsContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={60} color="#E0E0E0" />
            <Text style={styles.emptyText}>Aucun produit trouvé</Text>
          </View>
        }
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true} color="#FF6B6B" />
            </View>
          ) : (
            <Button 
              mode="outlined" 
              style={styles.loadMoreButton}
              onPress={loadMoreProducts}
            >
              Charger plus
            </Button>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF7',
    paddingTop: 10,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292F36',
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingRight: 16,
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
  sortOptionsContainer: {
    paddingRight: 16,
  },
  sortChip: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  selectedSortChip: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  sortChipText: {
    fontSize: 14,
  },
  selectedSortChipText: {
    color: '#FFFFFF',
  },
  productsContainer: {
    paddingHorizontal: 8,
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
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#A0A0A0',
    marginTop: 16,
  },
  loadingContainer: {
    padding: 20,
  },
  loadMoreButton: {
    margin: 16,
    borderColor: '#FF6B6B',
  },
});

export default CategoryScreen;
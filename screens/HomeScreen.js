import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import { Card, Button, Searchbar, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollX = new Animated.Value(0);
  const [loading, setLoading] = useState(true);

  // Mock data
  const banners = [
    { id: 1, image: 'https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=Summer+Sale' },
    { id: 2, image: 'https://via.placeholder.com/800x400/4ECDC4/FFFFFF?text=New+Arrivals' },
    { id: 3, image: 'https://via.placeholder.com/800x400/FFE66D/000000?text=Limited+Offer' },
  ];

  const categories = [
    { id: 1, name: 'Électronique', icon: 'phone-portrait', image: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=E' },
    { id: 2, name: 'Mode', icon: 'shirt', image: 'https://via.placeholder.com/150/4ECDC4/FFFFFF?text=F' },
    { id: 3, name: 'Maison', icon: 'home', image: 'https://via.placeholder.com/150/FFE66D/000000?text=H' },
    { id: 4, name: 'Beauté', icon: 'flower', image: 'https://via.placeholder.com/150/6B66FF/FFFFFF?text=B' },
  ];

  const products = [
    {
      id: 1,
      name: 'Smartphone Pro',
      price: 799.99,
      image: 'https://via.placeholder.com/300/FF6B6B/FFFFFF?text=Smartphone',
      rating: 4.5,
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Casque Audio',
      price: 199.99,
      image: 'https://via.placeholder.com/300/4ECDC4/FFFFFF?text=Casque',
      rating: 4.2,
      isFavorite: true,
    },
    {
      id: 3,
      name: 'Montre Connectée',
      price: 249.99,
      image: 'https://via.placeholder.com/300/FFE66D/000000?text=Montre',
      rating: 4.7,
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Enceinte Bluetooth',
      price: 129.99,
      image: 'https://via.placeholder.com/300/6B66FF/FFFFFF?text=Enceinte',
      rating: 4.0,
      isFavorite: false,
    },
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const renderBannerItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Category', { categoryId: item.id })}
      >
        <Animated.View style={[styles.bannerContainer, { transform: [{ scale }] }]}>
          <Image source={{ uri: item.image }} style={styles.bannerImage} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', { categoryId: item.id })}
    >
      <View style={styles.categoryIconContainer}>
        <Ionicons name={item.icon} size={24} color="#FFF" />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <Card style={styles.productCard} elevation={2}>
      <TouchableOpacity onPress={() => navigation.navigate('Product', { product: item })}>
        <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
        <Card.Content style={styles.productContent}>
          <View style={styles.productHeader}>
            <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name={item.isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={item.isFavorite ? '#FF6B6B' : '#A0A0A0'}
              />
            </TouchableOpacity>
          </View>
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#FF6B6B" size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Rechercher des produits..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#FF6B6B"
          onIconPress={() => navigation.navigate('Search', { query: searchQuery })}
          onSubmitEditing={() => navigation.navigate('Search', { query: searchQuery })}
        />
      </View>

      {/* Banner Slider */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Offres spéciales</Text>
        <View style={styles.bannerSlider}>
          <FlatList
            data={banners}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          />
          <View style={styles.pagination}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeSlide && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Popular Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Produits populaires</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Category', { categoryId: 'all' })}>
            <Text style={styles.seeAll}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
        />
      </View>

      {/* Recommended for You */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommandé pour vous</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.seeAll}>Plus</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recommendedContainer}>
          {products.slice(0, 2).map((product) => (
            <Card key={product.id} style={styles.recommendedCard} elevation={2}>
              <TouchableOpacity onPress={() => navigation.navigate('Product', { product })}>
                <Card.Cover source={{ uri: product.image }} style={styles.recommendedImage} />
                <Card.Content style={styles.recommendedContent}>
                  <Text style={styles.recommendedTitle} numberOfLines={1}>{product.name}</Text>
                  <Text style={styles.recommendedPrice}>${product.price.toFixed(2)}</Text>
                </Card.Content>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF7',
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FFF7',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292F36',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  bannerSlider: {
    height: 180,
    marginBottom: 8,
  },
  bannerContainer: {
    width: width - 32,
    height: 180,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FF6B6B',
    width: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#292F36',
  },
  productsList: {
    paddingHorizontal: 16,
  },
  productCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    height: 140,
  },
  productContent: {
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292F36',
    flex: 1,
    marginRight: 8,
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
  recommendedContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  recommendedCard: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recommendedImage: {
    height: 120,
  },
  recommendedContent: {
    padding: 12,
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#292F36',
    marginBottom: 4,
  },
  recommendedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});

export default HomeScreen;
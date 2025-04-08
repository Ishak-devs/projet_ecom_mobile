import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export function ExploreScreen({ navigation }) {
  // Mes catégories de produits
  const [categories] = useState([
    { id: '1', name: 'Nouveautés', icon: 'sparkles' },
    { id: '2', name: 'Running', icon: 'walk' },
    { id: '3', name: 'Basketball', icon: 'basketball' },
    { id: '4', name: 'Training', icon: 'barbell' },
    { id: '5', name: 'Promotions', icon: 'pricetag' },
  ]);

  // Mes produits tendances
  const [trendingProducts] = useState([
    { id: '1', name: 'Air Max 270', price: '159€', image: 'https://source.unsplash.com/random/300x300?sneaker1' },
    { id: '2', name: 'Ultraboost 22', price: '179€', image: 'https://source.unsplash.com/random/300x300?sneaker2' },
    { id: '3', name: 'Jordan Retro', price: '199€', image: 'https://source.unsplash.com/random/300x300?sneaker3' },
    { id: '4', name: 'Free Run', price: '129€', image: 'https://source.unsplash.com/random/300x300?sneaker4' },
  ]);

  return (
    <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.screenContainer}>
      {/* Mon header explore avec barre de recherche */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Explorer</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Mes catégories favorites */}
      <Text style={styles.sectionTitle}>Mes Catégories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Category', { category: category.name })}
          >
            <Ionicons name={category.icon} size={28} color="#000" />
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Les produits du moment */}
      <Text style={styles.sectionTitle}>Tendances du Moment</Text>
      <FlatList
        data={trendingProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.productListWrapper}
      />

      {/* Ma section éditoriale */}
      <Text style={styles.sectionTitle}>Sélection Éditoriale</Text>
      <TouchableOpacity style={styles.editorialCard}>
        <Image 
          source={{ uri: 'https://source.unsplash.com/random/600x300?sneaker-editorial' }} 
          style={styles.editorialImage}
        />
        <Text style={styles.editorialTitle}>Les Essentiels de la Saison</Text>
        <Text style={styles.editorialSubtitle}>Découvrez notre sélection</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// Mes styles perso pour l'exploration
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  searchButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    marginTop: 10,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryCard: {
    width: 100,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    padding: 10,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  productListWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 12,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  editorialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  editorialImage: {
    width: '100%',
    height: 150,
  },
  editorialTitle: {
    position: 'absolute',
    bottom: 40,
    left: 15,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  editorialSubtitle: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export function FavoritesScreen({ navigation }) {
  return (
    <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.screenContainer}>
      {/* Mon header favoris avec titre */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Mes Favoris</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Mes articles sauvegardés */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.favoriteItem}>
            <Image
              source={{ uri: `https://source.unsplash.com/random/200x200?sneaker&${item}` }}
              style={styles.productImage}
            />
            
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Mon produit favori {item}</Text>
              <Text style={styles.productPrice}>{(item * 79).toFixed(2)}€</Text>
              
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="cart-outline" size={18} color="black" />
                  <Text style={styles.actionText}>Ajouter</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={18} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Mon bouton pour continuer le shopping */}
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={() => navigation.navigate('Explore')}
      >
        <Text style={styles.continueButtonText}>DÉCOUVRIR PLUS D'ARTICLES</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// Mes styles perso pour les favoris
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
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 12,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 6,
    alignSelf: 'flex-end',
  },
  continueButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
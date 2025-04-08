import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen({ navigation }) {
  return (
    <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.screenContainer}>
      {/* Mon header perso avec icône notifs */}
      <View style={styles.header}>
        <Text style={styles.brandText}>ELITE</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Ma bannière phare cliquable */}
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('NewCollection')}
      >
        <LinearGradient colors={['#000000', '#333333']} style={styles.heroBanner}>
          <Text style={styles.heroText}>NOUVELLE COLLECTION</Text>
          <Text style={styles.heroSubText}>Découvrez l'innovation 2024 →</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Mes produits tendances en scroll horizontal */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TENDANCES DU MOMENT</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>VOIR TOUT</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { id: 1, name: 'Air Max Plus', price: '149€', color: '#FF5E57' },
            { id: 2, name: 'Ultraboost', price: '179€', color: '#2E86DE' },
            { id: 3, name: 'Retro OG', price: '129€', color: '#10AC84' },
          ].map(item => (
            <TouchableOpacity key={item.id} style={[styles.trendingCard, { backgroundColor: item.color }]}>
              <Text style={styles.trendingName}>{item.name}</Text>
              <Text style={styles.trendingPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Mes catégories préférées */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PARCOURIR PAR CATÉGORIE</Text>
        <View style={styles.categoryContainer}>
          {['Running', 'Training', 'Football', 'Basketball'].map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Ma promo membre perso */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>MEMBRE EXCLUSIF? 20% DE RÉDUCTION</Text>
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>DEVENIR MEMBRE</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// Mes styles perso
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
  brandText: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroBanner: {
    height: 180,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    marginBottom: 25,
    elevation: 5,
  },
  heroText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },
  heroSubText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  seeAll: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  trendingCard: {
    width: 150,
    height: 180,
    borderRadius: 10,
    padding: 15,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  trendingName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  trendingPrice: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  promoBanner:{
     backgroundColor:'#000'
     //... 
   }
});

export default HomeScreen;

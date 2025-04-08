import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export function ProfileScreen() {
  return (
    <LinearGradient colors={['#ffffff', '#f8f8f8']} style={styles.screenContainer}>
      {/* Mon header profil avec photo */}
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileMember}>Membre ELITE depuis 2023</Text>
      </View>

      {/* Mes stats perso */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Commandes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>128</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Favoris</Text>
        </View>
      </View>

      {/* Mes options de profil */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Informations personnelles</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="card-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Moyens de paiement</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="location-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Adresses</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Paramètres</Text>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Mon bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// Mes styles perso pour le profil
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#000',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },
  profileMember: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 3,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
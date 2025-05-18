import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { 
  Card, 
  Button, 
  Divider, 
  List, 
  Avatar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    avatar: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=JD',
    orders: 5,
    memberSince: '2022-01-15',
  };

  const menuItems = [
    { icon: 'cart', title: 'Mes commandes', screen: 'Orders' },
    { icon: 'heart', title: 'Mes favoris', screen: 'Favorites' },
    { icon: 'location', title: 'Adresses', screen: 'Addresses' },
    { icon: 'card', title: 'Moyens de paiement', screen: 'PaymentMethods' },
    { icon: 'settings', title: 'Paramètres', screen: 'Settings' },
    { icon: 'help-circle', title: 'Aide & Support', screen: 'Help' },
    { icon: 'log-out', title: 'Déconnexion', action: () => {} },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Avatar.Image 
            source={{ uri: user.avatar }} 
            size={100} 
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.orders}</Text>
            <Text style={styles.statLabel}>Commandes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Membre depuis</Text>
            <Text style={styles.statLabel}>{user.memberSince}</Text>
          </View>
        </View>
      </View>

      {/* Profile Actions */}
      <Card style={styles.actionCard}>
        <Card.Content>
          <Button 
            mode="contained" 
            style={styles.editProfileButton}
            labelStyle={styles.editProfileButtonText}
            onPress={() => navigation.navigate('EditProfile')}
          >
            Modifier le profil
          </Button>
        </Card.Content>
      </Card>

      {/* Menu Items */}
      <Card style={styles.menuCard}>
        <Card.Content>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <List.Item
                title={item.title}
                left={() => <List.Icon icon={item.icon} color="#FF6B6B" />}
                right={() => <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />}
                onPress={() => item.screen ? navigation.navigate(item.screen) : item.action()}
                titleStyle={styles.menuItemTitle}
                style={styles.menuItem}
              />
              {index < menuItems.length - 1 && <Divider style={styles.divider} />}
            </React.Fragment>
          ))}
        </Card.Content>
      </Card>

      {/* App Version */}
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF7',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#E0E0E0',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F7FFF7',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#292F36',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    justifyContent: 'space-around',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#292F36',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  actionCard: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
  },
  editProfileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuCard: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#292F36',
  },
  divider: {
    backgroundColor: '#E0E0E0',
    marginHorizontal: -16,
  },
  versionText: {
    textAlign: 'center',
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 8,
  },
});

export default ProfileScreen;
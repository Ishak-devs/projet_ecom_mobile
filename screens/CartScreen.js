import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { 
  Card, 
  Button, 
  Divider, 
  Checkbox, 
  TextInput,
  Snackbar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Smartphone Pro',
      price: 799.99,
      image: 'https://via.placeholder.com/300/FF6B6B/FFFFFF?text=Smartphone',
      quantity: 1,
      selected: true,
    },
    {
      id: 2,
      name: 'Casque Audio',
      price: 199.99,
      image: 'https://via.placeholder.com/300/4ECDC4/FFFFFF?text=Casque',
      quantity: 2,
      selected: true,
    },
    {
      id: 3,
      name: 'Montre Connectée',
      price: 249.99,
      image: 'https://via.placeholder.com/300/FFE66D/000000?text=Montre',
      quantity: 1,
      selected: false,
    },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const selectedItems = items.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
  const total = subtotal + shipping;

  const toggleItemSelection = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const increaseQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    setSnackbarMessage('Produit retiré du panier');
    setSnackbarVisible(true);
  };

  const applyPromoCode = () => {
    if (promoCode === 'REDUCTION10') {
      setSnackbarMessage('Code promo appliqué: 10% de réduction');
      setSnackbarVisible(true);
    } else if (promoCode) {
      setSnackbarMessage('Code promo invalide');
      setSnackbarVisible(true);
    }
  };

  const proceedToCheckout = () => {
    if (selectedItems.length > 0) {
      navigation.navigate('Checkout');
    } else {
      setSnackbarMessage('Sélectionnez au moins un produit');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cart Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votre panier ({items.length})</Text>
          {items.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Ionicons name="cart-outline" size={60} color="#E0E0E0" />
              <Text style={styles.emptyCartText}>Votre panier est vide</Text>
              <Button 
                mode="contained" 
                style={styles.shopButton}
                onPress={() => navigation.navigate('Home')}
              >
                Faire du shopping
              </Button>
            </View>
          ) : (
            items.map((item) => (
              <Card key={item.id} style={styles.cartItemCard}>
                <View style={styles.cartItemContainer}>
                  <Checkbox
                    status={item.selected ? 'checked' : 'unchecked'}
                    onPress={() => toggleItemSelection(item.id)}
                    color="#FF6B6B"
                  />
                  <Image 
                    source={{ uri: item.image }} 
                    style={styles.cartItemImage} 
                  />
                  <View style={styles.cartItemDetails}>
                    <Text style={styles.cartItemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity 
                        onPress={() => decreaseQuantity(item.id)}
                        style={styles.quantityButton}
                      >
                        <Ionicons name="remove" size={16} color="#FF6B6B" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity 
                        onPress={() => increaseQuantity(item.id)}
                        style={styles.quantityButton}
                      >
                        <Ionicons name="add" size={16} color="#FF6B6B" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Ionicons name="trash" size={20} color="#A0A0A0" />
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Promo Code */}
        {items.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Code promo</Text>
            <View style={styles.promoContainer}>
              <TextInput
                placeholder="Entrez votre code promo"
                value={promoCode}
                onChangeText={setPromoCode}
                style={styles.promoInput}
                mode="outlined"
                outlineColor="#E0E0E0"
                activeOutlineColor="#FF6B6B"
              />
              <Button 
                mode="outlined" 
                style={styles.applyButton}
                labelStyle={styles.applyButtonText}
                onPress={applyPromoCode}
              >
                Appliquer
              </Button>
            </View>
          </View>
        )}

        {/* Order Summary */}
        {items.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Résumé de la commande</Text>
            <Card style={styles.summaryCard}>
              <Card.Content>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Sous-total</Text>
                  <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Livraison</Text>
                  <Text style={styles.summaryValue}>
                    {shipping === 0 ? 'Gratuit' : `$${shipping.toFixed(2)}`}
                  </Text>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        )}
      </ScrollView>

      {/* Checkout Button */}
      {items.length > 0 && (
        <LinearGradient
          colors={['rgba(247, 255, 247, 0)', '#F7FFF7', '#F7FFF7']}
          style={styles.footerGradient}
        >
          <View style={styles.footerContainer}>
            <Button
              mode="contained"
              onPress={proceedToCheckout}
              style={styles.checkoutButton}
              labelStyle={styles.checkoutButtonText}
            >
              Passer la commande (${total.toFixed(2)})
            </Button>
          </View>
        </LinearGradient>
      )}

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF7',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292F36',
    marginBottom: 16,
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#A0A0A0',
    marginVertical: 16,
  },
  shopButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    marginTop: 16,
  },
  cartItemCard: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292F36',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    padding: 6,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#292F36',
    paddingHorizontal: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
  },
  removeButton: {
    padding: 8,
  },
  promoContainer: {
    flexDirection: 'row',
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    height: 48,
  },
  applyButton: {
    borderColor: '#FF6B6B',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  summaryCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#292F36',
    fontWeight: '600',
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#292F36',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  footerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  footerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 8,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#FF6B6B',
    marginBottom: 80,
  },
});

export default CartScreen;
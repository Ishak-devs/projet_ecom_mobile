import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { 
  Card, 
  Button, 
  Divider, 
  TextInput, 
  RadioButton,
  Snackbar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CheckoutScreen = ({ navigation }) => {
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const subtotal = 1249.97;
  const shipping = deliveryMethod === 'express' ? 19.99 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const placeOrder = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSnackbarVisible(true);
      // navigation.navigate('OrderConfirmation');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de contact</Text>
          <Card style={styles.formCard}>
            <Card.Content>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                label="Téléphone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                mode="outlined"
                keyboardType="phone-pad"
              />
            </Card.Content>
          </Card>
        </View>

        {/* Shipping Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresse de livraison</Text>
          <Card style={styles.formCard}>
            <Card.Content>
              <TextInput
                label="Adresse"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
                mode="outlined"
              />
              <View style={styles.row}>
                <TextInput
                  label="Ville"
                  value={city}
                  onChangeText={setCity}
                  style={[styles.input, { flex: 1, marginRight: 12 }]}
                  mode="outlined"
                />
                <TextInput
                  label="Code postal"
                  value={zipCode}
                  onChangeText={setZipCode}
                  style={[styles.input, { width: 120 }]}
                  mode="outlined"
                  keyboardType="number-pad"
                />
              </View>
              <TextInput
                label="Pays"
                value={country}
                onChangeText={setCountry}
                style={styles.input}
                mode="outlined"
              />
            </Card.Content>
          </Card>
        </View>

        {/* Delivery Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de livraison</Text>
          <Card style={styles.formCard}>
            <Card.Content>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setDeliveryMethod('standard')}
              >
                <RadioButton
                  value="standard"
                  status={deliveryMethod === 'standard' ? 'checked' : 'unchecked'}
                  onPress={() => setDeliveryMethod('standard')}
                  color="#FF6B6B"
                />
                <View style={styles.radioTextContainer}>
                  <Text style={styles.radioLabel}>Livraison standard</Text>
                  <Text style={styles.radioDescription}>Livraison en 3-5 jours ouvrables</Text>
                </View>
                <Text style={styles.radioPrice}>$9.99</Text>
              </TouchableOpacity>
              <Divider style={styles.divider} />
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setDeliveryMethod('express')}
              >
                <RadioButton
                  value="express"
                  status={deliveryMethod === 'express' ? 'checked' : 'unchecked'}
                  onPress={() => setDeliveryMethod('express')}
                  color="#FF6B6B"
                />
                <View style={styles.radioTextContainer}>
                  <Text style={styles.radioLabel}>Livraison express</Text>
                  <Text style={styles.radioDescription}>Livraison en 1-2 jours ouvrables</Text>
                </View>
                <Text style={styles.radioPrice}>$19.99</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de paiement</Text>
          <Card style={styles.formCard}>
            <Card.Content>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setPaymentMethod('credit')}
              >
                <RadioButton
                  value="credit"
                  status={paymentMethod === 'credit' ? 'checked' : 'unchecked'}
                  onPress={() => setPaymentMethod('credit')}
                  color="#FF6B6B"
                />
                <Text style={styles.radioLabel}>Carte de crédit</Text>
              </TouchableOpacity>
              
              {paymentMethod === 'credit' && (
                <View style={styles.paymentDetails}>
                  <TextInput
                    label="Numéro de carte"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    style={styles.input}
                    mode="outlined"
                    keyboardType="number-pad"
                    placeholder="4242 4242 4242 4242"
                  />
                  <View style={styles.row}>
                    <TextInput
                      label="Date d'expiration"
                      value={cardExpiry}
                      onChangeText={setCardExpiry}
                      style={[styles.input, { flex: 1, marginRight: 12 }]}
                      mode="outlined"
                      placeholder="MM/AA"
                    />
                    <TextInput
                      label="CVC"
                      value={cardCvc}
                      onChangeText={setCardCvc}
                      style={[styles.input, { width: 120 }]}
                      mode="outlined"
                      keyboardType="number-pad"
                      placeholder="123"
                    />
                  </View>
                  <TextInput
                    label="Nom sur la carte"
                    value={cardName}
                    onChangeText={setCardName}
                    style={styles.input}
                    mode="outlined"
                  />
                </View>
              )}

              <Divider style={styles.divider} />

              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => setPaymentMethod('paypal')}
              >
                <RadioButton
                  value="paypal"
                  status={paymentMethod === 'paypal' ? 'checked' : 'unchecked'}
                  onPress={() => setPaymentMethod('paypal')}
                  color="#FF6B6B"
                />
                <Text style={styles.radioLabel}>PayPal</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>

        {/* Order Summary */}
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
                <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Taxes</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <LinearGradient
        colors={['rgba(247, 255, 247, 0)', '#F7FFF7', '#F7FFF7']}
        style={styles.footerGradient}
      >
        <View style={styles.footerContainer}>
          <Button
            mode="contained"
            onPress={placeOrder}
            style={styles.placeOrderButton}
            labelStyle={styles.placeOrderButtonText}
            loading={loading}
          >
            {loading ? '' : `Confirmer la commande - $${total.toFixed(2)}`}
          </Button>
        </View>
      </LinearGradient>

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
        action={{
          label: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        }}
      >
        Commande passée avec succès!
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
    paddingBottom: 120,
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
  formCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: '#292F36',
  },
  radioDescription: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  radioPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#292F36',
    marginLeft: 16,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#E0E0E0',
  },
  paymentDetails: {
    marginLeft: 32,
    marginTop: 8,
  },
  summaryCard: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  placeOrderButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 8,
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#4ECDC4',
    marginBottom: 80,
  },
});

export default CheckoutScreen;
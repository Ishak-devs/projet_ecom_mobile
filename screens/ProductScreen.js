import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Share,
  Animated,
} from 'react-native';
import { 
  Card, 
  Button, 
  Divider, 
  Chip, 
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

const ProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Noir');
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const headerHeight = useHeaderHeight();
  
  const scrollY = new Animated.Value(0);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Noir', 'Blanc', 'Bleu', 'Rouge', 'Vert'];

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setSnackbarVisible(true);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Découvrez ce produit: ${product.name} pour seulement $${product.price}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const addToCart = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Cart');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerBackground, { opacity: headerOpacity }]} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite ? '#FF6B6B' : '#FFFFFF'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Ionicons name="share-social" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviews}>(128 avis)</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>
            Ce produit haut de gamme offre une qualité exceptionnelle. Conçu pour durer, 
            il combine style et fonctionnalité pour répondre à tous vos besoins.
          </Text>

          {/* Size Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Taille</Text>
            <View style={styles.chipContainer}>
              {sizes.map((size) => (
                <Chip
                  key={size}
                  mode="outlined"
                  selected={selectedSize === size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.chip,
                    selectedSize === size && styles.selectedChip,
                  ]}
                  textStyle={[
                    styles.chipText,
                    selectedSize === size && styles.selectedChipText,
                  ]}
                >
                  {size}
                </Chip>
              ))}
            </View>
          </View>

          {/* Color Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Couleur</Text>
            <View style={styles.chipContainer}>
              {colors.map((color) => (
                <Chip
                  key={color}
                  mode="outlined"
                  selected={selectedColor === color}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.chip,
                    selectedColor === color && styles.selectedChip,
                    { backgroundColor: getColorCode(color) },
                  ]}
                  textStyle={[
                    styles.chipText,
                    selectedColor === color && styles.selectedChipText,
                    { color: getTextColor(color) },
                  ]}
                >
                  {color}
                </Chip>
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantité</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                <Ionicons name="remove" size={20} color="#FF6B6B" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                <Ionicons name="add" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails du produit</Text>
            <View style={styles.detailItem}>
              <Ionicons name="cube" size={20} color="#4ECDC4" style={styles.detailIcon} />
              <Text style={styles.detailText}>Matériau: 100% coton bio</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="flag" size={20} color="#4ECDC4" style={styles.detailIcon} />
              <Text style={styles.detailText}>Origine: Fabriqué en France</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="shirt" size={20} color="#4ECDC4" style={styles.detailIcon} />
              <Text style={styles.detailText}>Type: Produit premium</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <LinearGradient
        colors={['rgba(247, 255, 247, 0)', '#F7FFF7', '#F7FFF7']}
        style={styles.footerGradient}
      >
        <View style={styles.footerContainer}>
          <Button
            mode="contained"
            onPress={addToCart}
            style={styles.addToCartButton}
            labelStyle={styles.addToCartButtonText}
            loading={loading}
          >
            {loading ? '' : `Ajouter au panier - $${(product.price * quantity).toFixed(2)}`}
          </Button>
        </View>
      </LinearGradient>

      {/* Snackbar for favorites */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        {isFavorite ? 'Ajouté aux favoris' : 'Retiré des favoris'}
      </Snackbar>
    </View>
  );
};

// Helper functions
const getColorCode = (color) => {
  switch (color) {
    case 'Noir': return '#000000';
    case 'Blanc': return '#FFFFFF';
    case 'Bleu': return '#2196F3';
    case 'Rouge': return '#F44336';
    case 'Vert': return '#4CAF50';
    default: return '#FFFFFF';
  }
};

const getTextColor = (color) => {
  return color === 'Noir' ? '#FFFFFF' : '#000000';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FFF7',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: width,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: '#292F36',
    marginLeft: 4,
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292F36',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292F36',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  chip: {
    margin: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedChip: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  chipText: {
    fontSize: 14,
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
    padding: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#292F36',
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666666',
  },
  footerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingTop: 20,
    paddingHorizontal: 20,
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
  addToCartButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 8,
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#FF6B6B',
    marginBottom: 80,
  },
});

export default ProductScreen;
// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';

// const HomeScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://172.16.19.86/ecomishak/api.php')
//       .then((response) => response.json())
//       .then((json) => {
//         if (json.success && json.data) {
//           setProducts(json.data);
//         } else {
//           setProducts([]);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   // if (loading) {
//   //   return (
//   //     <View style={styles.center}>
//   //       <ActivityIndicator size="large" color="#2c3e50" />
//   //       <Text style={styles.loadingText}>Chargement des produits...</Text>
//   //     </View>
//   //   );
//   // }

//   // if (error) {
//   //   return (
//   //     <View style={styles.center}>
//   //       <Text style={styles.errorText}>Erreur : {error}</Text>
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Boutique</Text>
//       </View>

//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Rechercher un produit..."
//           placeholderTextColor="#95a5a6"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       <FlatList
//         data={products.filter((product) =>
//           product.nom_produit.toLowerCase().includes(searchQuery.toLowerCase())
//         )}
//         keyExtractor={(item) => item.produit_id.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.listContent}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.productCard}>
//             <View style={styles.imageContainer}>
//               <Image
//                 source={{
//                   uri: item.image_url || 'https://via.placeholder.com/150',
//                 }}
//                 style={styles.productImage}
//                 resizeMode="contain"
//               />
//             </View>
//             <Text style={styles.productName} numberOfLines={2}>
//               {item.nom_produit}
//             </Text>
//             <Text style={styles.productPrice}>{item.prix}€</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>© 2025 InstaShop</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: '#7f8c8d',
//     fontSize: 16,
//   },
//   errorText: {
//     color: '#e74c3c',
//     fontSize: 16,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   header: {
//     paddingVertical: 25,
//     backgroundColor: '#2c3e50',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: '600',
//     letterSpacing: 1,
//   },
//   searchContainer: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ecf0f1',
//   },
//   searchInput: {
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#dfe6e9',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     color: '#2d3436',
//   },
//   listContent: {
//     paddingHorizontal: '2%',
//     paddingBottom: '5%',
//   },
//   productCard: {
//     flexBasis: '48%',
//     marginHorizontal: '1%',
//     marginBottom: '4%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingVertical: '5%',
//     alignItems: 'center',
//     elevation: Platform.OS === 'android' ? 3 : 0,
//     shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
//     shadowRadius: Platform.OS === 'ios' ? 3 : undefined,
//   },
//   imageContainer: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#34495e',
//     textAlign: 'center',
//     marginHorizontal: 5,
//     marginBottom: 5,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#27ae60',
//   },
//   footer: {
//     padding: 15,
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: '#ecf0f1',
//     backgroundColor: '#fff',
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#7f8c8d',
//   },
// });

// export default HomeScreen;

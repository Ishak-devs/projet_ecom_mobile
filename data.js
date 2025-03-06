import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const Data = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://172.16.18.40/ecomishak/api.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" color="#6200ee" />
  //       <Text>Chargement des données...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.center}>
  //       <Text style={styles.errorText}>Erreur : {error}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {/* Section Catégories */}
      <Text style={styles.sectionTitle}>Catégories</Text>
      <FlatList
        data={data.categories}
        keyExtractor={(item) => item.categorie_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>ID: {item.categorie_id}</Text>
            <Text style={styles.itemText}>Nom: {item.nom_categorie}</Text>
          </View>
        )}
      />

      {/* Section Produits */}
      <Text style={styles.sectionTitle}>Produits</Text>
      <FlatList
        data={data.produits}
        keyExtractor={(item) => item.produit_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>ID: {item.produit_id}</Text>
            <Text style={styles.itemText}>Nom: {item.nom_produit}</Text>
            <Text style={styles.itemText}>Prix: {item.prix}€</Text>
            <Text style={styles.itemText}>Description: {item.description}</Text>
            <Text style={styles.itemText}>Stock: {item.quantite_stock}</Text>
          </View>
        )}
      />

      {/* Section Fabricants */}
      <Text style={styles.sectionTitle}>Fabricants</Text>
      <FlatList
        data={data.fabricants}
        keyExtractor={(item) => item.fabricant_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>ID: {item.fabricant_id}</Text>
            <Text style={styles.itemText}>Nom: {item.nom_fabricant}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Data;
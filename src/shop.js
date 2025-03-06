import React, { useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

const products = [
  { id: "1", name: "Produit A", price: 10 },
  { id: "2", name: "Produit B", price: 15 },
];

export default function Bou() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.name} - {item.price}€</Text>
            <Button title="Ajouter" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      <Text>Total: {cart.reduce((sum, item) => sum + item.price, 0)}€</Text>
    </View>
  );
}

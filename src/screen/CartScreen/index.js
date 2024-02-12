import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {incrementItem, decrementItem} from '../../features/cart/cartSlice'; // Ensure decrementItem is imported

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [sumTotal, setSumTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.item.price * item.quantity;
    });
    setSumTotal(total);
  }, [cartItems]);

  // Updated to dispatch the item's ID
  const handleIncrement = id => {
    dispatch(incrementItem(id));
  };

  // Updated to dispatch the item's ID
  const handleDecrement = id => {
    dispatch(decrementItem(id));
  };

  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={({item}) => {
          // Removed index from parameters as it's no longer used
          const lineTotal = item.item.price * item.quantity;
          return (
            <View style={styles.itemContainer}>
              <View style={styles.itemInfo}>
                <Text>{item.item.name}</Text>
                <Text>{item.item.details}</Text>
                <Text>{item.item.price}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Line Total: {lineTotal}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                {/* Updated to pass item.item.id */}
                <TouchableOpacity onPress={() => handleDecrement(item.item.id)}>
                  <Text>Decrement</Text>
                </TouchableOpacity>
                {/* Updated to pass item.item.id */}
                <TouchableOpacity onPress={() => handleIncrement(item.item.id)}>
                  <Text>Increment</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.totalContainer}>
        <Text>Total: {sumTotal}</Text>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'pink',
    margin: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});

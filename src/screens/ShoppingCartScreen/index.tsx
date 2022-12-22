import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
import products from '../../data/cart';

const ShopingCartScreen = () => {

    const navigation = useNavigation();

    const totalPrice = products.reduce((summedPrice, product) => (
        summedPrice + product.item.price * product.quantity
    ), 0);

  return (
    <View style={styles.page}>       
        <FlatList 
            data={products} 
            renderItem={({item}) => <CartProductItem cartItem={item} />}
            keyExtractor={({id}) => id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Subtotal ({products.length} items): 
                        <Text style={{color: 'red'}}> ${totalPrice.toFixed(2)}</Text>
                    </Text>
                    <Button 
                        text="Proceed to Checkout" 
                        onPress={() => navigation.navigate('Address')} 
                    />
                </View>
            )}
        />
    </View>
  );
};

export default ShopingCartScreen;
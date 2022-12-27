import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import '@azure/core-asynciterator-polyfill'; 
import { useNavigation } from '@react-navigation/native';
import { DataStore, Auth } from '@aws-amplify/datastore';
import { Product, CartProduct } from '../../models';
import styles from './styles';
import CartProductItem from '../../components/CartProductItem';
import Button from '../../components/Button';
// import products from '../../data/cart';

const ShopingCartScreen = () => {

    //const [products, setProducts] = useState<Product[]>([]);
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
    const [finalCartProducts, setFinalCartProducts] = useState([]);

    const navigation = useNavigation();

    /* const fetchCartProducts = async () => {
        DataStore.query(CartProduct, cp =>
            cp.userSub.eq('susie'),
            ).then(setCartProducts);
    };*/

    useEffect(() => {
        // const userData = await Auth.currentAuthenticatedUser();
        // console.log(userData.attributes.sub);
        const fetchCartProducts = async () => {
            DataStore.query(CartProduct, cp =>
                cp.userSub.eq('susie'),
                ).then(setCartProducts);
        };
        fetchCartProducts();
    }, []);

    useEffect(() => {
        // query all products that are in the cart
        const fetchProducts = async () => {                      
            const products = await Promise.all(
                cartProducts.map(cartProduct => 
                DataStore.query(Product, cartProduct.cartProductProductId),
            ));

        // assign the products to the cart items
        setFinalCartProducts( 
            cartProducts.map(cartProduct => ({
            ...cartProduct, 
            product: products.find(p => p.id == cartProduct.cartProductProductId),
        }))
        ); 
        };        
        fetchProducts();          
    }, [cartProducts]);

    const totalPrice = finalCartProducts.reduce((summedPrice, product) => (
        summedPrice + product.product.price * product.quantity
    ), 0);

    /* useEffect(() => {
        const subscription = DataStore.observe(CartProduct).subscribe(msg =>
            fetchCartProducts(),
            );
        return subscription.unsubscribe;
    }, []);*/

    useEffect(() => {
        const subscriptions = finalCartProducts.map( cp =>
            DataStore.observe(CartProduct, cp.id).subscribe(msg => {
                if (msg.opType === 'UPDATE'){
                    setFinalCartProducts(curCartProducts =>
                        curCartProducts.map(cp => {
                            if (cp.id !== msg.element.id){
                                return cp;
                            }
                            return {
                                ...cp,
                                ...msg.element,
                            };
                        }),
                    );
                }
            }),
        );

        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        }
    });

  return (
     <View style={styles.page}>       
        <FlatList 
            data={finalCartProducts} 
            renderItem={({item}) => <CartProductItem cartItem={item} />}
            keyExtractor={({id}) => id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <View>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Subtotal ({cartProducts.length} items): 
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
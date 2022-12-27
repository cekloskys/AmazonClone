import React, { useState } from 'react';
import { View, Text,  Image } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { CartProduct } from '../../models';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector';
import { updateProduct } from '../../graphql/mutations';

interface CartProductItemProps {
    /* cartItem: {
        id: string,
        quantity: number,
        option?: string,
        product: {
            id: string,
            title: string,
            image: string,
            avgRating: number,
            ratings: number,
            price: number,
            oldPrice?: number,
        }
    }   */
    cartItem: CartProduct;
}

const CartProductItem = (props: CartProductItemProps) => {

    const cartItem = props.cartItem;
    //const {quantity, product} = cartItem;
    //const [quantityCart, setQuantityCart] = useState(quantity);
    const {product, ...cartProduct} = cartItem;

    const updateQuantity = async (newQuantity: number) => {
        const original = await DataStore.query(CartProduct, cartProduct.id);
        console.log(original);
        await DataStore.save(
            CartProduct.copyOf(original, updated => {
                updated.quantity = newQuantity;
            }),
        );
    };

  return (
    <View style={styles.root}>
        <View style={styles.row}>
            <Image 
                style={styles.image} 
                source={{uri: product.image }} />
            <View style={styles.rightContainer}>
                <Text style={styles.title} numberOfLines={3} >{product.title}</Text>
                <View style={styles.ratingsContainer}>
                    {[0,0,0,0,0].map((element, index) =>
                    (<FontAwesome 
                    style={styles.star} 
                    name={index < Math.floor(product.avgRating) ? 'star' : 'star-o'} 
                    size={18} 
                    color={'#e47911'} />))}
                    <Text>{product.ratings}</Text>
                </View>
                <Text style={styles.price}>
                    from ${product.price.toFixed(2)}
                    {product.oldPrice && (<Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>)}
                </Text>
            </View>
        </View>
        <View style={styles.quantityContainer}>
        <QuantitySelector quantity={cartProduct.quantity} setQuantity={updateQuantity} />
        </View>  
    </View> 
  );
};

export default CartProductItem;
import React, { useState } from 'react';
import { View, Text,  Image } from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector';

interface CartProductItemProps {
    cartItem: {
        id: string,
        quantity: number,
        option?: string,
        item: {
            id: string,
            title: string,
            image: string,
            avgRating: number,
            ratings: number,
            price: number,
            oldPrice?: number,
        }
    }   
}

const CartProductItem = (props: CartProductItemProps) => {

    const cartItem = props.cartItem;
    const {quantity, item} = cartItem;
    const [quantityCart, setQuantityCart] = useState(quantity);

  return (
    <View style={styles.root}>
        <View style={styles.row}>
            <Image 
                style={styles.image} 
                source={{uri: item.image }} />
            <View style={styles.rightContainer}>
                <Text style={styles.title} numberOfLines={3} >{item.title}</Text>
                <View style={styles.ratingsContainer}>
                    {[0,0,0,0,0].map((element, index) =>
                    (<FontAwesome 
                    style={styles.star} 
                    name={index < Math.floor(item.avgRating) ? 'star' : 'star-o'} 
                    size={18} 
                    color={'#e47911'} />))}
                    <Text>{item.ratings}</Text>
                </View>
                <Text style={styles.price}>
                    from ${item.price}
                    {item.oldPrice && (<Text style={styles.oldPrice}>${item.oldPrice}</Text>)}
                </Text>
            </View>
        </View>
        <View style={styles.quantityContainer}>
        <QuantitySelector quantity={quantityCart} setQuantity={setQuantityCart} />
        </View>  
    </View> 
  );
};

export default CartProductItem;
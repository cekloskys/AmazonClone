import React from 'react';
import { View, Text,  Image, Pressable } from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface ProductItemProps {
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

const ProductItem = (props: ProductItemProps) => {

    const item = props.item;
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Product Details', {id: item.id});
    }

  return (
    <Pressable style={styles.root} onPress={onPress}>
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
        </Pressable>
  );
};

export default ProductItem;
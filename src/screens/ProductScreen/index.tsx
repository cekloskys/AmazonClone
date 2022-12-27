import React, { useState, useEffect } from 'react';
import { Text, ScrollView, ActivityIndicator } from 'react-native';
import '@azure/core-asynciterator-polyfill'; 
import { useRoute, useNavigation } from '@react-navigation/native';
import { DataStore, Auth } from '@aws-amplify/datastore';
import { Product, CartProduct } from '../../models';
import styles from './styles';
//import product from '../../data/product';
import {Picker} from '@react-native-picker/picker';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';

const ProductScreen = () => {

    const navigation = useNavigation();

    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const route = useRoute();

    useEffect(() => {
      if (!route.params?.id){
        return;
      }
      DataStore.query(Product, route.params.id).then(setProduct);
    },[route.params?.id]);
    //console.log(product);

    useEffect(() => {
      if(product?.options){
        setSelectedOption(product.options[0]);
      }
    }, [product]);

    const onAddToCart = async () => {
      // const userData = await Auth.currentAuthenticatedUser();
      const newCartProduct = new CartProduct({
        userSub: "susie",
        // userSub: userData.attributes.sub,
        quantity,
        option: selectedOption,
        product,
      })

      await DataStore.save(newCartProduct);
      navigation.navigate('Shopping Cart');
    };

    if (!product) {
      return <ActivityIndicator />
    }

  return (
    <ScrollView style={styles.root}>
        <Text style={styles.title}>{product.title}</Text>

        <ImageCarousel images={product.images} />

        <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}>
            {product.options.map(option => (
                <Picker.Item label={option} value={option}></Picker.Item>))}
        </Picker>

        <Text style={styles.price}>
            from ${product.price.toFixed(2)}
            {product.oldPrice && (<Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>)}
        </Text>

        <Text style={styles.description}>{product.description}</Text>

        <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>

        <Button text={'Add To Cart'} onPress={onAddToCart} />
        <Button text={'Buy Now'} onPress={() => {console.warn('Buy Now')}} />
    </ScrollView>
  );
};

export default ProductScreen;
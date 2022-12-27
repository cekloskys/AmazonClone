import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import '@azure/core-asynciterator-polyfill'; 
import styles from './styles';
import ProductItem from '../../components/ProductItem';
import { DataStore } from '@aws-amplify/datastore';
import { Product } from '../../models';
// import products from '../../data/products';

const HomeScreen = ({searchValue} : {searchValue: string}) => {
  
  const [products, setProducts] = useState<Product[]>([]);

  /* useEffect(() => {
    const fetchProducts = async () => {
      const results = await DataStore.query(Product);
      setProducts(results);
    };
    fetchProducts();
  },[]);*/

  useEffect(() => {
    DataStore.query(Product).then(setProducts);
  },[]);

  return (
    <View style={styles.page}>
        <FlatList 
        data={products} 
        renderItem={({item}) => <ProductItem item={item} />}
        keyExtractor={({id}) => id}
        showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

export default HomeScreen;
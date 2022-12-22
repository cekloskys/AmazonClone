import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import ProductItem from '../../components/ProductItem';
import products from '../../data/products';

const HomeScreen = ({searchValue} : {searchValue: string}) => {
  
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
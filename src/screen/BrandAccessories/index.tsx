import { Calendar, ShoppingCart } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

const products = [
  {
    id: '1',
    name: 'T-Shirt',
    image: 'https://api.reparv.in/uploads/1754032701533.png',
    unitPrice: 400,
    totalPrice: 367,
    available: 189,
  },
  // Add more items if needed
];

const ProductScreen = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [search, setSearch] = useState('');

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Image source={{uri:item.image}}  style={styles.image} />
      <TouchableOpacity style={styles.buyBtn}>
        <Text style={styles.buyText}>Buy +</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>₹{item.unitPrice}</Text>
      <Text style={[styles.cell,{width: 133}]}>₹{item.totalPrice}</Text>
      <Text style={styles.cell}>{item.available} Units</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeText]}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.tabText, activeTab === 'orders' && styles.activeText]}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIcon}>
          <ShoppingCart color={'white'} />
        </TouchableOpacity>
      </View>

      {/* Search & Date */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Product"
          placeholderTextColor={'gray'}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.dateRangeButton}>
          <Calendar size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <Text style={styles.listTitle}>Product List</Text>
      <ScrollView horizontal>
        <View>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell,{width:80,}]}>Image</Text>
            <Text style={[styles.headerCell,{width:90}]}>Buy Now</Text>
            <Text style={[styles.headerCell,{width: 103}]}>Product</Text>
            <Text style={[styles.headerCell,{width: 103}]}>Unit Price</Text>
            <Text style={[styles.headerCell,{width: 133}]}>Total Price</Text>
            <Text style={styles.headerCell}>Available</Text>
          </View>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#ccf5cc',
  },
  tabText: {
    fontWeight: '500',
    color: '#000',
  },
  activeText: {
    fontWeight: '700',
  },
  cartIcon: {
    marginLeft: 'auto',
    backgroundColor: '#0BB501',
    padding: 8,
    borderRadius: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: 'black',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
  },
  dateRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    color:'black',
    gap: 6,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color:'black',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal:10,
    color:'black',
  },
  headerCell: {
    width: 120,
    fontWeight: 'bold',
    //textAlign: 'center',
    color:'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  image: {
    width: 60,
    height: 60,
  
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buyBtn: {
    backgroundColor: '#ccf5cc',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  buyText: {
    color: 'green',
    fontWeight: '600',
  },
  cell: {
    width: 100,
    color:'black',
   textAlign: 'center',
  },
});

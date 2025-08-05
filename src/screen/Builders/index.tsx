import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Calendar } from 'lucide-react-native';
import ListCard from '../../component/Builder/Card';
import axios from 'axios';

const data = [
  { sn: 1, company: 'reparv', contact: 'tfjjjfjfgjfjjest' },
];

const Builders: React.FC = () => {
  const [search, setSearch] = useState('');
const [builders, setBuilders] = useState<any[]>([]);
const [loading, setLoading] = useState<boolean>(true);
  
   

      useEffect(() => {
    fetchBuilders();
  }, []);

  const fetchBuilders = async () => {
    try {
      const response = await axios.get('https://api.reparv.in/project-partner/builders/');
      console.log(response.data); // Check API response
      setBuilders(response.data); // Adjust this line if your API returns data differently
    } catch (error) {
      console.error('Error fetching builders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = builders.filter(item =>
    item.company_name.toLowerCase().includes(search.toLowerCase()) ||
    item.contact.toLowerCase().includes(search.toLowerCase()) ||
    item.contact_person
.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      {/* <Text style={styles.title}>Builders</Text> */}

      {/* Search & Date Range */}
      <View style={[styles.searchRow,{padding:10}]}>
        <TextInput
          placeholder="Search Builder"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.dateRangeButton}>
          {/* <Text style={styles.dateText}>Select Date Range</Text> */}
          <Calendar size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Builders List */}
      <Text style={[styles.subTitle,{paddingHorizontal:10}]}>Builders List</Text>
      {/* <View style={[styles.tableHeader,{paddingHorizontal:10,}]}>
        <Text style={[styles.headerCell]}>Builder Contact</Text>
        <Text style={[styles.headerCell]}>Company Name</Text>
        <Text style={[styles.headerCell]}>Action</Text>
      </View> */}
<View style={{width:'100%',borderWidth:0.5,borderColor:'gray'}}/>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.builderid.toString()}
        renderItem={({ item }) => (
        //   <View style={styles.tableRow}>
        //     <View style={styles.snBadge}>
        //       <Text style={styles.snText}>{item.sn}</Text>
        //     </View>
        //     <Text style={styles.cell}>{item.company}</Text>
        //     <Text style={styles.cell}>{item.contact}</Text>
        //   </View>
        <ListCard data={item}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { //padding: 16,
     backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },

  searchRow: { flexDirection: 'row',  gap: 10,width:'100%' },
  searchInput: {
    width:'70%',
   flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 10,
  },
  dateRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding:10,
    borderRadius: 10,
    gap: 6,
  },
  dateText: { fontSize: 14 },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
    //paddingHorizontal: 4,
    borderBottomWidth: 1,
    justifyContent:'space-between',
    borderBottomColor: '#ddd',
  },
 headerCell: { fontWeight: 'bold', color: '#333' },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  snBadge: {
    backgroundColor: '#e3f9e5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  snText: { color: 'green', fontWeight: 'bold' },
  cell: { flex: 1, paddingHorizontal: 4 },
});

export default Builders;

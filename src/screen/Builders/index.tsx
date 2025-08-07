import React, { useCallback, useEffect, useState } from 'react';
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
import Svg, { Path } from 'react-native-svg';
import AddBuilder from '../../component/Builder/AddBuilder';



const Builders: React.FC = () => {
  const [search, setSearch] = useState('');
  const [builders, setBuilders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addBuilderShow,setAddBuilderShow]=useState(false)
   

    const fetchBuilders = useCallback(async () => {
  try {
    const response = await axios.get('https://api.reparv.in/project-partner/builders/');
    console.log(response.data);
    setBuilders(response.data); // Adjust if needed
  } catch (error) {
    console.error('Error fetching builders:', error);
  } finally {
    setLoading(false);
  }
}, []); //


 useEffect(() => {
    fetchBuilders();
    const interval = setInterval(fetchBuilders, 5000); // fetch every 30s
    return () => clearInterval(interval); // cleanup on unmount
  }, [fetchBuilders, addBuilderShow]);

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
          placeholderTextColor={'gray'}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.dateRangeButton}>
          {/* <Text style={styles.dateText}>Select Date Range</Text> */}
          <Calendar size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Builders List */}
        <View style={styles.containerOfInqury}>
      <Text style={[styles.subTitle]}>Builders List</Text>
        {/* Add Client Button */}
                  <TouchableOpacity
                    style={styles.addClientButton}
                    onPress={() => {
                      setAddBuilderShow(true)
                    }}
                  >
                    {/* Placeholder for icon (use Image or vector icon here if needed) */}
                    <View style={styles.iconPlaceholder}>
                      <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
                        <Path
                          d="M6.83335 14.7025C6.83335 15.034 6.96505 15.352 7.19947 15.5864C7.43389 15.8208 7.75183 15.9525 8.08335 15.9525C8.41487 15.9525 8.73282 15.8208 8.96724 15.5864C9.20166 15.352 9.33335 15.034 9.33335 14.7025V9.28584H14.75C15.0815 9.28584 15.3995 9.15414 15.6339 8.91972C15.8683 8.6853 16 8.36736 16 8.03584C16 7.70432 15.8683 7.38637 15.6339 7.15195C15.3995 6.91753 15.0815 6.78584 14.75 6.78584H9.33335V1.36917C9.33335 1.03765 9.20166 0.719708 8.96724 0.485288C8.73282 0.250867 8.41487 0.119171 8.08335 0.119171C7.75183 0.119171 7.43389 0.250867 7.19947 0.485288C6.96505 0.719708 6.83335 1.03765 6.83335 1.36917V6.78584H1.41669C1.08517 6.78584 0.767224 6.91753 0.532804 7.15195C0.298383 7.38637 0.166687 7.70432 0.166687 8.03584C0.166687 8.36736 0.298383 8.6853 0.532804 8.91972C0.767224 9.15414 1.08517 9.28584 1.41669 9.28584H6.83335V14.7025Z"
                          fill="white"
                        />
                      </Svg>
                    </View>
                    <Text style={styles.addClientText}>Add Builder</Text>
                  </TouchableOpacity>
                  </View>
      <View style={[styles.tableHeader,{paddingHorizontal:3,}]}>
        <Text style={[styles.headerCell]}>Builder Contact</Text>
        <Text style={[styles.headerCell]}>Company Name</Text>
        <Text style={[styles.headerCell,{paddingHorizontal:28}]}>Action</Text>
      </View>
       <View style={{width:'100%',borderWidth:0.5,borderColor:'gray'}}/>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.builderid.toString()}
        renderItem={({ item }) => (
        <ListCard data={item}/>
        )}
      />

      {/* Add Modes */}
      <AddBuilder
  visible={addBuilderShow}
  onClose={() => setAddBuilderShow(false)}
  onSave={(data) => console.log('Form Data:', data)}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { //padding: 16,
     backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subTitle: {
    marginLeft: 7,
    marginTop:10,
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 19,
    color: '#000000',
  },
  searchRow: { flexDirection: 'row',  gap: 10,width:'100%' },
  searchInput: {
    width:'70%',
   flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 10,
  },
  containerOfInqury: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    // iOS Shadow
    // shadowColor: '#000',
  },
  addClientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    // width: '35.79%',
    height: 36,
    backgroundColor: '#0BB501',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 16,
    height: 16,

    borderRadius: 4,
  },
  addClientText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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
 headerCell: { fontWeight: 'bold', color: '#333' ,width:100},
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

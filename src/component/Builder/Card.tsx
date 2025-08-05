import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, FlatList } from 'react-native';
import { Phone, ChevronDown, PhoneCall } from 'lucide-react-native';
import axios from 'axios';
import Loader from '../loader';
import BuilderInfoModal from './BuilderInfoModel';
import BuilderUpdateModal from './BuilderUpdateModal';

const ListCard: React.FC<{ data: any }> = ({ data }) => {
  const phoneNumber = '8755464946';
  const contactName = 'Reparvjkkk';
  const status = 'Visit Scheduled';
  const visitDate = '29 Jul 2025 | 12:22 PM';
 const[modalVisible,setModalVisible]=useState(false)
 const [selectedValue, setSelectedValue] = useState();
  const [visible, setVisible] = useState(false);
  const[editModalVisible,setEditModalVisible]=useState(false)
const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const optionsl = [
    { label: 'View', value: 'View', color: 'black', select: true },
    { label: 'Status', value: 'Status', color: 'black', select: false },
  
  ];
   const optionsr = [
   { label: 'Delete', value: 'delete', color: 'black', select: false },
    { label: 'Update', value: 'Update', color: 'black', select: false },
  ];

 const handleSelect = async (value: string) => {
    setModalVisible(false);
    if(value==='View'){
      setVisible(true)
    }else if(value==='Update'){
      setEditModalVisible(true)
    }else{

    }
 }
 
  return (
    <>
    <View style={styles.card}>
      <View style={[styles.rowBetween,{flexDirection:'column'}]}>
        <Text style={styles.date}>{data?.contact_person}</Text>
        <TouchableOpacity onPress={handleCall} style={styles.phoneRow}>
          <PhoneCall fill={"#1E90FF"} size={16} color="#1E90FF" />
          <Text style={styles.phoneText}>{data?.contact}</Text>
        </TouchableOpacity>
       
      </View>
 
 <View style={{width:100}}>
    <Text style={styles.contactName}>{data?.company_name
}</Text>
 </View>
      <View style={styles.rowAlign}>
        

        <TouchableOpacity style={styles.actionBtn} onPress={()=>setModalVisible(true)}>
          <Text style={styles.actionText}>Action</Text>
          <ChevronDown size={14} color="#333" />
        </TouchableOpacity>
      </View>

    
    </View>

   <Modal transparent visible={modalVisible} animationType="slide">
                <View style={styles.modalOverlay}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancel}>X</Text>
                  </TouchableOpacity>
                  <View style={styles.smodalContainer}>
                    <FlatList
                      data={optionsl}
                      keyExtractor={item => item.value}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.option}
                          onPress={() => handleSelect(item.value)}
                        >
                          <View
                            style={[
                              styles.checkbox,
                              selectedValue === item.value && styles.checked,
                            ]}
                          >
                            {selectedValue === item.value && (
                              <Text style={styles.checkmark}>✓</Text>
                            )}
                          </View>
                          <Text
                            style={[
                              styles.optionText,

                              {
                                color: `${item.color}`,
                              },
                            ]}
                          >
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />

  <FlatList
                      data={optionsr}
                      keyExtractor={item => item.value}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.option}
                          onPress={() => handleSelect(item.value)}
                        >
                          <View
                            style={[
                              styles.checkbox,
                              selectedValue === item.value && styles.checked,
                            ]}
                          >
                            {selectedValue === item.value && (
                              <Text style={styles.checkmark}>✓</Text>
                            )}
                          </View>
                          <Text
                            style={[
                              styles.optionText,

                              {
                                color: `${item.color}`,
                              },
                            ]}
                          >
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />

                
                  </View>
                </View>
   </Modal>

   {/* Builder Details model */}
     <BuilderInfoModal visible={visible} onClose={() => setVisible(false)}
      data={{
    company_name: data?.company_name,
    contact_person: data?.contact_person,
    contact: data?.contact,
    email: data?.email,
    website: data?.website,
    office_address: data?.office_address,
    registration_no: data?.registration_no,
    status: data?.status,
    
    notes: data?.notes,
    
  }}/>

 {/* Builder Update model */}
 
 <BuilderUpdateModal
  visible={editModalVisible}
  data={data}
  onClose={() => setEditModalVisible(false)}
  onSave={(updatedData) => {
    // send PUT API call or update in state
    console.log('Updated Builder:', updatedData);
  }}
/>

    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    //borderRadius: 10,
    padding: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  rowBetween: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: '#ccc',
  },
  actionText: {
    fontSize: 14,
    marginRight: 4,
    color: '#333',
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    color: '#1E90FF',
    fontSize: 14,
    marginLeft: 4,
  },
  contactName: {
    fontSize: 14,
    color: '#aaa',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  statusText: {
    color: '#1E90FF',
    fontWeight: '600',
    fontSize: 13,
  },
   modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  smodalContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  option: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    color: 'black',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  cancel: {
    textAlign: 'center',
    paddingVertical: 5,
    color: 'black',
    padding: 10,
    borderRadius: 55,
    margin: 'auto',
    marginBottom: 10,
    backgroundColor: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'gray',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#0BB501',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
  statusmodalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spopupMenu: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
  },
});

export default ListCard;

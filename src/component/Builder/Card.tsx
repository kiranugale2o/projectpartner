import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, FlatList, Alert, TextInput, ScrollView } from 'react-native';
import { Phone, ChevronDown, PhoneCall, X } from 'lucide-react-native';
import axios from 'axios';
import Loader from '../loader';
import BuilderInfoModal from './BuilderInfoModel';
import BuilderUpdateModal from './BuilderUpdateModal';
import DateSelectPopup from '../DateSelectedPopup';

const ListCard: React.FC<{ data: any }> = ({ data }) => {
 const [form, setForm] = useState<any>(data);
 const [showPicker, setShowPicker] = useState(false);
 const [selectedDate, setSelectedDate] = useState<any>(null);
  // Utility function
  const dateConvert = (mydate: string) => {
   if (!mydate) return ''; // Guard against empty input
   const date = new Date(mydate);
   if (isNaN(date.getTime())) return ''; // Guard against invalid date
 
   const formatted = `${String(date.getMonth() + 1).padStart(2, '0')}/${
     String(date.getDate()).padStart(2, '0')
   }/${date.getFullYear()}`;
   return formatted;
 };
 
 const convertToDate = (dateObj: { day: string; month: string; year: string }): string => {
   const monthMap: { [key: string]: string } = {
     Jan: '01',
     Feb: '02',
     Mar: '03',
     Apr: '04',
     May: '05',
     Jun: '06',
     Jul: '07',
     Aug: '08',
     Sep: '09',
     Oct: '10',
     Nov: '11',
     Dec: '12',
   };
 
   const month = monthMap[dateObj.month];
   return `${dateObj.year}-${month}-${dateObj.day}`;
 };
 
   useEffect(() => {
     setForm(data);
     setUpSelectedDate(data?.dor)
   }, []);
 
 const handleChange = useCallback(
   (key: keyof any, value: string) => {
     setForm((prev:any) => ({ ...prev, [key]: value }));
     console.log(form,'updated');
     
   },
   []
   
 );
 
//  const handleChange = (
//    (key: keyof any , value: string) => {
//      setForm((prev:any) => {
//        const updated = { ...prev, [key]: value };
//        console.log('Updated Form:', updated); // ✅ Add this log
//        return updated;
//      });
//    }
//  );
 
 
   const handleSave = () => {
     console.log(form,'fff');
     
    
   };
 
 const[modalVisible,setModalVisible]=useState(false)
 const [selectedValue, setSelectedValue] = useState();
 const[showStatusModal,setShowStatusModal]=useState(false)
  const [visible, setVisible] = useState(false);
  const[editModalVisible,setEditModalVisible]=useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedBuilderId, setSelectedBuilderId] = useState<number | null>(data?.builderid);
const[upselectedDate,setUpSelectedDate]=useState(form?.dor===''?data?.dor :form?.dor);
const confirmDelete = () => {
 handleDeleteBuilder();
};
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
    }else if(value==='delete'){
      setShowDeleteModal(true)
    }else{
      setShowStatusModal(true)
    }
 }

//builder Delete function
const handleDeleteBuilder = async () => {
  try {
    const response = await fetch(`https://api.reparv.in/project-partner/builders/delete/${data?.builderid}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      Alert.alert('Deleted', 'Builder has been deleted successfully');
      // Refresh list or remove from state
       setShowDeleteModal(false)
    } else {
      Alert.alert('Error', 'Failed to delete builder');
      console.log(response);
      
      setShowDeleteModal(false) 
    }
  } catch (error) {
    console.error('Delete error:', error);
    Alert.alert('Error', 'Something went wrong');
  }
};

//builder update function
const handleUpdateBuilder = async () => {
  try {
    if (!data || !data?.builderid) {
      console.warn("No builder ID found");
      Alert.alert("No builder ID found")
      return;
    }
    const response = await fetch(`https://api.reparv.in/project-partner/builders/edit/${data?.builderid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
       console.error('Update error:')
      throw new Error(`Failed to update: ${response.status}`);
    }

    const result = await response.json();
    setUpSelectedDate(form?.dor)
    console.log('Update successful:', result);
     Alert.alert('Update successful:')
     setEditModalVisible(false)
  } catch (error) {
    console.error('Update error:', error);
      Alert.alert('Update error')
      setEditModalVisible(false)
  }
};

//Change Builder status
const handleStatusofBuilder=async()=>{
   try {
    if (!data || !data?.builderid) {
      console.warn("No builder ID found");
      Alert.alert("No builder ID found")

      return;
    }
    const response = await fetch(`https://api.reparv.in/project-partner/builders/status/${data?.builderid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
       console.error('Update error:')
      throw new Error(`Failed to update: ${response.status}`);
    }

    const result = await response.json();
     Alert.alert(`Success: Builder status changed to ${data?.status==='Active'?'Inactive':'Active'}`)
     
  } catch (error) {
    console.error('Update error:', error);
      Alert.alert('Status Update error')
     
  }finally{
    setShowStatusModal(false)
  }
}


 
  return (
    <>
   <View style={styles.card}>
  {/* Contact Info Column */}
  <View style={[styles.column]}>
    
    <Text style={styles.value}>{data?.contact_person || '-'}</Text>
    <TouchableOpacity onPress={handleCall} style={styles.phoneRow}>
      <PhoneCall size={16} color="#1E90FF" />
      <Text style={styles.phoneText}>{data?.contact || '-'}</Text>
       
    </TouchableOpacity>
  <Text style={{color:'gray'}}>{data?.office_address|| '-'}</Text>
  </View>

  {/* Company Name Column */}
  <View style={[styles.column,{paddingHorizontal:20}]}>
   
    <Text style={styles.value}>{data?.company_name || '-'}</Text>
    
  </View>

  {/* Action Column */}
  <View style={[styles.column, { alignItems: 'flex-end' }]}>
  
    <TouchableOpacity style={styles.actionBtn} onPress={() => setModalVisible(true)}>
      <Text style={styles.actionText}>Action</Text>
      <ChevronDown size={14} color="#0BB501" />
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
  <Modal visible={editModalVisible} animationType="slide" transparent>
      <View style={updatestyles.overlay}>
        <View style={updatestyles.modal}>
          <View style={updatestyles.header}>
            <Text style={updatestyles.title}>Update Builder</Text>
            <TouchableOpacity onPress={()=>{setEditModalVisible(false)}}>
              <X size={24} />
            </TouchableOpacity>
          </View>
          <ScrollView style={updatestyles.form}>
            {[
              'company_name',
              'contact_person',
              'contact',
              'email',
              'website',
              'office_address',
              'dor',
              'registration_no',
              'notes',
             
            ].map((field) => (
              <View key={field} style={updatestyles.inputContainer}>
                {field==='dor' || field==='Dor'?<>
    <Text style={updatestyles.label}>Date Of Registration</Text>
    <TouchableOpacity onPress={() => setShowPicker(true)} style={updatestyles.input}>
      <Text style={{ color: form.dor ? 'black' : 'gray' }}>
        {dateConvert(upselectedDate)}
         {/* {dateConvert(form.dor)} */}
         
      </Text>
    </TouchableOpacity>

    {showPicker && (
     <DateSelectPopup
  visible={showPicker}
  onCancel={() => setShowPicker(false)}
  onOk={(dateObj: any) => {
    const formatted = convertToDate(dateObj);
    setUpSelectedDate(formatted)
    handleChange('dor', formatted); // already updates form state
    // REMOVE this redundant setForm
    // setForm({ ...form, dor: formatted });
    setShowPicker(false);
  }}


      />
    )}
  </>
                :<>
                  <Text style={updatestyles.label}>{field.replace(/_/g, ' ')}</Text>
                <TextInput
                  style={updatestyles.input}
                  value={form[field as keyof any ] || ''}
                  onChangeText={(text) => handleChange(field as keyof any , text)}
                  placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                />
                </>}
              
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={updatestyles.saveBtn} onPress={handleUpdateBuilder}>
            <Text style={updatestyles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

{/* Delete model */}
 <Modal transparent visible={showDeleteModal} animationType="fade">
      <View style={Deletestyles.modalBackdrop}>
        <View style={Deletestyles.modalBox}>
          <Text style={Deletestyles.modalTitle}>Confirm Deletion</Text>
          <Text style={Deletestyles.modalMessage}>
            Are you sure you want to delete this builder?
          </Text>
          <View style={Deletestyles.modalActions}>
            <TouchableOpacity style={Deletestyles.cancelBtn} onPress={()=>{setShowDeleteModal(false)}}>
              <Text style={{ color: '#333' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Deletestyles.confirmBtn} onPress={confirmDelete}>
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

{/* Status Changed Confirm */}
    <Modal transparent visible={showStatusModal} animationType="fade">
      <View style={Deletestyles.modalBackdrop}>
        <View style={Deletestyles.modalBox}>
          <Text style={Deletestyles.modalTitle}>Confirm Status</Text>
          <Text style={Deletestyles.modalMessage}>
            Are you sure you want to change this builder status?
          </Text>
          <View style={Deletestyles.modalActions}>
            <TouchableOpacity style={Deletestyles.cancelBtn} onPress={()=>{setShowStatusModal(false)}}>
              <Text style={{ color: '#333' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Deletestyles.confirmBtn} onPress={handleStatusofBuilder}>
              <Text style={{ color: 'white' }}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  
    </>
  );
};

const styles = StyleSheet.create({
 card: {
  width:'100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
 alignItems: 'center',
  paddingVertical: 16,
 // paddingHorizontal: 12,
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderColor: '#eee',
},

column: {
  flex: 1,
  paddingHorizontal: 6,
},

label: {
  fontSize: 12,
  color: '#888',
  marginBottom: 4,
},

value: {
  fontSize: 14,
  fontWeight: '600',
  color: '#222',
  marginBottom: 6,
},

phoneRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

phoneText: {
  marginLeft: 6,
  color: '#1E90FF',
  fontSize: 14,
},

actionBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#0BB501',
  borderRadius: 20,
  paddingVertical: 4,
  paddingHorizontal: 7,
},

actionText: {
  fontSize: 14,
  color: '#0BB501',
  marginRight: 4,
},

  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
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

const Deletestyles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  modalMessage: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  confirmBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'red',
    borderRadius: 6,
  },
});

const updatestyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
   // padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color:'black',
    fontSize: 22,
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontWeight: '500',
    fontSize:16,
    color:'gray'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color:'black'
  },
  saveBtn: {
    backgroundColor: '#0BB501',
    marginHorizontal: 16,
    marginTop: 10,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});


export default ListCard;

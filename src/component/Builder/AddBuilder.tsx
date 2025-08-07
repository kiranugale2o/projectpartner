import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DateSelectPopup from '../DateSelectedPopup';

interface AddBuilderProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddBuilder: React.FC<AddBuilderProps> = ({ visible, onClose, onSave }) => {
  const [form, setForm] = useState({
    company_name: '',
    contact_person: '',
    contact: '',
    email: '',
    office_address: '',
    registration_no: '',
    dor: '',
    website: '',
    notes: '',
  });

   const [selectedDate, setSelectedDate] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const[lasterror,setLastError]=useState('')
  const isFormComplete = Object.values(form).every((value) => value.trim() !== '');
const [showPicker, setShowPicker] = useState(false);

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





  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.company_name) newErrors.company_name = 'Company name is required';
    if (!form.contact_person) newErrors.contact_person = 'Contact person is required';
    if (!form.contact || !/^\d{10}$/.test(form.contact)) newErrors.contact = 'Contact must be 10 digits';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.dor) newErrors.dor = 'Date of registration is required';
    if (form.website && !/^https?:\/\/.+\..+/.test(form.website)) newErrors.website = 'Invalid website URL';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async() => {
    if (validate()) {
        if(form.company_name==='' || form.contact==='' || form.contact_person==='' || form.dor==='' || form.email==='' || form.notes==='' || form.website==='' || form.office_address==='' || form.registration_no===''){
           setLastError('All Values are Required !')
           return;
        }
     try {
    const response = await fetch('https://api.reparv.in/project-partner/builders/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (response.ok) {
      Alert.alert('Success', 'Builder added successfully!');
      onClose();
    } else {
      Alert.alert('Error', result.message || 'Something went wrong.');
    }
  } catch (error) {
    console.error('POST error:', error);
    Alert.alert('Error', 'Network error.');
  }finally{
     onClose();
     
      setForm({
        company_name: '',
        contact_person: '',
        contact: '',
        email: '',
        office_address: '',
        registration_no: '',
        dor: '',
        website: '',
        notes: '',
      });
      setErrors({});
    
  }

     }
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

   const handleOk = (date: any) => {
  setSelectedDate(date);
  setShowPicker(false);
  const formattedDate = convertToDate(date);
 setForm((prev) => ({ ...prev, dor: formattedDate }));
 console.log(date,'',formattedDate);
 
};
  return (
    <Modal visible={visible} animationType="slide">
        <View style={styles.overlay}>
                <View style={styles.modal}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <Text style={styles.title}>Add Builder Info</Text>

            <TouchableOpacity onPress={()=>{
             setForm({
        company_name: '',
        contact_person: '',
        contact: '',
        email: '',
        office_address: '',
        registration_no: '',
        dor: '',
        website: '',
        notes: '',
      });
      
            onClose()
          }}>
              <X size={24} />
            </TouchableOpacity>
          </View>
           <Text style={styles.error}>{lasterror}</Text>
     

        {Object.entries(form).map(([key, value]) => (
          <View key={key} style={styles.inputGroup}>
            {key.replace('_',' ')==='dor' ?(<><Text style={styles.label}>Date Of Registration</Text>
             <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
                  <Text style={{ color: 'gray' }}>
                    {!selectedDate
                      ? 'Select Date'
                      : `${selectedDate?.day}-${selectedDate?.month}-${selectedDate?.year}`}
                  </Text>
                </TouchableOpacity>
          
                {showPicker && (
                  <DateSelectPopup
                    visible={showPicker}
                    onCancel={() => setShowPicker(false)}
                    onOk={handleOk}
                  />
                )}</>)
            : 
            <><Text style={styles.label}>{key.replace('_', ' ')}</Text>
            <TextInput
              style={styles.input} 
              
              value={value}
              onChangeText={(text) => handleChange(key, text)}
              placeholder={`Enter ${key.replace('_', ' ')}`}
              keyboardType={key === 'contact' ? 'phone-pad' : 'default'}
            />
            {errors[key] && <Text style={styles.error}>{errors[key]}</Text>}
           </>}
          </View>
        ))}


        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={()=>{
             setForm({
        company_name: '',
        contact_person: '',
        contact: '',
        email: '',
        office_address: '',
        registration_no: '',
        dor: '',
        website: '',
        notes: '',
      });
      
            onClose()
          }}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        <TouchableOpacity
  style={[styles.saveBtn, !isFormComplete && styles.disabledBtn]}
  onPress={handleSave}
  disabled={!isFormComplete}
>
  <Text style={styles.btnText}>Save</Text>
</TouchableOpacity>

        </View>
      </ScrollView>
      </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    borderRadius:50
  },
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 10,
  },
  disabledBtn: {
  backgroundColor: '#aaa',
},

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AddBuilder;

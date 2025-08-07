import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { X } from 'lucide-react-native';
import DateSelectPopup from '../DateSelectedPopup';

interface BuilderData {
  company_name?: string;
  contact_person?: string;
  contact?: string;
  email?: string;
  website?: string;
  office_address?: string;
  registration_no?: string;
  status?: string;
  loginstatus?: string;
  notes?: string;
  dor?:string;
  created_at?: string;
  updated_at?: string;
  builderadder?: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  data: BuilderData;
  onSave: (updatedData: BuilderData) => void;
}

const BuilderUpdateModal: React.FC<Props> = ({ visible, onClose, data, onSave }) => {
const [form, setForm] = useState<BuilderData>(data);
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
  }, [data]);

// const handleChange = useCallback(
//   (key: keyof BuilderData, value: string) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//     console.log(form,'updated');
    
//   },
//   []
  
// );

const handleChange = (
  (key: keyof BuilderData, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      console.log('Updated Form:', updated); // ✅ Add this log
      return updated;
    });
  }
);


  const handleSave = () => {
    console.log(form,'fff');
    
    onSave(form);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Update Builder</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.form}>
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
              <View key={field} style={styles.inputContainer}>
                {field==='dor' || field==='Dor'?<>
    <Text style={styles.label}>Date Of Registration</Text>
    <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
      <Text style={{ color: form.dor ? 'black' : 'gray' }}>
        {/* {form.dor ? dateConvert(form.dor) : 'Select date'} */}
         {dateConvert(form.dor)}
      </Text>
    </TouchableOpacity>

    {showPicker && (
     <DateSelectPopup
  visible={showPicker}
  onCancel={() => setShowPicker(false)}
  onOk={(dateObj: any) => {
    const formatted = convertToDate(dateObj);
    handleChange('dor', formatted); // already updates form state
    // REMOVE this redundant setForm
    // setForm({ ...form, dor: formatted });
    setShowPicker(false);
  }}


      />
    )}
  </>
                :<>
                  <Text style={styles.label}>{field.replace(/_/g, ' ')}</Text>
                <TextInput
                  style={styles.input}
                  value={form[field as keyof BuilderData] || ''}
                  onChangeText={(text) => handleChange(field as keyof BuilderData, text)}
                  placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                />
                </>}
              
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BuilderUpdateModal;

const styles = StyleSheet.create({
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
    backgroundColor: '#007bff',
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

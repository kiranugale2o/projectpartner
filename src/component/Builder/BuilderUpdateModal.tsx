import React, { useState, useEffect } from 'react';
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
  const [form, setForm] = useState<BuilderData>({});

  useEffect(() => {
    setForm(data);
  }, [data]);

  const handleChange = (key: keyof BuilderData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
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
                <Text style={styles.label}>{field.replace(/_/g, ' ')}</Text>
                <TextInput
                  style={styles.input}
                  value={form[field as keyof BuilderData] || ''}
                  onChangeText={(text) => handleChange(field as keyof BuilderData, text)}
                  placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                />
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

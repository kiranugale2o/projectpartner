import React, {useContext, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {X} from 'lucide-react-native';
import {AuthContext} from '../context/AuthContext';
import Toast from 'react-native-toast-message';

const SiteVisitModal = ({visible, onClose, id}) => {
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({
    propertyid: id,
    fullname: '',
    phone: '',
    salesPersonName: auth?.user?.name,
    salesPersonContact: auth?.user?.contact,
  });

  const handleSubmit = async () => {
    // Submit logic here
    if (formData.fullname === '' || formData.phone === '') {
      Toast.show({
        type: 'info',
        text1: 'All Values Required !',
      });
    }
    console.log('Booking submitted:', formData);
    try {
      const response = await fetch(`https://api.reparv.in/sales/enquiry/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
        Toast.show({
          type: 'error',
          text1: `Failed to save property. Status: ${response.status}`,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Property Enquiry Sent Successfully!',
          visibilityTime: 5000, // optional, default is 4000
        });

        // Close modal after 5 seconds
        setTimeout(() => {
          onClose();
        }, 5000);
      }

      // Clear form after success
      setFormData({
        ...formData,
        propertyid: id,
        fullname: '',
        phone: '',
      });
    } catch (err) {
      console.error('Error Booking Property:', err);
    }
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <X name="close" size={22} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>Conveniently Book a Property Visit</Text>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                value={formData.fullname}
                onChangeText={text =>
                  setFormData({...formData, fullname: text})
                }
                placeholder="Enter Full Name"
                style={styles.input}
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter Phone Number</Text>
              <TextInput
                value={formData.phone}
                onChangeText={text => {
                  if (/^\d{0,10}$/.test(text)) {
                    setFormData({...formData, phone: text});
                  }
                }}
                placeholder="Enter Phone Number"
                keyboardType="numeric"
                style={styles.input}
                maxLength={10}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Book Site Visit Now</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
              By registering, you’ll get a call from our agent.
            </Text>
          </ScrollView>
        </View>
      </View>
      <Toast />
    </Modal>
  );
};

export default SiteVisitModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '90%',
  },
  scroll: {
    gap: 14,
  },
  close: {
    alignSelf: 'flex-end',
    backgroundColor: '#FAFAFA',
    padding: 6,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: '#00000066',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  button: {
    backgroundColor: '#0BB501',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    color: '#00000066',
  },
});

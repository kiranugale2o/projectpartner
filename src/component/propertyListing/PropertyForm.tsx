import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { X } from 'lucide-react-native';

interface PropertyFormProps {
  isVisible: boolean;
  onClose: () => void;
}

const labels: Record<string, string> = {
  builderid: 'Builder ID',
  propertyCategory: 'Property Category',
  propertyApprovedBy: 'Approved By',
  propertyName: 'Property Name',
  address: 'Address',
  state: 'State',
  city: 'City',
  pincode: 'Pincode',
  location: 'Location',
  distanceFromCityCenter: 'Distance from City Center',
  totalSalesPrice: 'Total Sales Price',
  totalOfferPrice: 'Total Offer Price',
  stampDuty: 'Stamp Duty',
  registrationFee: 'Registration Fee',
  gst: 'GST',
  advocateFee: 'Advocate Fee',
  msebWater: 'MSEB & Water',
  maintenance: 'Maintenance',
  other: 'Other Charges',
  propertyType: 'Property Type',
  builtYear: 'Built Year',
  ownershipType: 'Ownership Type',
  builtUpArea: 'Built-up Area',
  carpetArea: 'Carpet Area',
  parkingAvailability: 'Parking Availability',
  totalFloors: 'Total Floors',
  floorNo: 'Floor No',
  loanAvailability: 'Loan Availability',
  propertyFacing: 'Property Facing',
  reraRegistered: 'RERA Registered',
  furnishing: 'Furnishing',
  waterSupply: 'Water Supply',
  powerBackup: 'Power Backup',
  locationFeature:'Location Feature',
    sizeAreaFeature:'Size / Area Feature ',
    parkingFeature:"Parking Feature",
    terraceFeature:'Balcony / Terrace Feature',
    ageOfPropertyFeature:'Age Of Property ',
    furnishingFeature:'Furnishing',
    amenitiesFeature:'Amenities Feature',
    propertyStatusFeature:'Property Status',
    floorNumberFeature:'Floor No Feature ',
    smartHomeFeature:'Smart Home Feature',
    securityBenefit:'Security Benefits',
    primeLocationBenefit:'Prime Location',
    rentalIncomeBenefit:'Rental Income Possibilities ',
    qualityBenefit:' Quality Construction',
    capitalAppreciationBenefit:'Capital Appreciation',
    ecofriendlyBenefit:'Eco-Friendly',
};

const stepFields: Record<number, string[]> = {
  1: [
    'builderid',
    'propertyCategory',
    'propertyApprovedBy',
    'propertyName',
    'address',
    'state',
    'city',
    'pincode',
    'location',
    'distanceFromCityCenter',
      'totalSalesPrice',
    'totalOfferPrice',
    'stampDuty',
    'registrationFee',
    'gst',
    'advocateFee',
    'msebWater',
    'maintenance',
    'other',
  ],
  2: [
  
    'propertyType',
    'builtYear',
    'ownershipType',
    'builtUpArea',
    'carpetArea',
    'parkingAvailability',
    'totalFloors',
    'floorNo',
    'loanAvailability',
    'propertyFacing',
    'reraRegistered',
    'furnishing', 'waterSupply', 'powerBackup',
    'locationFeature',
    'sizeAreaFeature',
    'parkingFeature',
    'terraceFeature',
    'ageOfPropertyFeature',
    'furnishingFeature',
    'amenitiesFeature',
    'propertyStatusFeature',
    'floorNumberFeature',
    'smartHomeFeature',
    'securityBenefit',
    'primeLocationBenefit',
    'rentalIncomeBenefit',
    'qualityBenefit',
    'capitalAppreciationBenefit',
    'ecofriendlyBenefit',
  ],
  3: ['furnishing', 'waterSupply', 'powerBackup'],
};

const PropertyForm: React.FC<PropertyFormProps> = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<any[]>([]);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, (response) => {
      if (!response.didCancel && response.assets) {
        setImages([...images, ...response.assets]);
      }
    });
  };

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    images.forEach((img, i) => {
      form.append('images', {
        uri: img.uri,
        name: img.fileName ?? `photo_${i}.jpg`,
        type: img.type ?? 'image/jpeg',
      });
    });

    console.log(formData,'fff');
    
    try {
      const res = await fetch('https://your-api.com/property', {
        method: 'POST',
        body: form,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.ok) {
        Alert.alert('Property submitted successfully!');
        onClose();
      } else {
        Alert.alert('Failed to submit');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error occurred');
    }
  };

  return (
     <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
  <View style={[styles.header,{justifyContent:'space-between'}]}>
            
            <Text style={styles.title}>Add Property :{step}{' )'} {step===1 && 'Property Details'}{step===2 && 'Overview Details'} {step===3 && 'Add Images'}</Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 5 }}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          
          </View>

          {/* Scrollable Content */}
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
   
         

          {stepFields[step].map((field) => {
            if (field === 'builderid' || field === 'propertyCategory') {
              return (
                <View key={field} style={styles.field}>
                  <Text style={styles.label}>{labels[field]}</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={formData[field] || ''}
                      onValueChange={(value) => handleInputChange(field, value)}
                      style={{ color: 'gray'}}
                    >
                      <Picker.Item label={`Select ${labels[field]}`} value="" />
                      <Picker.Item label="Option 1" value="option1" />
                      <Picker.Item label="Option 2" value="option2" />
                    </Picker>
                  </View>
                </View>
              );
            }

            return (
              <View key={field} style={styles.field}>
                <Text style={styles.label}>{labels[field] || field}</Text>
                <TextInput
                  style={styles.input}
                  value={formData[field] || ''}
                  onChangeText={(text) => handleInputChange(field, text)}
                />
              </View>
            );
          })}

          {step === 3 && (
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.label}>Upload Images</Text>
              <Button title="Pick Images" onPress={pickImage} />
              <ScrollView horizontal>
                {images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img.uri }}
                    style={{ width: 80, height: 80, margin: 5 }}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.buttonRow}>
            {step > 1 && (
              <TouchableOpacity style={styles.button} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>{step === 3 ? 'Submit' : 'Next'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
       
      </View>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: 600,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    overflow: 'hidden',
  },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  closeButton: {
    padding: 4,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexGrow: 1,
  },
  
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color:'black',
    marginVertical: 10,
  },
  field: {
    marginVertical: 8,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
  },
  pickerWrapper: {
    borderWidth: 0.5,
    borderColor: '#888',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 0,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#0BB501',
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PropertyForm;

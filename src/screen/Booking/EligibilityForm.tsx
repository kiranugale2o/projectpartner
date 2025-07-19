import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Picker } from '@react-native-picker/picker';
import DateSelectPopup from '../../component/DateSelectedPopup';
import Toast from 'react-native-toast-message';
interface IncomeDetails {
  income: string;
  depreciation: string;
  turnover: string;
}

interface BusinessExperience {
  years: string;
  months: string;
}

type FormData = {
  employmentType: 'Job' | 'Business';
  fullname: string;
  dateOfBirth: string;
  contactNo: string;
  panNumber: string;
  aadhaarNumber: string;
  state: string;
  email: string;
  city: string;
  pincode: string;

  // Job-specific
  employmentSector: string;
  workexperienceYear: string;
  workexperienceMonth: string;
  salaryType: string;
  grossPay: string;
  netPay: string;
  pfDeduction: string;
  otherIncome: string;
  yearIncome: string;
  monthIncome: string;
  ongoingEmi: string;

  // Business-specific
  businessSector: string;
  businessCategory: string;
  businessExperienceYears: string;
  businessExperienceMonths: string;
  businessOtherIncome: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sign_In'>;
const EligibilityForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(1);
  const [employmentType, setEmploymentType] = useState<'Job' | 'Business'>(
    'Job',
  );

  interface StateOption {
    id: number;
    state: string;
  }
  interface CityOptions {
    id: number;
    city: string;
    stateId: string;
  }

  const [states, setStates] = useState<StateOption[]>([]);
  const [cities, setCities] = useState<CityOptions[]>([]);
  const [formData, setFormData] = useState<FormData>({
    employmentType: 'Job',
    fullname: '',
    dateOfBirth: '',
    contactNo: '',
    panNumber: '',
    aadhaarNumber: '',
    city: '',
    state: '',
    email: '',
    pincode: '',

    // Job-specific
    employmentSector: '',
    workexperienceYear: '',
    workexperienceMonth: '',
    salaryType: '',
    grossPay: '',
    netPay: '',
    pfDeduction: '',
    otherIncome: '',
    yearIncome: '',
    monthIncome: '',
    ongoingEmi: '',

    // Business-specific
    businessSector: '',
    businessCategory: '',
    businessExperienceYears: '',
    businessExperienceMonths: '',
    businessOtherIncome: '',
  });

  const isAllFieldsFilled = () => {
    return Object.values(formData).every(
      value => value !== null && value.toString().trim() !== '',
    );
  };

  // Updating example:
  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  //date handle
  const handleOk = (date: any) => {
    setSelectedDate(date);
    //  console.log(selectedDate.day+' '+selectedDate.month +' '+selectedDate.year,'ffffffffddd');

    handleInputChange(
      'dateOfBirth',
      selectedDate?.day + ' ' + selectedDate?.month + ' ' + selectedDate?.year,
    );
    setShowPicker(false);
  };
  const handleData = async () => {
    if (employmentType === 'Job') {
      handleInputChange('employmentType', 'Job');
      console.log(formData);
      Alert.alert('job');
      submitFormData();
    } else {
      handleInputChange('employmentType', 'Business');
      console.log(formData);
      submitFormData();
    }
    // Logging:
  };

  // **Fetch States from API**
  const fetchStates = async () => {
    try {
      const response = await fetch('https://api.reparv.in/admin/states', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch States.');
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.error('Error fetching :', err);
    }
  };

  // **Fetch States from API**
  const fetchCities = async () => {
    try {
      const response = await fetch(
        `https://api.reparv.in/admin/cities/${formData?.state}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) throw new Error('Failed to fetch cities.');
      const data = await response.json();
      setCities(data);
    } catch (err) {
      console.error('Error fetching :', err);
    }
  };

  useEffect(() => {
    console.log('fetchStates runs every render');
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData?.state !== '') {
      fetchCities();
    }
  }, [formData.state]);

  const isFormValid =
    formData?.fullname !== '' &&
    formData?.dateOfBirth !== '' &&
    formData?.contactNo !== '' &&
    formData?.panNumber !== '' &&
    formData?.aadhaarNumber !== '' &&
    formData?.city !== '' &&
    formData?.state !== '' &&
    formData?.email !== '' &&
    formData?.pincode !== '' &&
    formData?.employmentSector !== '' &&
    formData?.workexperienceYear !== '' &&
    formData?.workexperienceMonth !== '' &&
    formData?.salaryType !== '' &&
    formData?.grossPay !== '' &&
    formData?.netPay !== '' &&
    formData?.pfDeduction !== '' &&
    formData?.otherIncome !== '' &&
    formData?.yearIncome !== '' &&
    formData?.monthIncome !== '' &&
    formData?.ongoingEmi !== '';

  const isBusinessFormValid =
    formData?.fullname !== '' &&
    formData?.dateOfBirth !== '' &&
    formData?.contactNo !== '' &&
    formData?.panNumber !== '' &&
    formData?.aadhaarNumber !== '' &&
    formData?.city !== '' &&
    formData?.state !== '' &&
    formData?.email !== '' &&
    formData?.pincode !== '' &&
    formData?.businessSector !== '' &&
    formData?.businessCategory !== '' &&
    formData?.businessExperienceYears !== '' &&
    formData?.businessExperienceMonths !== '' &&
    formData?.businessOtherIncome !== '';

  const submitFormData = async () => {
    const isJob = employmentType === 'Job';
    const isBusiness = employmentType === 'Business';

    if (isJob && !isFormValid) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    if (isBusiness && !isBusinessFormValid) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch(
        'https://api.reparv.in/customerapp/emiform',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Alert.alert('Form submitted successfully');
        Toast.show({
          type: 'success',
          text1: 'Check EMI Eligibility Form Submitted !',
        });
        console.log('Form submitted successfully:', data);
      } else {
        console.error('Submission failed:', data);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong! Try Again ',
        });
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Network Error', 'Failed to connect to server');
    } finally {
      setFormData({
        employmentType: 'Job',
        fullname: '',
        dateOfBirth: '',
        contactNo: '',
        panNumber: '',
        aadhaarNumber: '',
        city: '',
        state: '',
        email: '',
        pincode: '',
        employmentSector: '',
        workexperienceYear: '',
        workexperienceMonth: '',
        salaryType: '',
        grossPay: '',
        netPay: '',
        pfDeduction: '',
        otherIncome: '',
        yearIncome: '',
        monthIncome: '',
        ongoingEmi: '',
        businessSector: '',
        businessCategory: '',
        businessExperienceYears: '',
        businessExperienceMonths: '',
        businessOtherIncome: '',
      });
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const renderFields = () => {
    if (step === 1) {
      return (
        <ScrollView>
          {/* Form Fields */}
          <Text style={styles.label}>Full Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor={'gray'}
            value={formData.fullname}
            onChangeText={text => handleInputChange('fullname', text)}
          />

          <Text style={styles.label}>Date of Birth (D.O.B)</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.input}
          >
            <Text>
              {!selectedDate ? (
                <Text style={{ color: 'black' }}>Date</Text>
              ) : (
                <Text style={{ color: 'black' }}>
                  {`${selectedDate?.day}-${selectedDate?.month}-${selectedDate?.year}`}
                </Text>
              )}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateSelectPopup
              visible={showPicker}
              onCancel={() => setShowPicker(false)}
              onOk={handleOk}
            />
          )}

          <Text style={styles.label}>Contact No.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Contact Number"
            placeholderTextColor={'gray'}
            keyboardType="phone-pad"
            value={formData.contactNo}
            onChangeText={text => handleInputChange('contactNo', text)}
          />

          <Text style={styles.label}>PAN Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter PAN Number"
            placeholderTextColor={'gray'}
            value={formData.panNumber}
            onChangeText={text => handleInputChange('panNumber', text)}
          />

          <Text style={styles.label}>Aadhaar Number (12 digits)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Aadhaar Number"
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            value={formData.aadhaarNumber}
            onChangeText={text => handleInputChange('aadhaarNumber', text)}
          />

          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor={'gray'}
            value={formData.email}
            onChangeText={text => handleInputChange('email', text)}
          />

          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#00000066',
              }}
            >
              Select State
            </Text>

            <View
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#00000033',
                borderRadius: 4,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={formData.state}
                onValueChange={itemValue =>
                  handleInputChange('state', itemValue)
                }
                style={{
                  height: 50,
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                }}
              >
                <Picker.Item label="Select Your State" value="" />
                {states?.map((state, index) => (
                  <Picker.Item
                    key={index}
                    label={state?.state}
                    value={state?.state}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: 'gray',
              }}
            >
              Select City
            </Text>

            <View
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#00000033',
                borderRadius: 4,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={formData.city}
                onValueChange={itemValue =>
                  handleInputChange('city', itemValue)
                }
                style={{
                  height: 50,
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                }}
              >
                <Picker.Item label="Select Your City" value="" />
                {cities?.map((city, index) => (
                  <Picker.Item
                    key={index}
                    label={city?.city}
                    value={city?.city}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Pincode Number"
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            value={formData.pincode}
            onChangeText={text => handleInputChange('pincode', text)}
          />
        </ScrollView>
      );
    } else if (step === 2) {
      return (
        <ScrollView>
          <View style={{ padding: 16 }}>
            {/* Employment Sector */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  marginBottom: 8,
                }}
              >
                Employment Sector:
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Private', 'Government', 'Proprietorship'].map(option => (
                  <RadioButton
                    key={option}
                    label={option}
                    selected={formData.employmentSector === option}
                    onPress={() =>
                      handleInputChange('employmentSector', option)
                    }
                  />
                ))}
              </View>
            </View>

            {/* Monthly Salary Input Fields */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.4)',
                  marginBottom: 8,
                }}
              >
                Work Experience
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                  placeholder="Years"
                  placeholderTextColor="#999"
                  style={{
                    flex: 1,
                    height: 52,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 6,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#000',
                    marginRight: 8,
                  }}
                  value={formData.workexperienceYear}
                  onChangeText={text =>
                    handleInputChange('workexperienceYear', text)
                  }
                />
                <TextInput
                  placeholder="Months"
                  placeholderTextColor="#999"
                  style={{
                    flex: 1,
                    height: 52,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 6,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#000',
                  }}
                  value={formData.workexperienceMonth}
                  onChangeText={text =>
                    handleInputChange('workexperienceMonth', text)
                  }
                />
              </View>
            </View>

            {/* Salary Type */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  marginBottom: 8,
                }}
              >
                Salary Type:
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Account Transfer', 'Cash'].map(option => (
                  <RadioButton
                    key={option}
                    label={option}
                    selected={formData.salaryType === option}
                    onPress={() => handleInputChange('salaryType', option)}
                  />
                ))}
              </View>
            </View>

            {/*Salary Details Input Fields */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(0,0,0,0.4)',
                  marginBottom: 8,
                }}
              >
                Salary Details
              </Text>
              <View style={{ flexDirection: 'column', gap: 8 }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TextInput
                    placeholder="Gross Pay"
                    placeholderTextColor="#999"
                    style={{
                      flex: 1,
                      height: 52,
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.2)',
                      borderRadius: 6,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#000',
                      marginRight: 8,
                    }}
                    value={formData.grossPay}
                    onChangeText={text => handleInputChange('grossPay', text)}
                  />
                  <TextInput
                    placeholder="Net Pay"
                    placeholderTextColor="#999"
                    style={{
                      flex: 1,
                      height: 52,
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.2)',
                      borderRadius: 6,
                      paddingHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#000',
                    }}
                    value={formData.netPay}
                    onChangeText={text => handleInputChange('netPay', text)}
                  />
                </View>
                <TextInput
                  placeholder="PF Deduction"
                  placeholderTextColor="#999"
                  style={{
                    width: '48%',
                    height: 52,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 6,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#000',
                  }}
                  value={formData.pfDeduction}
                  onChangeText={text => handleInputChange('pfDeduction', text)}
                />
              </View>
            </View>
            {/* Other Income */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  marginBottom: 8,
                }}
              >
                Other Income (if any):
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {['Co-applicant', 'Rental Income', 'Other'].map(item => (
                  <RadioButton
                    key={item}
                    label={item}
                    selected={formData.otherIncome === item}
                    onPress={() => handleInputChange('otherIncome', item)}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else if (step === 3) {
      return (
        <ScrollView>
          <View style={{ padding: 16 }}>
            {/* Income from ITR */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                Yearly Income (as per ITR):
              </Text>
              <TextInput
                placeholder="₹ Enter Income"
                placeholderTextColor="#999"
                keyboardType="numeric"
                style={{
                  height: 52,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 6,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#000',
                }}
                value={formData.yearIncome}
                onChangeText={text => handleInputChange('yearIncome', text)}
              />
            </View>

            {/* Bank Statement Monthly Average */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                Monthly Avg. (Bank Statement):
              </Text>
              <TextInput
                placeholder="₹ Enter Avg. Balance"
                placeholderTextColor="#999"
                value={formData.monthIncome}
                onChangeText={text => handleInputChange('monthIncome', text)}
                keyboardType="numeric"
                style={{
                  height: 52,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 6,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#000',
                }}
              />
            </View>

            {/* Loan EMI Being Paid */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                Ongoing Loan EMI (if any):
              </Text>
              <TextInput
                placeholder="₹ Enter EMI"
                placeholderTextColor="#999"
                value={formData.ongoingEmi}
                onChangeText={text => handleInputChange('ongoingEmi', text)}
                keyboardType="numeric"
                style={{
                  height: 52,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 6,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#000',
                }}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  };

  const RadioButton = ({ label, selected, onPress }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        marginBottom: 8,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#000',
          marginRight: 8,
          backgroundColor: selected ? '#000' : 'transparent',
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          color: '#000',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderBusinessFields = () => {
    if (step === 1) {
      return (
        <ScrollView>
          {/* Form Fields */}
          <Text style={styles.label}>Full Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor={'gray'}
            value={formData.fullname}
            onChangeText={text => handleInputChange('fullname', text)}
          />

          <Text style={styles.label}>Date of Birth (D.O.B)</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.input}
          >
            <Text>
              {!selectedDate ? (
                <Text style={{ color: 'gray' }}>Date</Text>
              ) : (
                <Text style={{ color: 'black' }}>
                  {`${selectedDate?.day}-${selectedDate?.month}-${selectedDate?.year}`}
                </Text>
              )}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateSelectPopup
              visible={showPicker}
              onCancel={() => setShowPicker(false)}
              onOk={handleOk}
            />
          )}

          <Text style={styles.label}>Contact No.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Contact Number"
            placeholderTextColor={'gray'}
            keyboardType="phone-pad"
            value={formData.contactNo}
            onChangeText={text => handleInputChange('contactNo', text)}
          />

          <Text style={styles.label}>PAN Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter PAN Number"
            placeholderTextColor={'gray'}
            value={formData.panNumber}
            onChangeText={text => handleInputChange('panNumber', text)}
          />

          <Text style={styles.label}>Aadhaar Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Aadhaar Number"
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            value={formData.aadhaarNumber}
            onChangeText={text => handleInputChange('aadhaarNumber', text)}
          />
          <Text style={styles.label}>Email*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor={'gray'}
            value={formData.email}
            onChangeText={text => handleInputChange('email', text)}
          />

          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#00000066',
              }}
            >
              Select State
            </Text>

            <View
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#00000033',

                borderRadius: 4,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={formData.state}
                onValueChange={itemValue =>
                  handleInputChange('state', itemValue)
                }
                style={{
                  height: 50,
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                }}
              >
                <Picker.Item label="Select Your State" value="" />
                {states?.map((state, index) => (
                  <Picker.Item
                    key={index}
                    label={state?.state}
                    value={state?.state}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: 'gray',
              }}
            >
              Select City
            </Text>

            <View
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#00000033',
                borderRadius: 4,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={formData.city}
                onValueChange={itemValue =>
                  handleInputChange('city', itemValue)
                }
                style={{
                  height: 50,
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                }}
              >
                <Picker.Item label="Select Your City" value="" />
                {cities?.map((city, index) => (
                  <Picker.Item
                    key={index}
                    label={city?.city}
                    value={city?.city}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Pincode Number"
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            value={formData.pincode}
            onChangeText={text => handleInputChange('pincode', text)}
          />
        </ScrollView>
      );
    } else if (step === 2) {
      return (
        <ScrollView>
          <View style={{ padding: 16 }}>
            {/* Business Sector */}
            <Text style={styles.label}>Business Sector</Text>
            <View style={styles.row}>
              {['Services', 'Traders', 'Manufacturing'].map(item => (
                <RadioButton
                  key={item}
                  label={item}
                  selected={formData.businessSector === item}
                  onPress={() => handleInputChange('businessSector', item)}
                />
              ))}
            </View>

            {/* Business Category */}
            <Text style={styles.label}>Business Category</Text>
            <View style={styles.row}>
              {['Private Limited', 'Proprietorship', 'Partnership'].map(
                item => (
                  <RadioButton
                    key={item}
                    label={item}
                    selected={formData.businessCategory === item}
                    onPress={() => handleInputChange('businessCategory', item)}
                  />
                ),
              )}
            </View>

            {/* Business Experience */}
            <Text style={styles.label}>
              Business Experience (as per Shop Act / Registration)
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TextInput
                placeholder="Years"
                keyboardType="numeric"
                placeholderTextColor="gray"
                value={formData.businessExperienceYears}
                onChangeText={text =>
                  handleInputChange('businessExperienceYears', text)
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Months"
                keyboardType="numeric"
                placeholderTextColor="gray"
                value={formData.businessExperienceMonths}
                onChangeText={text =>
                  handleInputChange('businessExperienceMonths', text)
                }
                style={styles.input}
              />
            </View>

            {/* Yearly Income Details */}

            {/* Other Income */}
            <Text style={styles.label}>Other Income (if any)</Text>
            <View style={styles.row}>
              {['Co-applicant', 'Rental income'].map(item => (
                <RadioButton
                  key={item}
                  label={item}
                  selected={formData.businessOtherIncome === item}
                  onPress={() => handleInputChange('businessOtherIncome', item)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      );
    } else if (step === 3) {
      return (
        <ScrollView>
          <View style={{ padding: 16 }}>
            {/* Income from ITR */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                Yearly Income (as per ITR):
              </Text>
              <TextInput
                placeholder="₹ Enter Income"
                placeholderTextColor="#999"
                keyboardType="numeric"
                style={{
                  height: 52,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 6,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#000',
                }}
                value={formData.yearIncome}
                onChangeText={text => handleInputChange('yearIncome', text)}
              />
            </View>

            {/* Bank Statement Monthly Average */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                Monthly Avg. (Bank Statement):
              </Text>
              <TextInput
                placeholder="₹ Enter Avg. Balance"
                placeholderTextColor="#999"
                value={formData.monthIncome}
                onChangeText={text => handleInputChange('monthIncome', text)}
                keyboardType="numeric"
                style={{
                  height: 52,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 6,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#000',
                }}
              />
            </View>

            {/* Loan EMI Being Paid */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                Ongoing Loan EMI (if any):
              </Text>
              <TextInput
                placeholder="₹ Enter EMI"
                placeholderTextColor="#999"
                value={formData.ongoingEmi}
                onChangeText={text => handleInputChange('ongoingEmi', text)}
                keyboardType="numeric"
                style={{
                  height: 52,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 6,
                  paddingHorizontal: 20,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#000',
                }}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let's get started with your EMI offer</Text>
      <Text style={styles.sub}>Enter details</Text>

      {/* Employment Toggle */}
      <View style={styles.toggleContainer}>
        {['Job', 'Business'].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setEmploymentType(type as 'Job' | 'Business')}
            style={[
              styles.toggleButton,
              employmentType === type && styles.activeToggle,
            ]}
          >
            <Text
              style={
                employmentType === type
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Step Progress Bar */}
      <View style={styles.progressWrapper}>
        {[1, 2, 3].map((s, i) => (
          <React.Fragment key={i}>
            <View style={[styles.circle, step >= s && styles.activeCircle]} />
            {s < 3 && (
              <View style={[styles.line, step > s && styles.activeLine]} />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Conditional content */}
      {employmentType === 'Job' ? (
        <View style={{ flex: 1 }}>
          <View
            style={{ padding: 12, backgroundColor: '#F3F3F3', borderRadius: 6 }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              Job Form Section
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              Enter your job title, company, and income.
            </Text>
          </View>
          <ScrollView style={{ flex: 1 }}>{renderFields()}</ScrollView>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{ padding: 12, backgroundColor: '#E0F7EC', borderRadius: 6 }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>
              Business Form Section
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8, color: 'black' }}>
              Enter your business name, type, and annual turnover.
            </Text>
          </View>
          {renderBusinessFields()}
        </View>
      )}
      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        {step > 1 && (
          <TouchableOpacity style={styles.navButton} onPress={prevStep}>
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 3 && (
          <TouchableOpacity style={styles.navButton} onPress={nextStep}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
        {step === 3 && (
          <TouchableOpacity
            style={[styles.navButton, styles.submitButton]}
            onPress={handleData}
          >
            <Text style={styles.navButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
      <Toast />

      {/* Form Fields */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: 'black',
  },

  sub: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#0BB501',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#444',
  },
  progressWrapper: {
    flexDirection: 'row',
    width: '96%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  line: {
    width: '35%',
    height: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
    borderRadius: 2,
  },
  activeLine: {
    backgroundColor: '#0BB501',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
  },
  activeCircle: {
    backgroundColor: '#0BB501',
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#0BB501',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#076300',
  },
});

export default EligibilityForm;

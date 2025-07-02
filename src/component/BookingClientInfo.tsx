import React, {useState} from 'react';

import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  Linking,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import Svg, {Path} from 'react-native-svg';
import CheckBox from '@react-native-community/checkbox';
import {RootStackParamList} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const optionsR = [
  {label: 'Pending', value: 'pending', color: '#FFCA00', select: false},
  {label: 'Booked', value: 'ongoing', color: '#0BB501', select: false},
];

const optionsL = [
  {label: 'Token', value: 'token', color: '#076300', select: false},
  {label: 'Cancelled', value: 'cancelled', color: '#EF4444', select: false},
];

interface BookingData {
  bookingid: number;
  enquirersid: number;
  amount: number;
  status: string;
  propertyid: number | null;
  customer: string;
  contact: string;
  salespersonid: number;
  fullname: string;
  propertyName: string | null;
}

interface BookingClientInfoCardProps {
  data: BookingData;
}

const BookingClientInfoCard: React.FC<BookingClientInfoCardProps> = ({
  data,
}) => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
  const navigation = useNavigation<NavigationProp>();

  const [selectedValue, setSelectedValue] = useState(data.status);
  const [modalVisible, setModalVisible] = useState(false);

  const selected =
    !optionsL.find(opt => opt.value === selectedValue)?.select ||
    !optionsR.find(opt => opt.value === selectedValue)?.select;
  console.log(selected);

  const selectColor =
    optionsL.find(opt => opt.value === selectedValue)?.color ||
    optionsR.find(opt => opt.value === selectedValue)?.color;

  const selectedLabel =
    optionsL.find(opt => opt.value === selectedValue)?.label ||
    optionsR.find(opt => opt.value === selectedValue)?.label;

  const selectedColor =
    optionsL.find(opt => opt.value === selectedValue)?.color ||
    optionsR.find(opt => opt.value === selectedValue)?.color;
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Left section */}
      <View style={styles.leftContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{data?.customer}</Text>
          <View style={styles.phoneWrapper}>
            <View style={styles.iconBlueCircle}>
              <Svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                <Path
                  d="M8.37124 8.10403L8.0679 8.40603C8.0679 8.40603 7.3459 9.12336 5.3759 7.16469C3.4059 5.20603 4.1279 4.48869 4.1279 4.48869L4.31857 4.29803C4.7899 3.83003 4.83457 3.07803 4.42324 2.52869L3.58324 1.40669C3.0739 0.726694 2.09057 0.636694 1.50724 1.21669L0.460571 2.25669C0.171904 2.54469 -0.0214293 2.91669 0.001904 3.33003C0.061904 4.38803 0.540571 6.66336 3.2099 9.31803C6.04124 12.1327 8.6979 12.2447 9.7839 12.1434C10.1279 12.1114 10.4266 11.9367 10.6672 11.6967L11.6139 10.7554C12.2539 10.12 12.0739 9.03003 11.2552 8.58536L9.9819 7.89269C9.44457 7.60136 8.79124 7.68669 8.37124 8.10403Z"
                  fill="#0068FF"
                />
              </Svg>
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${data?.contact}`);
              }}>
              <Text style={styles.phone}>{data?.contact}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.projectName}>
          {data?.propertyName === null ? 'property name' : data?.propertyName}
        </Text>
      </View>

      {/* Right section - Visit Schedule */}
      <View
        style={[
          styles.container2,
          {backgroundColor: `${selectedColor}20`, borderRadius: 20},
        ]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingHorizontal: 1,
            padding: 9,
            paddingVertical: 1,
            borderRadius: 20,
            gap: 5,
          }}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text
            style={[
              styles.label,
              {
                color: `${selectColor}`,
              },
            ]}>
            {data.status}
          </Text>

          {/* <Text style={styles.selectText}>{selectedLabel}</Text> */}
        </TouchableOpacity>

        <Modal transparent visible={false} animationType="slide">
          <View style={styles.modalOverlay}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>X</Text>
            </TouchableOpacity>
            <View style={styles.modalContainer}>
              <FlatList
                data={optionsR}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item.value)}>
                    <View
                      style={[
                        styles.checkbox,
                        selectedValue === item.value && styles.checked,
                      ]}>
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
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              <FlatList
                data={optionsL}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      handleSelect(item.value);
                    }}>
                    <View
                      style={[
                        styles.checkbox,
                        selectedValue === item.value && styles.checked,
                      ]}>
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
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    gap: 15,
    width: '100%',
    height: 72,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    width: 195,
    height: 40,
  },
  userInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
    //width: 105,
    height: 40,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    // width: 105,
    height: 17,
  },
  iconBlueCircle: {
    width: 12,
    height: 11.33,

    borderRadius: 6,
  },
  phone: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0068FF',
  },
  projectName: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: 4,
    width: 100,
  },

  container2: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#E9F2FF',

    height: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0068FF',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
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
  },
  optionText: {
    fontSize: 16,
    color: '#333',
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
});

export default BookingClientInfoCard;

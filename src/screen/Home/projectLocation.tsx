import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Keyboard,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {RootStackParamList} from '../../types';
import {useNavigation} from '@react-navigation/native';

const ProjectLocation: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<NavigationProp>();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // Hide tab bar when keyboard is shown
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // Show tab bar when keyboard is hidden
      },
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.container}>
        {/* Date & Time */}
        <View style={styles.rowBox}>
          <View style={styles.iconRow}>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={styles.icon}>
              <Path
                d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8ZM12 14C11.7167 14 11.4792 13.9042 11.2875 13.7125C11.0958 13.5208 11 13.2833 11 13C11 12.7167 11.0958 12.4792 11.2875 12.2875C11.4792 12.0958 11.7167 12 12 12C12.2833 12 12.5208 12.0958 12.7125 12.2875C12.9042 12.4792 13 12.7167 13 13C13 13.2833 12.9042 13.5208 12.7125 13.7125C12.5208 13.9042 12.2833 14 12 14ZM8 14C7.71667 14 7.47917 13.9042 7.2875 13.7125C7.09583 13.5208 7 13.2833 7 13C7 12.7167 7.09583 12.4792 7.2875 12.2875C7.47917 12.0958 7.71667 12 8 12C8.28333 12 8.52083 12.0958 8.7125 12.2875C8.90417 12.4792 9 12.7167 9 13C9 13.2833 8.90417 13.5208 8.7125 13.7125C8.52083 13.9042 8.28333 14 8 14ZM16 14C15.7167 14 15.4792 13.9042 15.2875 13.7125C15.0958 13.5208 15 13.2833 15 13C15 12.7167 15.0958 12.4792 15.2875 12.2875C15.4792 12.0958 15.7167 12 16 12C16.2833 12 16.5208 12.0958 16.7125 12.2875C16.9042 12.4792 17 12.7167 17 13C17 13.2833 16.9042 13.5208 16.7125 13.7125C16.5208 13.9042 16.2833 14 16 14ZM12 18C11.7167 18 11.4792 17.9042 11.2875 17.7125C11.0958 17.5208 11 17.2833 11 17C11 16.7167 11.0958 16.4792 11.2875 16.2875C11.4792 16.0958 11.7167 16 12 16C12.2833 16 12.5208 16.0958 12.7125 16.2875C12.9042 16.4792 13 16.7167 13 17C13 17.2833 12.9042 17.5208 12.7125 17.7125C12.5208 17.9042 12.2833 18 12 18ZM8 18C7.71667 18 7.47917 17.9042 7.2875 17.7125C7.09583 17.5208 7 17.2833 7 17C7 16.7167 7.09583 16.4792 7.2875 16.2875C7.47917 16.0958 7.71667 16 8 16C8.28333 16 8.52083 16.0958 8.7125 16.2875C8.90417 16.4792 9 16.7167 9 17C9 17.2833 8.90417 17.5208 8.7125 17.7125C8.52083 17.9042 8.28333 18 8 18ZM16 18C15.7167 18 15.4792 17.9042 15.2875 17.7125C15.0958 17.5208 15 17.2833 15 17C15 16.7167 15.0958 16.4792 15.2875 16.2875C15.4792 16.0958 15.7167 16 16 16C16.2833 16 16.5208 16.0958 16.7125 16.2875C16.9042 16.4792 17 16.7167 17 17C17 17.2833 16.9042 17.5208 16.7125 17.7125C16.5208 17.9042 16.2833 18 16 18Z"
                fill="#076300"
              />
            </Svg>

            <Text style={styles.greenText}>Friday, April 4, 2025</Text>
          </View>
          <View style={styles.iconRow}>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={styles.icon}>
              <Path
                d="M15.3 16.7L16.7 15.3L13 11.6V7H11V12.4L15.3 16.7ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20Z"
                fill="#076300"
              />
            </Svg>

            <Text style={styles.greenText}>10:00AM</Text>
          </View>
        </View>

        {/* Use Current Location Button */}
        <TouchableOpacity style={styles.locationButton}>
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={styles.icon}>
            <Path
              d="M12.9 21L10.05 13.95L3 11.1V9.7L21 3L14.3 21H12.9ZM13.55 17.3L17.6 6.4L6.7 10.45L11.6 12.4L13.55 17.3Z"
              fill="#076300"
            />
          </Svg>

          <Text style={styles.greenText}>Use Current Location</Text>
        </TouchableOpacity>

        {/* OR Separator */}
        <View style={styles.separatorRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Address Fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street Address</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter Street Address"
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.cityZipRow}>
          <View style={[styles.inputGroup, {flex: 1}]}>
            <Text style={styles.label}>City</Text>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Enter City"
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={[styles.inputGroup, {flex: 1}]}>
            <Text style={styles.label}>ZIP Code</Text>
            <View style={styles.inputBox}>
              <TextInput
                placeholder="Enter ZIP Code"
                style={styles.input}
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Landmark (Optional)</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Enter Landmark"
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.selectPartnerButton,
          {display: keyboardVisible ? 'none' : 'flex'},
        ]}
        onPress={() => {
          navigation.navigate('SelectTerritoryPartner');
        }}>
        <Text style={styles.selectPartnerText}>Select Partner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProjectLocation;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    gap: 24,
  },
  rowBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    gap: 16,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  greenText: {
    color: '#076300',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  locationButton: {
    flexDirection: 'row',
    borderColor: '#076300',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  orText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  inputGroup: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2E2A40',
    marginBottom: 8,
  },
  inputBox: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    fontSize: 14,
    color: 'black',
  },
  cityZipRow: {
    flexDirection: 'row',
    gap: 16,
  },
  selectPartnerButton: {
    position: 'absolute', // This is crucial
    bottom: 5, // Distance from the bottom of the screen
    left: 10,
    right: 5,
    // marginHorizontal: 'auto',
    marginInline: 'auto',
    width: '95%',
    height: 45,
    backgroundColor: '#0BB501',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 10,
  },
  selectPartnerText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26, // 160% of 16px
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

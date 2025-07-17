import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Eye, EyeOff } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmshowPassword, setConfirmShowPassword] = useState(false);

  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'SetNewPassword'
  >;
  const navigation = useNavigation<NavigationProp>();

  const handleConfirm = async () => {
    if (password === confirmPassword) {
      await handleResetPassword();
    } else {
      Toast.show({
        type: 'info',
        text1: 'Mismatch',
        text2: 'Passwords do not match.',
      });
    }
  };

  const handleResetPassword = async () => {
    const email = await AsyncStorage.getItem('email');

    if (confirmPassword.length < 6) {
      return Alert.alert('Weak Password', 'Use at least 6 characters.');
    }

    try {
      const res = await fetch(
        'https://api.reparv.in/salesapp/client/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, newPassword: confirmPassword }),
        },
      );

      const data = await res.json();

      if (data.success) {
        await AsyncStorage.setItem('email', '');
        navigation.navigate('PasswordChangedSuccess');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: `Error, ${data.message || 'Reset failed'} `,
        });
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong.',
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
      }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Set a new password</Text>
        <Text style={styles.subtext}>
          Create a new password. Ensure it differs from previous ones for
          security
        </Text>

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye color={'gray'} size={15} />
            ) : (
              <EyeOff color={'gray'} size={15} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>Confirm Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter password"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            secureTextEntry={!confirmshowPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => setConfirmShowPassword(!confirmshowPassword)}
          >
            {confirmshowPassword ? (
              <Eye color={'gray'} size={15} />
            ) : (
              <EyeOff color={'gray'} size={15} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default SetNewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 25,
  },
  heading: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Inter',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.4)',
    fontFamily: 'Inter',
    marginBottom: 30,
    lineHeight: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Inter',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    height: 50,
    width: '90%',
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#000',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#0BB501',
    height: 48,
    borderRadius: 6,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingRight: 12,
    marginBottom: 16,
  },
  iconWrapper: {
    paddingHorizontal: 4,
  },
});

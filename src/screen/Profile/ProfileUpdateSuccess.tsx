// ProfileUpdateSuccess.tsx
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../types';
import {useNavigation} from '@react-navigation/native';

const ProfileUpdateSuccess = () => {
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ProfileUpdateSuccess'
  >;
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Profile Updated Successfully!</Text>
      <Text style={styles.subtitle}>Your changes have been saved.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()} // change as needed
      >
        <Text style={styles.buttonText}>Go Back to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileUpdateSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#22c55e',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

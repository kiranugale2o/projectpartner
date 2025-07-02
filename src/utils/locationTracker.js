import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Platform, Button } from "react-native";
import Geolocation from "react-native-geolocation-service";

const LocationTracker = () => {
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true; // iOS handles it differently
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {
        console.log("Current position:", position);
        setLocation(position);
      },
      (error) => {
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Get Current Location" onPress={getCurrentLocation} />
      {location && (
        <Text>
          Latitude: {location.coords.latitude}
          {"\n"}
          Longitude: {location.coords.longitude}
        </Text>
      )}
    </View>
  );
};

export default LocationTracker;

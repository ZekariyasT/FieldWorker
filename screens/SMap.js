import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { db } from '../config';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../config';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 9.0;
const LONGITUDE = 40.0;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function SMap() {
  // State variables
  const [mapRegion, setMapRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [userName, setUserName] = useState('');
  const [latitudeInput, setLatitudeInput] = useState('');
  const [longitudeInput, setLongitudeInput] = useState('');

  // Function to handle setting a custom location
  const handleSetLocation = () => {
    // Parse latitudeInput and longitudeInput to numbers
    const latitude = parseFloat(latitudeInput);
    const longitude = parseFloat(longitudeInput);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } else {
      setErrorMsg('Invalid latitude or longitude');
    }
  };

  // Function to fetch user's name based on their email
  const fetchUserName = async (userEmail) => {
    const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const name = userData.name;
      setUserName(name);
    } else {
      console.error('User not found');
    }
  };

  // useEffect for tracking location
  useEffect(() => {
    const userLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });

        const currentUser = auth.currentUser;
        if (currentUser) {
          const userEmail = currentUser.email;
          fetchUserName(userEmail);
        } else {
          console.error('No user is currently logged in');
        }

        console.log(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      {/* Map view */}
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>

      {/* Input fields for latitude and longitude */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Latitude"
          value={latitudeInput}
          onChangeText={(text) => setLatitudeInput(text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Longitude"
          value={longitudeInput}
          onChangeText={(text) => setLongitudeInput(text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Set Location" onPress={handleSetLocation} />
      </View>

      {/* Display error message */}
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingLeft: 8,
  },
});

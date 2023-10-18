// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { db } from '../config';
// import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
// import { auth } from '../config';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 9.0;
// const LONGITUDE = 40.0;
// const LATITUDE_DELTA = 0.0022;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// export default function Map() {
//   const [mapRegion, setMapRegion] = useState({
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [isTracking, setIsTracking] = useState(false);
//   const [isWorking, setIsWorking] = useState(false); 
//   const [userName, setUserName] = useState(''); // Added userName state

//   const startWork = () => {
//     setIsTracking(true);
//     setIsWorking(true); 
//   };

//   const endWork = () => {
//     setIsTracking(false);
//     setIsWorking(false); 
//   };

//   const fetchUserName = async (userEmail) => {
//     const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
//     const querySnapshot = await getDocs(userQuery);

//     if (!querySnapshot.empty) {
//       const userData = querySnapshot.docs[0].data();
//       const name = userData.name;
//       setUserName(name);
//     } else {
//       console.error('User not found');
//     }
//   };

//   const sendLocationToFirestore = async (userEmail) => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

//       await addDoc(collection(db, 'locations'), {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         timestamp: new Date(),
//         email: userEmail,
//         name: userName,
//       });

//       console.log('Location sent to Firestore:', location.coords.latitude, location.coords.longitude);
//     } catch (error) {
//       console.error('Error sending location to Firestore:', error);
//     }
//   };

//   useEffect(() => {
//     if (isTracking) {
//       const locationTrackingInterval = setInterval(() => {
//         const currentUser = auth.currentUser;
//         if (currentUser) {
//           const userEmail = currentUser.email;
//           sendLocationToFirestore(userEmail);
//         } else {
//           console.error('No user is currently logged in');
//         }
//       }, 60000);

//       return () => {
//         clearInterval(locationTrackingInterval);
//       };
//     }
//   }, [isTracking]);

//   useEffect(() => {
//     const userLocation = async () => {
//       try {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           setErrorMsg('Permission to access location was denied');
//           return;
//         }

//         let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

//         setMapRegion({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         });

//         const currentUser = auth.currentUser;
//         if (currentUser) {
//           const userEmail = currentUser.email;
//           fetchUserName(userEmail);
//         } else {
//           console.error('No user is currently logged in');
//         }

//         console.log(location.coords.latitude, location.coords.longitude);
//       } catch (error) {
//         console.error('Error getting location:', error);
//       }
//     };

//     userLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} region={mapRegion}>
//         <Marker coordinate={mapRegion} title='Marker' />
//       </MapView>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[
//             styles.workButton,
//             { backgroundColor: isWorking ? 'orange' : 'dodgerblue' },
//           ]}
//           onPress={isWorking ? endWork : startWork}
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>
//             {isWorking ? 'End Work' : 'Start Work'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {errorMsg && <Text>{errorMsg}</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center', 
//     padding: 16,
//   },
//   workButton: {
//     width: 100, 
//     height: 100, 
//     borderRadius: 75, 
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { db } from '../config';
// import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
// import { auth } from '../config';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 9.0;
// const LONGITUDE = 40.0;
// const LATITUDE_DELTA = 0.0022;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// export default function Map() {
//   const [mapRegion, setMapRegion] = useState({
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [isTracking, setIsTracking] = useState(false);
//   const [isWorking, setIsWorking] = useState(false);
//   const [userName, setUserName] = useState('');

//   const startWork = () => {
//     setIsTracking(true);
//     setIsWorking(true);
//   };

//   const endWork = () => {
//     setIsTracking(false);
//     setIsWorking(false);
//   };

//   const fetchUserName = async (userEmail) => {
//     try {
//       const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
//       const querySnapshot = await getDocs(userQuery);

//       if (!querySnapshot.empty) {
//         const userData = querySnapshot.docs[0].data();
//         const name = userData.name;
//         setUserName(name);
//       } else {
//         console.error('User not found');
//       }
//     } catch (error) {
//       console.error('Error fetching user name:', error);
//     }
//   };

//   const sendLocationToFirestore = async (userEmail, name) => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

//       await addDoc(collection(db, 'locations'), {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         timestamp: new Date(),
//         email: userEmail,
//         name: name,
//       });

//       console.log('Location sent to Firestore:', location.coords.latitude, location.coords.longitude);
//     } catch (error) {
//       console.error('Error sending location to Firestore:', error);
//     }
//   };

//   useEffect(() => {
//     if (isTracking) {
//       const locationTrackingInterval = setInterval(() => {
//         const currentUser = auth.currentUser;
//         if (currentUser) {
//           const userEmail = currentUser.email;
//           sendLocationToFirestore(userEmail, userName); // Pass the userName to the function
//         } else {
//           console.error('No user is currently logged in');
//         }
//       }, 60000);

//       return () => {
//         clearInterval(locationTrackingInterval);
//       };
//     }
//   }, [isTracking]);

//   useEffect(() => {
//     const userLocation = async () => {
//       try {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           setErrorMsg('Permission to access location was denied');
//           return;
//         }

//         let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

//         setMapRegion({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         });

//         const currentUser = auth.currentUser;
//         if (currentUser) {
//           const userEmail = currentUser.email;
//           await fetchUserName(userEmail);
//           sendLocationToFirestore(userEmail, userName);
//         } else {
//           console.error('No user is currently logged in');
//         }

//         console.log(location.coords.latitude, location.coords.longitude);
//       } catch (error) {
//         console.error('Error getting location:', error);
//       }
//     };

//     userLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} region={mapRegion}>
//         <Marker coordinate={mapRegion} title='Marker' />
//       </MapView>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[
//             styles.workButton,
//             { backgroundColor: isWorking ? 'orange' : 'dodgerblue' },
//           ]}
//           onPress={isWorking ? endWork : startWork}
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>
//             {isWorking ? 'End Work' : 'Start Work'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {errorMsg && <Text>{errorMsg}</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   workButton: {
//     width: 100,
//     height: 100,
//     borderRadius: 75,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
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

export default function Map() {
  const [mapRegion, setMapRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [userName, setUserName] = useState('');

  const startWork = async () => {
    setIsWorking(true);
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userEmail = currentUser.email;
      await fetchUserName(userEmail);
      setIsTracking(true);
    } else {
      console.error('No user is currently logged in');
    }
  };

  const endWork = () => {
    setIsTracking(false);
    setIsWorking(false);
  };

  const fetchUserName = async (userEmail) => {
    try {
      const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const name = userData.name;
        setUserName(name);
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const sendLocationToFirestore = async (userEmail, name) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

      await addDoc(collection(db, 'locations'), {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: new Date(),
        email: userEmail,
        name: name,
      });

      console.log('Location sent to Firestore:', location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Error sending location to Firestore:', error);
    }
  };

  useEffect(() => {
    if (isTracking) {
      const locationTrackingInterval = setInterval(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userEmail = currentUser.email;
          sendLocationToFirestore(userEmail, userName); // Pass the userName to the function
        } else {
          console.error('No user is currently logged in');
        }
      }, 60000);

      return () => {
        clearInterval(locationTrackingInterval);
      };
    }
  }, [isTracking]);

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

        console.log(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.workButton,
            { backgroundColor: isWorking ? 'orange' : 'dodgerblue' },
          ]}
          onPress={isWorking ? endWork : startWork}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isWorking ? 'End Work' : 'Start Work'}
          </Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  workButton: {
    width: 100,
    height: 100,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

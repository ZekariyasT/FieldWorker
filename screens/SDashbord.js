// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button, Dimensions, Linking } from 'react-native';
// import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions directly

// import { db } from '../config'; // Make sure to import the Firestore instance correctly

// const LocationList = () => {
//   const [locations, setLocations] = useState([]);
//   const [selectedName, setSelectedName] = useState(null);
//   const [numColumns, setNumColumns] = useState(2); // Initial number of columns

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const locationData = [];
//         const querySnapshot = await getDocs(collection(db, 'locations'));
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           locationData.push({
//             id: doc.id,
//             ...data,
//           });
//         });
//         setLocations(locationData);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleNamePress = (name) => {
//     setSelectedName(name);
//   };

//   const handleLayoutChange = () => {
//     const screenWidth = Dimensions.get('window').width;
//     const newNumColumns = Math.floor(screenWidth / 200); // Adjust 200 as needed for your design
//     setNumColumns(newNumColumns);
//   };

//   const openLocationInMaps = (latitude, longitude) => {
//     const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//     Linking.openURL(url);
//   };

//   const renderLocationDetails = () => {
//     if (!selectedName) return null;
//     const locationsWithSelectedName = locations.filter((location) => location.name === selectedName);

//     return (
//       <View style={styles.modalContent}>
//         <Text>Name: {selectedName}</Text>
//         <FlatList
//           data={locationsWithSelectedName}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.locationDetails}>
//               <View style={styles.detailsRow}>
//                 <Text style={styles.detailLabel}>Latitude:</Text>
//                 <Text style={styles.detailValue}>{item.latitude}</Text>
//               </View>
//               <View style={styles.detailsRow}>
//                 <Text style={styles.detailLabel}>Longitude:</Text>
//                 <Text style={styles.detailValue}>{item.longitude}</Text>
//               </View>
//               <View style={styles.detailsRow}>
//                 <Text style={styles.detailLabel}>Timestamp:</Text>
//                 <Text style={styles.detailValue}>{item.timestamp.toDate().toString()}</Text>
//               </View>
//               <TouchableOpacity
//                 onPress={() => openLocationInMaps(item.latitude, item.longitude)}
//                 style={styles.mapLink}
//               >
//                 <Text style={styles.mapLinkText}>View in Maps</Text>
//               </TouchableOpacity>
//               <View style={styles.separator} />
//             </View>
//           )}
//         />
//         <Button title="Close" onPress={() => setSelectedName(null)} />
//       </View>
//     );
//   };

//   const renderItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.nameBox} onPress={() => handleNamePress(item)}>
//         <Text style={styles.nameText}>{item}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.dashboardTitle}>Dashboard</Text>
//       <FlatList
//         data={Array.from(new Set(locations.map((location) => location.name)))} // Get unique location names
//         keyExtractor={(item) => item}
//         renderItem={renderItem}
//         onLayout={handleLayoutChange} // Listen to layout changes to update the number of columns
//         numColumns={numColumns}
//       />
//       <Modal animationType="slide" transparent={true} visible={selectedName !== null}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContentContainer}>
//             {renderLocationDetails()}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   dashboardTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   nameBox: {
//     backgroundColor: 'lightblue',
//     borderRadius: 20, // Make the box larger with rounded corners
//     padding: 20, // Increase padding for larger box
//     margin: 10, // Increase margin for spacing
//     alignItems: 'center', // Center text horizontally
//     justifyContent: 'center', // Center text vertically
//     flex: 1, // Ensure equal height for all boxes in the same row
//   },
//   nameText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContentContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   separator: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     marginBottom: 10,
//   },
//   locationDetails: {
//     marginBottom: 20,
//     marginLeft: 60,
//     marginRight: 60,
//   },
//   detailsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//   },
//   detailValue: {
//     fontSize: 16,
//   },
//   mapLink: {
//     backgroundColor: 'lightblue',
//     borderRadius: 10,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mapLinkText: {
//     fontSize: 16,
//     color: 'blue',
//   },
// });

// export default LocationList;



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   TextInput,
//   Button,
//   Dimensions,
//   Linking,
// } from 'react-native';
// import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions directly

// import { db } from '../config'; // Make sure to import the Firestore instance correctly

// const LocationList = () => {
//   const [locations, setLocations] = useState([]);
//   const [selectedName, setSelectedName] = useState(null);
//   const [numColumns, setNumColumns] = useState(2); // Initial number of columns
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const locationData = [];
//         const querySnapshot = await getDocs(collection(db, 'locations'));
        
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           locationData.push({
//             id: doc.id,
//             ...data,
//           });
//         });
//         setLocations(locationData);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleNamePress = (name) => {
//     setSelectedName(name);
//   };
  

//   const handleLayoutChange = () => {
//     const screenWidth = Dimensions.get('window').width;
//     const newNumColumns = Math.floor(screenWidth / 200); // Adjust 200 as needed for your design
//     setNumColumns(newNumColumns);
//   };

//   const openLocationInMaps = (latitude, longitude) => {
//     const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
//     Linking.openURL(url);
//   };

//   const renderLocationDetails = () => {
//     if (!selectedName) return null;
//     const locationsWithSelectedName = locations.filter(
//       (location) => location.name === selectedName
//     );

//     return (
//       <View style={styles.modalContent}>
//         <Text>Name: {selectedName}</Text>
//         <FlatList
//           data={locationsWithSelectedName}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.locationDetails}>
//               <View style={styles.detailsRow}>
//                 <Text style={styles.detailLabel}>Latitude:</Text>
//                 <Text style={styles.detailValue}>{item.latitude}</Text>
//               </View>
//               <View style={styles.detailsRow}>
//                 <Text style={styles.detailLabel}>Longitude:</Text>
//                 <Text style={styles.detailValue}>{item.longitude}</Text>
//               </View>
//               <View style={styles.detailsRow}>
//                 <Text style={styles.detailLabel}>Timestamp:</Text>
//                 <Text style={styles.detailValue}>
//                   {item.timestamp.toDate().toString()}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 onPress={() => openLocationInMaps(item.latitude, item.longitude)}
//                 style={styles.mapLink}
//               >
//                 <Text style={styles.mapLinkText}>View in Maps</Text>
//               </TouchableOpacity>
//               <View style={styles.separator} />
//             </View>
//           )}
//         />
//         <Button title="Close" onPress={() => setSelectedName(null)} />
//       </View>
//     );
//   };

//   const renderItem = ({ item }) => {
//     return (
//       <View  style={styles.bigBox}>

//         <TouchableOpacity
//           style={styles.nameBox}
//           onPress={() => handleNamePress(item)}
//         >
//           <Text style={styles.nameText}>{item}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.dashboardTitle}>Dashboard</Text>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search by name"
//         onChangeText={(text) => setSearchText(text)} // Update searchText state on input change
//         value={searchText}
//       />
//       <FlatList
//         data={Array.from(new Set(locations.map((location) => location.name)))} // Get unique location names
//         keyExtractor={(item) => item}
//         renderItem={renderItem}
//         onLayout={handleLayoutChange} // Listen to layout changes to update the number of columns
//         numColumns={numColumns}
//       />
//       <Modal animationType="slide" transparent={true} visible={selectedName !== null}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContentContainer}>{renderLocationDetails()}</View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   dashboardTitle: {
//     marginTop:20,
//     fontStyle:'normal',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   searchInput: {
//     backgroundColor: 'lightgrey',
//     borderRadius: 10,
//     padding: 10,
//     margin: 10,
//   },
//   nameBox: {
//     backgroundColor: 'dodgerblue', // Change name box color
//     borderRadius: 10,
//     padding: 20,
//     margin: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // flex: 1,
//     width: 150, // Set the width to make the box square
//     height: 150,
//   },
//   bigBox:{
//     borderColor: 'dodgerblue', // Add a light grey border
//   borderWidth: 1, // Border width
//   borderRadius: 3, // Add rounded corners
//   padding: 20, // Adjust padding for spacing
//   margin: 5, // Adjust margin for spacing between big boxes
//   alignItems: 'center',
//   justifyContent: 'center',
//   flex: 1,

//   },

//   nameText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'white', // Text color
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContentContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   separator: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     marginBottom: 10,
//   },
//   locationDetails: {
//     marginBottom: 20,
//     marginLeft: 60,
//     marginRight: 60,
//   },
//   detailsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//   },
//   detailValue: {
//     fontSize: 16,
//   },
//   mapLink: {
//     backgroundColor: 'dodgerblue', // Change map link button color
//     borderRadius: 10,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mapLinkText: {
//     fontSize: 16,
//     color: 'white', // Change map link text color
//   },
// });

// export default LocationList;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Dimensions,
  Linking,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions directly

import { db } from '../config'; // Make sure to import the Firestore instance correctly

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [numColumns, setNumColumns] = useState(2); // Initial number of columns
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationData = [];
        const querySnapshot = await getDocs(collection(db, 'locations'));

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          locationData.push({
            id: doc.id,
            ...data,
          });
        });
        setLocations(locationData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchData();
  }, []);

  const handleNamePress = (name) => {
    setSelectedName(name);
  };

  const handleLayoutChange = () => {
    const screenWidth = Dimensions.get('window').width;
    const newNumColumns = Math.floor(screenWidth / 200); // Adjust 200 as needed for your design
    setNumColumns(newNumColumns);
  };

  const openLocationInMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderLocationDetails = () => {
    if (!selectedName) return null;
    const locationsWithSelectedName = locations.filter(
      (location) => location.name === selectedName
    );

    return (
      <View style={styles.modalContent}>
        <Text>Name: {selectedName}</Text>
        <FlatList
          data={locationsWithSelectedName}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.locationDetails}>
              <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>Latitude:</Text>
                <Text style={styles.detailValue}>{item.latitude}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>Longitude:</Text>
                <Text style={styles.detailValue}>{item.longitude}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>Timestamp:</Text>
                <Text style={styles.detailValue}>
                  {item.timestamp.toDate().toString()}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => openLocationInMaps(item.latitude, item.longitude)}
                style={styles.mapLink}
              >
                <Text style={styles.mapLinkText}>View in Maps</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
            </View>
          )}
        />
        <Button title="Close" onPress={() => setSelectedName(null)} />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.bigBox}>
        <TouchableOpacity
          style={styles.nameBox}
          onPress={() => handleNamePress(item)}
        >
          <Text style={styles.nameText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dashboardTitle}>Dashboard</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={Array.from(new Set(filteredLocations.map((location) => location.name)))}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        onLayout={handleLayoutChange}
        numColumns={numColumns}
      />
      <Modal animationType="slide" transparent={true} visible={selectedName !== null}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>{renderLocationDetails()}</View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  dashboardTitle: {
    marginTop: 20,
    fontStyle: 'normal',
    color:'cornflowerblue',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth:0.5,
    borderColor:'dodgerblue',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  nameBox: {
    backgroundColor: 'cornflowerblue',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
  },
  bigBox: {
    borderColor: 'dodgerblue',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  locationDetails: {
    marginBottom: 20,
    marginLeft: 60,
    marginRight: 60,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
  mapLink: {
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLinkText: {
    fontSize: 16,
    color: 'white',
  },
});

export default LocationList;



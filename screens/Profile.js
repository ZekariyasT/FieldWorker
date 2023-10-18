
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
// } from 'firebase/firestore';
// import { db, auth } from '../config';
// import { useAuth } from '../AuthContext';


// const Profile = () => {

//   const { setIsLoggedIn } = useAuth();
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [notifications, setNotifications] = useState(true);
//   const [workstation, setWorkstation] = useState("");
//   const [hometown, setHometown] = useState("");
//   const [appVersion, setAppVersion] = useState('1.0.0');

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const currentUser = auth.currentUser;
//       if (!currentUser) {
//         return;
//       }

//       const currentUserEmail = currentUser.email;

//       // Fetch user data from Firestore based on the current user's email
//       const userCollection = collection(db, 'users');
//       const userQuerySnapshot = await getDocs(query(userCollection, where('email', '==', currentUserEmail)));

//       if (!userQuerySnapshot.empty) {
//         const userData = userQuerySnapshot.docs[0].data();
//         setFullName(userData.name || "");
//         setRole(userData.role || "");
//         setEmail(currentUserEmail);
//         setPhoneNumber(userData.phoneNumber || "");
//         setWorkstation(userData.company || "");
//         setHometown(userData.location || "");
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleEditProfilePicture = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [3, 4],
//         quality: 1,
//       });

//       if (!result.cancelled) {
//         setProfilePicture(result.uri);
//       }
//     } catch (error) {
//       console.error('Error selecting profile picture:', error);
//     }
//   };

//   const handleToggleNotifications = () => {
//     setNotifications(!notifications);
//   };

//   const handleLogout = () => {
//     // Implement your logout logic here
//     auth.signOut()
//       .then(() => {
//         setIsLoggedIn(false);
//         // navigation.navigate('Login'); // You can use navigate or replace, depending on your use case
//       })
//       .catch(error => {
//         console.error('Error logging out:', error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileContainer}>
//         <TouchableOpacity onPress={handleEditProfilePicture}>
//         <Image
//   source={{ uri: profilePicture ||"./profile.jpg"}} 
//   style={styles.profilePicture}
// />

//           <FontAwesome
//             name="edit"
//             size={24}
//             color="dodgerblue"
//             style={styles.editIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleLogout}
//           style={styles.logoutButton}
//         >
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//         <Text style={styles.fullName}>{fullName}</Text>
//         <Text style={styles.role}>{role}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <View style={styles.detailItem}>
//           <FontAwesome
//             name="envelope"
//             size={24}
//             color="#000"
//             style={styles.detailIcon}
//           />
//           <Text style={styles.detailText}>{email}</Text>
//         </View>
//         <View style={styles.horizontalLine}></View>
//         <View style={styles.detailItem}>
//           <FontAwesome
//             name="phone"
//             size={24}
//             color="#000"
//             style={styles.detailIcon}
//           />
//           <Text style={styles.detailText}>{phoneNumber}</Text>
//         </View>
//         <View style={styles.horizontalLine}></View>
//         <View style={styles.infoContainer}>
//           <FontAwesome
//             name="briefcase"
//             size={24}
//             color="#8888"
//           />
//           <Text style={styles.infoText}>{workstation}</Text>
//         </View>
//         <View style={styles.horizontalLine}></View>
//         <View style={styles.infoContainer}>
//           <FontAwesome
//             name="home"
//             size={24}
//             color="#8888"
//           />
//           <Text style={styles.infoText}>{hometown}</Text>
//         </View>
//         <View style={styles.horizontalLine}></View>
//         <View style={styles.detailItem}>
//           <TouchableOpacity onPress={handleToggleNotifications}>
//             <FontAwesome
//               name={notifications ? "bell" : "bell-slash"}
//               size={24}
//               color="#000"
//               style={styles.detailIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.detailText}>
//             {notifications ? "Notifications On" : "Notifications Off"}
//           </Text>
//         </View>
//         <View style={styles.versionContainer}>
//           <Text style={styles.versionText}>version : {appVersion}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     marginLeft:20,
//   },
//   profileContainer: {
    
//   },
//   profilePicture: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginLeft:'auto',
//     marginRight:'auto',
    
//     // ... (add your profile picture styles)
//   },
//   editIcon: {
//     marginLeft:'auto',
//     marginRight:'auto',
//   },
//   fullName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 10,
//     // ... (add your full name styles)
//   },
//   role: {
//     fontSize: 18,
//     color: "#888",
//     marginTop: 5,
//     marginBottom:20,
//     // ... (add your role styles)
//   },
//   detailsContainer: {
//     // ... (add your details container styles)
//   },
//   detailItem: {
//     flexDirection: "row",
//     marginBottom: 10,
//     // ... (add your detail item styles)
//   },
//   detailIcon: {
//     marginRight: 20,
//     fontSize: 20,
//     color: "#8888",
//     // ... (add your detail icon styles)
//   },
//   detailText: {
//     fontSize: 18,
//     // ... (add your detail text styles)
//   },
//   horizontalLine: {
//     borderBottomColor: "lightgray",
//     borderBottomWidth: 1,
//     marginVertical: 10,
//     // ... (add your horizontal line styles)
//   },
//   versionContainer: {
//     top: 180,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'lightgray',
//     padding: 10,
//     alignItems: 'center',
//     width: "100%",
//     // ... (add your version container styles)
//   },
//   versionText: {
//     fontWeight: 'bold',
//     // ... (add your version text styles)
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     marginRight: 20,
//     // ... (add your info container styles)
//   },
//   infoText: {
//     marginLeft: 15,
//     fontSize: 20,
//     // ... (add your info text styles)
//   },
//   logoutButton: {
//     position: 'absolute',
//     top: -45,
//     right: 5,
//     backgroundColor: '#E74C3C',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     // ... (add your logout button styles)
//   },
//   logoutText: {
//     color: '#ffff', 
//     fontWeight: 'bold',
//     // ... (add your logout text styles)
//   },
// });

// export default Profile;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity ,Dimensions} from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   doc,
//   setDoc,
// } from 'firebase/firestore';
// import {
//   ref,
//   getDownloadURL,
//   uploadBytes,
//   deleteObject,
// } from 'firebase/storage';
// import { db, auth, storage } from '../config';
// import { useAuth } from '../AuthContext';
// const Profile = () => {
//   const { setIsLoggedIn } = useAuth();
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [fullName, setFullName] = useState('');
//   const [role, setRole] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [notifications, setNotifications] = useState(true);
//   const [workstation, setWorkstation] = useState('');
//   const [hometown, setHometown] = useState('');
//   const [appVersion, setAppVersion] = useState('1.0.0');


//   const { width, height } = Dimensions.get('window');
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const currentUser = auth.currentUser;
//       if (!currentUser) {
//         return;
//       }

//       const currentUserEmail = currentUser.email;

//       // Fetch user data from Firestore based on the current user's email
//       const userCollection = collection(db, 'users');
//       const userQuerySnapshot = await getDocs(
//         query(userCollection, where('email', '==', currentUserEmail))
//       );

//       if (!userQuerySnapshot.empty) {
//         const userData = userQuerySnapshot.docs[0].data();
//         setFullName(userData.name || '');
//         setRole(userData.role || '');
//         setEmail(currentUserEmail);
//         setPhoneNumber(userData.phoneNumber || '');
//         setWorkstation(userData.company || '');
//         setHometown(userData.location || '');
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   useEffect(() => {
//     // Load the user's profile picture from Firebase Storage if available
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
//       getDownloadURL(storageRef)
//         .then((url) => {
//           setProfilePicture(url);
//         })
//         .catch((error) => {
//           // Profile picture not found in storage, you can handle this as needed
//         });
//     }
//   }, []);

//   const handleEditProfilePicture = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [3, 4],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         // Upload the new profile picture to Firebase Storage
//         const currentUser = auth.currentUser;
//         if (currentUser) {
//           const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
//           const imageBlob = await fetch(result.uri).then((response) =>
//             response.blob()
//           );

//           // Upload the new image and set the URL
//           await uploadBytes(storageRef, imageBlob, { contentType: 'image/jpeg' });

//           // Delete the old profile picture if available
//           if (profilePicture) {
//             const oldPictureRef = ref(storage, profilePicture);
//             deleteObject(oldPictureRef);
//           }

//           // Update the profile picture in the Firestore database
//           const userDocRef = doc(db, 'users', currentUser.uid);
//           await setDoc(userDocRef, { profilePicture: storageRef.fullPath }, { merge: true });

//           setProfilePicture(result.uri);
//         }
//       }
//     } catch (error) {
//       console.error('Error selecting profile picture:', error);
//     }
//   };

//   const handleToggleNotifications = () => {
//     setNotifications(!notifications);
//   };

//   const handleLogout = () => {
//     // Implement your logout logic here
//     auth.signOut()
//       .then(() => {
//         setIsLoggedIn(false);
//       })
//       .catch((error) => {
//         console.error('Error logging out:', error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileContainer}>
//               <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//                 <Text style={styles.logoutText}>Logout</Text>
//               </TouchableOpacity>
//         <TouchableOpacity onPress={handleEditProfilePicture}>
//           <Image
//             source={{
//               uri: profilePicture || './profile.jpg',
//             }}
//             style={styles.profilePicture}
//           />

//           <FontAwesome
//             name="edit"
//             size={24}
//             color="#fff"
//             style={styles.editIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.fullName}>{fullName}</Text>
//         <Text style={styles.role}>{role}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <View style={styles.detailItem}>
//           <FontAwesome
//             name="envelope"
//             size={24}
//             color="#000"
//             style={styles.detailIcon}
//           />
//           <Text style={styles.detailText}>{email}</Text>
//         </View>
//         <View style={styles.horizontalLine}></View>
//         <View style={styles.detailItem}>
//           <FontAwesome
//             name="phone"
//             size={24}
//             color="#000"
//             style={styles.detailIcon}
//           />
//           <Text style={styles.detailText}>{phoneNumber}</Text>
//         </View>
//         <View style={styles.horizontalLine}></View>
//         <View style={styles.infoContainer}>
//           <FontAwesome name="briefcase" size={24} color="#8888" />
//           <Text style={styles.infoText}>{workstation}</Text>
//         </View>
//         <View style={styles.horizontalLine}></View>
//         <View style={styles.infoContainer}>
//           <FontAwesome name="home" size={24} color="#8888" />
//           <Text style={styles.infoText}>{hometown}</Text>
//         </View>
//         <View style={styles.horizontalLine}></View>
//         <View style={styles.detailItem}>
//           <TouchableOpacity onPress={handleToggleNotifications}>
//             <FontAwesome
//               name={notifications ? 'bell' : 'bell-slash'}
//               size={24}
//               color="#000"
//               style={styles.detailIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.detailText}>
//             {notifications ? 'Notifications On' : 'Notifications Off'}
//           </Text>
//         </View>
//         <View style={styles.versionContainer}>
//           <Text style={styles.versionText}>version : {appVersion}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor:'#fff'
    
//   },
//   profileContainer: {
//     top:-40,
//     // top:-95,
//     width:450,
//     marginRight:7,
//     backgroundColor:'cornflowerblue'
//   },
//   profilePicture: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginLeft: 134,
//     marginRight: 'auto',
//     // ... (add your profile picture styles)
//   },
//   editIcon: {
//     marginLeft: 'auto',
//     marginRight: 'auto',
//   },
//   fullName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color:'#fff',
//     marginLeft:156,
//     // ... (add your full name styles)
//   },
//   role: {
//     fontSize: 18,
//     color: '#888',
//     marginTop: 5,
//     marginBottom: 20,
//     color:'#fff',
//     marginLeft:156,
//     // ... (add your role styles)
//   },
//   detailsContainer: {
//     marginLeft:20,
//     // ... (add your details container styles)
//   },
//   detailItem: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     // ... (add your detail item styles)
//   },
//   detailIcon: {
//     marginRight: 20,
//     fontSize: 20,
//     color: '#8888',
//     // ... (add your detail icon styles)
//   },
//   detailText: {
//     fontSize: 18,
//     // ... (add your detail text styles)
//   },
//   horizontalLine: {
//     borderBottomColor: 'lightgray',
//     borderBottomWidth: 1,
//     marginVertical: 10,
//     // ... (add your horizontal line styles)
//   },
//   versionContainer: {
//     top: 180,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'lightgray',
//     padding: 10,
//     alignItems: 'center',
//     width: '100%',
//     // ... (add your version container styles)
//   },
//   versionText: {
//     fontWeight: 'bold',
//     // ... (add your version text styles)
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     marginRight: 20,
//     // ... (add your info container styles)
//   },
//   infoText: {
//     marginLeft: 15,
//     fontSize: 20,
//     // ... (add your info text styles)
//   },
//   logoutButton: {
//     position: 'fixed',
//     top: 9,
//     right: 0,
//     width:90,
//     marginLeft:318,
//     borderWidth:2,
//     borderColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     // ... (add your logout button styles)
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: '100',
//     // ... (add your logout text styles)
//   },
// });

// export default Profile;





import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from 'firebase/firestore';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { db, auth, storage } from '../config';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const { setIsLoggedIn } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [workstation, setWorkstation] = useState('');
  const [hometown, setHometown] = useState('');
  const [appVersion, setAppVersion] = useState('1.0.0');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return;
      }

      const currentUserEmail = currentUser.email;

      // Fetch user data from Firestore based on the current user's email
      const userCollection = collection(db, 'users');
      const userQuerySnapshot = await getDocs(
        query(userCollection, where('email', '==', currentUserEmail))
      );

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        setFullName(userData.name || '');
        setRole(userData.role || '');
        setEmail(currentUserEmail);
        setPhoneNumber(userData.phoneNumber || '');
        setWorkstation(userData.company || '');
        setHometown(userData.location || '');
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Load the user's profile picture from Firebase Storage if available
    const currentUser = auth.currentUser;
    if (currentUser) {
      const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
      getDownloadURL(storageRef)
        .then((url) => {
          setProfilePicture(url);
        })
        .catch((error) => {
          // Profile picture not found in storage, you can handle this as needed
        });
    }
  }, []);

  const handleEditProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });

      if (!result.canceled) {
        // Upload the new profile picture to Firebase Storage
        const currentUser = auth.currentUser;
        if (currentUser) {
          const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
          const imageBlob = await fetch(result.uri).then((response) =>
            response.blob()
          );

          // Upload the new image and set the URL
          await uploadBytes(storageRef, imageBlob, { contentType: 'image/jpeg' });

          // Delete the old profile picture if available
          if (profilePicture) {
            const oldPictureRef = ref(storage, profilePicture);
            deleteObject(oldPictureRef);
          }

          // Update the profile picture in the Firestore database
          const userDocRef = doc(db, 'users', currentUser.uid);
          await setDoc(userDocRef, { profilePicture: storageRef.fullPath }, { merge: true });

          setProfilePicture(result.uri);
        }
      }
    } catch (error) {
      console.error('Error selecting profile picture:', error);
    }
  };

  const handleToggleNotifications = () => {
    setNotifications(!notifications);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    auth.signOut()
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditProfilePicture}>
          <Image
            source={{
              uri: profilePicture || './profile.jpg',
            }}
            style={styles.profilePicture}
          />
          <FontAwesome
            name="edit"
            size={24}
            color="#fff"
            style={styles.editIcon}
          />
        </TouchableOpacity>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <FontAwesome
            name="envelope"
            size={24}
            color="#000"
            style={styles.detailIcon}
          />
          <Text style={styles.detailText}>{email}</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.detailItem}>
          <FontAwesome
            name="phone"
            size={24}
            color="#000"
            style={styles.detailIcon}
          />
          <Text style={styles.detailText}>{phoneNumber}</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.infoContainer}>
          <FontAwesome name="briefcase" size={24} color="#8888" />
          <Text style={styles.infoText}>{workstation}</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.infoContainer}>
          <FontAwesome name="home" size={24} color="#8888" />
          <Text style={styles.infoText}>{hometown}</Text>
        </View>
        <View style={styles.horizontalLine}></View>
        <View style={styles.detailItem}>
          {/* <TouchableOpacity onPress={handleToggleNotifications}>
            <FontAwesome
              name={notifications ? 'bell' : 'bell-slash'}
              size={24}
              color="#000"
              style={styles.detailIcon}
            />
          </TouchableOpacity> */}
          {/* <Text style={styles.detailText}>
            {notifications ? 'Notifications On' : 'Notifications Off'}
          </Text> */}
        </View>
        {/* <View style={styles.versionContainer}>
          <Text style={styles.versionText}>version : {appVersion}</Text>
        </View> */}
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: 'cornflowerblue',
  },
  profilePicture: {
    marginTop:60,
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    borderRadius: (windowWidth * 0.4) / 2, // To make it a circle
  },
  editIcon: {
    position: 'absolute',
    top: windowWidth * 0.5,
    right: windowWidth * 0.12,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  role: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
    marginBottom: 20,
    color: '#fff',
  },
  detailsContainer: {
    marginTop:25,
    marginLeft: 20,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 20,
    fontSize: 20,
    color: '#8888',
  },
  detailText: {
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  versionContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  versionText: {
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    top: 13,
    right: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '100',
  },
});

export default Profile;


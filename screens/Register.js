
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert,SafeAreaView } from "react-native";
// import {Picker} from '@react-native-picker/picker';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { addDoc, collection } from 'firebase/firestore';
// import { auth, db } from '../config';
// export default function Register({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');
//   const [phone, setPhone] = useState('');
//   const [company, setCompany] = useState('');
//   const [location, setLocation] = useState('');

//   const onHandleSignup = () => {
//     if (email !== '' && password !== '' && name !== '' && selectedRole !== '') {
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           const userId = userCredential.user.uid;

//           const userRef = collection(db, 'users');
//           const userData = {
//             name: name,
//             email:email,
//             role: selectedRole,
//             phoneNumber:phone,
//             company:company,
//             location:location,

//           };

//           addDoc(userRef, userData)
//             .then(() => {
//               console.log('Signup success');
//               navigation.navigate("Login");
//               // Now, you can navigate to the next screen or perform other actions
//             })
//             .catch((err) => Alert.alert('Firestore error', err.message));
//         })
//         .catch((err) => Alert.alert('Login error', err.message));
//     } else {
//       Alert.alert('Missing Fields', 'Please fill in all fields.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.whiteSheet} />
//       <SafeAreaView style={styles.form}>
//         <Text style={styles.title}>Create User</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Name"
//           textContentType="name"
//           autoFocus={true}
//           value={name}
//           onChangeText={(text) => setName(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter email"
//           autoCapitalize="none"
//           keyboardType="email-address"
//           textContentType="emailAddress"
//           autoFocus={true}
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter password"
//           autoCapitalize="none"
//           autoCorrect={false}
//           secureTextEntry={true}
//           textContentType="password"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter phoneNumber"
//           autoCapitalize="none"
//           autoCorrect={false}
//           secureTextEntry={true}
//           textContentType="name"
//           value={password}
//           onChangeText={(text) => setPhone(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Your Company"
//           textContentType="name"
//           autoFocus={true}
//           value={name}
//           onChangeText={(text) => setCompany(text)}
//         />
//         <Picker
//           selectedValue={selectedRole}
//           onValueChange={(itemValue) => setLocation(itemValue)}
//           style={styles.input}
//         >
//           <Picker.Item label="Select Location" value="" />
//           <Picker.Item label="Ethiopia" value="Ethiopia" />
//         </Picker>


//         <Picker
//           selectedValue={selectedRole}
//           onValueChange={(itemValue) => setSelectedRole(itemValue)}
//           style={styles.input}
//         >
//           <Picker.Item label="Select Role" value="" />
//           <Picker.Item label="Supervisor" value="Supervisor" />
//           <Picker.Item label="Worker" value="Worker" />
//         </Picker>

//         <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
//           <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Create</Text>
//         </TouchableOpacity>
//         <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          
         
//         </View>
//       </SafeAreaView>
//       <StatusBar barStyle="light-content" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#fff",
//     },
//     title: {
//       fontSize: 36,
//       fontWeight: 'bold',
//       color: "dodgerblue",
//       alignSelf: "center",
//       paddingBottom: 24,
//     },
//     input: {
//       backgroundColor: "#F6F7FB",
//       height: 58,
//       marginBottom: 20,
//       fontSize: 16,
//       borderRadius: 10,
//       padding: 12,
//     },
//     backImage: {
//       width: "100%",
//       height: 340,
//       position: "absolute",
//       top: 0,
//       resizeMode: 'cover',
//     },
//     whiteSheet: {
//       width: '100%',
//       height: '75%',
//       position: "absolute",
//       bottom: 0,
//       backgroundColor: '#fff',
//       borderTopLeftRadius: 60,
//     },
//     form: {
//       flex: 1,
//       justifyContent: 'center',
//       marginHorizontal: 30,
//     },
//     button: {
//       backgroundColor: 'dodgerblue',
//       height: 58,
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 40,
//     },
//   });


import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert, SafeAreaView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  // Function to reset input fields
  const resetFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setSelectedRole('');
    setPhone('');
    setCompany('');
    setLocation('');
  };

  const onHandleSignup = () => {
    if (email !== '' && password !== '' && name !== '' && selectedRole !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userId = userCredential.user.uid;

          const userRef = collection(db, 'users');
          const userData = {
            name: name,
            email: email,
            role: selectedRole,
            phoneNumber: phone,
            company: company,
            location: location,
          };

          addDoc(userRef, userData)
            .then(() => {
              console.log('Signup success');
              Alert.alert('User Created');
              resetFields(); // Reset input fields after successful signup
            })
            .catch((err) => Alert.alert('Firestore error', err.message));
        })
        .catch((err) => Alert.alert('Login error', err.message));
    } else {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Create User</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          textContentType="name"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter phoneNumber"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
         <TextInput
          style={styles.input}
          placeholder="Enter Company"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={false}
          value={company}
          onChangeText={(text) => setCompany(text)}
        />
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select Location" value="" />
          <Picker.Item label="Ethiopia" value="Ethiopia" />
        </Picker>

        <Picker
          selectedValue={selectedRole}
          onValueChange={(itemValue) => setSelectedRole(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select Role" value="" />
          <Picker.Item label="Supervisor" value="Supervisor" />
          <Picker.Item label="Worker" value="Worker" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Create</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "cornflowerblue",
    alignSelf: "center",
    paddingBottom: 16,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 48,
    marginBottom: 10, // Adjusted margin
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: 'cornflowerblue',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjusted margin
  },
});

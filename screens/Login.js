
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { useAuth } from '../AuthContext';
import { db } from "../config";
import Map from './Map';

import { collection, query, where, getDocs } from 'firebase/firestore';
// const backImage = require("../assets/backImage.png");
  

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useAuth();
  const { setIsSupervisor } = useAuth();


  const getUserRoleByEmail = async (email) => {
    const usersCollection = collection(db, 'users'); // Replace 'users' with the actual collection name
    const userQuery = query(usersCollection, where('email', '==', email));
  
    try {
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.role; // Return the user's role
      } else {
        return null; // User not found
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  const onHandleLogin =async () => {

    if (email !== "" && password !== "") {
      try {
        const userRole = await getUserRoleByEmail(email);
        await signInWithEmailAndPassword(auth, email, password);
  
        if (userRole === 'Supervisor') {
          setIsLoggedIn(true);
          setIsSupervisor(true);
          // Perform your own navigation here based on the user's role
          // For example, you can use conditional rendering or call your own navigation functions
        } else {
          setIsLoggedIn(true);
          setIsSupervisor(false);
          // Perform navigation for regular users
        }
      } catch (error) {
        Alert.alert('Login error', 'Incorrect email or password. Please try again.');
      }
    } else {
      Alert.alert('Login error', 'Please enter both email and password.');
    }





















    
    // if (email !== "" && password !== "") {
    //   try{
    //   const userRole = await getUserRoleByEmail(email);
    //   signInWithEmailAndPassword(auth, email, password)
    //     // .then(() => console.log("Login success"),
    //     // setIsLoggedIn(true)
    //     // if (userRole === 'Supervisor') {
    //     //   setIsSupervisor(true)
    //     // }
     
  
    //     // )
    //     if (userRole === 'Supervisor') {
    //       setIsLoggedIn(true);
    //       setIsSupervisor(true);
    //       // Perform your own navigation here based on the user's role
    //       // For example, you can use conditional rendering or call your own navigation functions
    //     } else {
    //       setIsLoggedIn(true);
    //       // Perform navigation for regular users
    //     }
    //   }catch (error) {
    //       Alert.alert('Login error', error.message);
    //     }
    //     // .catch((err) => Alert.alert("Login error", err.message));
    // }
  };
  
  return (
    <View style={styles.container}>
      {/* <Image source={backImage} style={styles.backImage} /> */}
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
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
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        
      </View>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: "cornflowerblue",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: 'cornflowerblue',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});




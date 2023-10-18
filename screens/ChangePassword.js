// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { updatePassword } from 'firebase/auth';
// import { auth } from '../config'; // Import your Firebase auth object correctly

// const ChangePasswordScreen = () => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const changePassword = async () => {
//     try {
//       // Get the current user
//       const user = auth.currentUser;

//       // Verify the current password. You can do this using re-authentication if required.
//       // If not required, you can skip this step.
//       // Here's an example of re-authentication, assuming email and password sign-in:
//       // const credential = EmailAuthProvider.credential(user.email, currentPassword);
//       // await reauthenticateWithCredential(user, credential);

//       // Update the password
//       await updatePassword(user, newPassword);

//       Alert.alert('Success', 'Password updated successfully.');
//       // Handle success (e.g., show a success message to the user)
//     } catch (error) {
//       console.error('Error updating password:', error);
//       Alert.alert('Error', 'Password update failed. Please check your current password.');
//       // Handle error (e.g., display an error message to the user)
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Current Password:</Text>
//       <TextInput
//         style={styles.input}
//         secureTextEntry
//         placeholder="Enter current password"
//         value={currentPassword}
//         onChangeText={setCurrentPassword}
//       />
//       <Text style={styles.label}>New Password:</Text>
//       <TextInput
//         style={styles.input}
//         secureTextEntry
//         placeholder="Enter new password"
//         value={newPassword}
//         onChangeText={setNewPassword}
//       />
//       <Button title="Change Password" onPress={changePassword} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     marginBottom: 16,
//     padding: 8,
//   },
// });

// export default ChangePasswordScreen;



import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { updatePassword } from 'firebase/auth';
import { auth } from '../config';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changePassword = async () => {
    try {
      const user = auth.currentUser;

      // Verify the current password. You can do this using re-authentication if required.

      await updatePassword(user, newPassword);

      Alert.alert('Success', 'Password updated successfully.');
      setCurrentPassword(''); // Clear the input fields
      setNewPassword(''); // Clear the input fields
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Password update failed. Please check your current password.');
    }
  };

  return (
      <View style={styles.container}>
    <View style={styles.tit}>
      <Text style={styles.title}>Change Password</Text>

      </View>
      <Text style={styles.label}>Current Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button style={styles.button} title="Change Password" onPress={changePassword}  />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  tit:{
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color:'cornflowerblue',
    
  },
  label: {
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  button: {
    backgroundColor: 'cornflowerblue',
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default ChangePasswordScreen;


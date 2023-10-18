
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   doc,
//   deleteDoc,
//   setDoc,
//   getDoc, // Import getDoc
// } from 'firebase/firestore';
// import { db, auth } from '../config';

// const Main = () => {
//   const [tasks, setTasks] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [userName, setUserName] = useState('');
//   const [currentSection, setCurrentSection] = useState('notStarted');

//   useEffect(() => {
//     // Fetch the current user's email
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       return; // Return if no user is logged in
//     }
//     const currentUserEmail = currentUser.email;

//     // Fetch the user's name using their current email
//     const fetchUserName = async () => {
//       const userCollection = collection(db, 'users');
//       const userQuerySnapshot = await getDocs(
//         query(userCollection, where('email', '==', currentUserEmail))
//       );

//       if (!userQuerySnapshot.empty) {
//         // Assuming there's only one user with the same email
//         const userData = userQuerySnapshot.docs[0].data();
//         const name = userData.name;
//         setUserName(name);
//       }
//     };

//     fetchUserName();
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [userName, currentSection]);

//   const fetchTasks = async () => {
//     let taskCollection;

//     if (currentSection === 'inProgress') {
//       // Fetch from the 'inProgressTasks' collection for the 'In Progress' section
//       taskCollection = collection(db, 'inProgressTasks');
//     } else if (currentSection === 'completed') {
//       // Fetch from the 'completedTasks' collection for the 'Completed' section
//       taskCollection = collection(db, 'completedTasks');
//     } else {
//       // Fetch from the 'tasks' collection for the 'Not Started' section
//       taskCollection = collection(db, 'tasks');
//     }

//     const querySnapshot = await getDocs(
//       query(taskCollection, where('person', '==', userName))
//     );
//     const taskData = [];
//     querySnapshot.forEach((doc) => {
//       taskData.push({ id: doc.id, ...doc.data() });
//     });
//     setTasks(taskData);
//   };

//   const handleStart = async (taskId) => {
//     try {
//       // Reference to the task document in the 'tasks' collection
//       const taskRef = doc(db, 'tasks', taskId);

//       // Fetch the task data
//       const taskSnapshot = await getDoc(taskRef); // Use getDoc here
//       const taskData = taskSnapshot.data();

//       // Add the task to the 'inProgressTasks' section by copying it
//       const inProgressCollection = collection(db, 'inProgressTasks');
//       const newInProgressDocRef = doc(inProgressCollection); // Create a new document reference
//       await setDoc(newInProgressDocRef, {
//         ...taskData,
//         status: 'inProgress',
//       });

//       // Delete the task from the 'tasks' collection
//       await deleteDoc(taskRef);

//       // Fetch tasks again to update the lists
//       fetchTasks();
//     } catch (error) {
//       console.error('Error starting task:', error);
//     }
//   };

  

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 20,
//     },
//     header: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       color: 'dodgerblue',
//       marginBottom: 15,
//       marginTop: 30,
//     },
//     input: {
//       height: 40,
//       borderWidth: 1,
//       borderColor: '#ccc',
//       borderRadius: 5,
//       marginBottom: 10,
//       paddingLeft: 10,
//     },
//     taskItem: {
//       marginBottom: 20,
//       borderColor: '#ccc',
//       borderWidth: 1,
//       padding: 10,
//       borderRadius: 5,
//       flex: 1,
//       margin: 5,
//     },
//     taskTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//     },
//     statusButtons: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 15,
//     },
//     statusButton: {
//       flex: 1,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 5,
//       marginHorizontal: 5,
//     },
//     statusButtonText: {
//       color: 'white',
//     },
//     statusButtonContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Dashboard</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Search by Title"
//         onChangeText={(text) => setSearchText(text)}
//         value={searchText}
//       />
//       <View style={styles.statusButtons}>
//         <TouchableOpacity
//           style={[
//             styles.statusButton,
//             {
//               backgroundColor:
//                 currentSection === 'notStarted' ? 'dodgerblue' : 'gray',
//             },
//           ]}
//           onPress={() => setCurrentSection('notStarted')}
//         >
//           <Text style={styles.statusButtonText}>Not Started</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.statusButton,
//             { backgroundColor: currentSection === 'inProgress' ? 'green' : 'gray' },
//           ]}
//           onPress={() => setCurrentSection('inProgress')}
//         >
//           <Text style={styles.statusButtonText}>In Progress</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.statusButton,
//             { backgroundColor: currentSection === 'completed' ? 'orange' : 'gray' },
//           ]}
//           onPress={() => setCurrentSection('completed')}
//         >
//           <Text style={styles.statusButtonText}>Completed</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={
//           searchText
//             ? tasks
//                 .filter((task) =>
//                   task.title.toLowerCase().includes(searchText.toLowerCase())
//                 )
//             : tasks
//         }
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         renderItem={({ item }) => (
//           <View style={styles.taskItem}>
//             <Text style={styles.taskTitle}>{item.title}</Text>
//             <Text>Description: {item.description}</Text>
//             <Text>Priority: {item.priority}</Text>
//             <Text>Deadline: {item.deadline}</Text>
//             <Text>Person: {item.person}</Text>
//             <View style={styles.statusButtonContainer}>
//               {currentSection === 'notStarted' && (
//                 <TouchableOpacity
//                   style={[
//                     styles.statusButton,
//                     { backgroundColor: 'dodgerblue' },
//                   ]}
//                   onPress={() => handleStart(item.id)}
//                 >
//                   <Text style={styles.statusButtonText}>Start</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default Main;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db, auth } from '../config';

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [userName, setUserName] = useState('');
  const [currentSection, setCurrentSection] = useState('notStarted');

  useEffect(() => {
    // Fetch the current user's email
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return; // Return if no user is logged in
    }
    const currentUserEmail = currentUser.email;

    // Fetch the user's name using their current email
    const fetchUserName = async () => {
      const userCollection = collection(db, 'users');
      const userQuerySnapshot = await getDocs(
        query(userCollection, where('email', '==', currentUserEmail))
      );

      if (!userQuerySnapshot.empty) {
        // Assuming there's only one user with the same email
        const userData = userQuerySnapshot.docs[0].data();
        const name = userData.name;
        setUserName(name);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [userName, currentSection]);

  const fetchTasks = async () => {
    let taskCollection;

    if (currentSection === 'inProgress') {
      // Fetch from the 'inProgressTasks' collection for the 'In Progress' section
      taskCollection = collection(db, 'inProgressTasks');
    } else if (currentSection === 'completed') {
      // Fetch from the 'completedTasks' collection for the 'Completed' section
      taskCollection = collection(db, 'completedTasks');
    } else {
      // Fetch from the 'tasks' collection for the 'Not Started' section
      taskCollection = collection(db, 'tasks');
    }

    const querySnapshot = await getDocs(
      query(taskCollection, where('person', '==', userName))
    );
    const taskData = [];
    querySnapshot.forEach((doc) => {
      taskData.push({ id: doc.id, ...doc.data() });
    });
    setTasks(taskData);
  };

  const handleStart = async (taskId) => {
    try {
      // Reference to the task document in the 'tasks' collection
      const taskRef = doc(db, 'tasks', taskId);

      // Fetch the task data
      const taskSnapshot = await getDoc(taskRef);
      const taskData = taskSnapshot.data();

      // Add the task to the 'inProgressTasks' section by copying it
      const inProgressCollection = collection(db, 'inProgressTasks');
      const newInProgressDocRef = doc(inProgressCollection);
      await setDoc(newInProgressDocRef, {
        ...taskData,
        status: 'inProgress',
      });

      // Delete the task from the 'tasks' collection
      await deleteDoc(taskRef);

      // Fetch tasks again to update the lists
      fetchTasks();
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      // Reference to the task document in the 'inProgressTasks' section
      const taskRef = doc(db, 'inProgressTasks', taskId);

      // Fetch the task data
      const taskSnapshot = await getDoc(taskRef);
      const taskData = taskSnapshot.data();

      // Add the task to the 'completedTasks' section
      const completedCollection = collection(db, 'completedTasks');
      const newCompletedDocRef = doc(completedCollection);
      await setDoc(newCompletedDocRef, {
        ...taskData,
        status: 'completed',
      });

      // Delete the task from the 'inProgressTasks' collection
      await deleteDoc(taskRef);

      // Fetch tasks again to update the lists
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'cornflowerblue',
      marginBottom: 15,
      marginTop: 30,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      paddingLeft: 10,
    },
    taskItem: {
      marginBottom: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      flex: 1,
      margin: 5,
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    statusButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    statusButton: {
      flex: 1,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 5,
    },
    statusButtonText: {
      color: 'white',
    },
    statusButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by Title"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <View style={styles.statusButtons}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            {
              backgroundColor:
                currentSection === 'notStarted' ? 'cornflowerblue' : 'gray',
            },
          ]}
          onPress={() => setCurrentSection('notStarted')}
        >
          <Text style={styles.statusButtonText}>Not Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: currentSection === 'inProgress' ? 'green' : 'gray' },
          ]}
          onPress={() => setCurrentSection('inProgress')}
        >
          <Text style={styles.statusButtonText}>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            { backgroundColor: currentSection === 'completed' ? 'orange' : 'gray' },
          ]}
          onPress={() => setCurrentSection('completed')}
        >
          <Text style={styles.statusButtonText}>Completed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={
          searchText
            ? tasks
                .filter((task) =>
                  task.title.toLowerCase().includes(searchText.toLowerCase())
                )
            : tasks
        }
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Priority: {item.priority}</Text>
            <Text>Deadline: {item.deadline}</Text>
            <Text>Person: {item.person}</Text>
            <View style={styles.statusButtonContainer}>
              {currentSection === 'notStarted' && (
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    { backgroundColor: 'dodgerblue' },
                  ]}
                  onPress={() => handleStart(item.id)}
                >
                  <Text style={styles.statusButtonText}>Start</Text>
                </TouchableOpacity>
              )}
              {currentSection === 'inProgress' && (
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    { backgroundColor: 'green' },
                  ]}
                  onPress={() => handleComplete(item.id)}
                >
                  <Text style={styles.statusButtonText}>Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Main;

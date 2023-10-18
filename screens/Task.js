// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
// import { db } from '../config';

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [taskText, setTaskText] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskPriority, setTaskPriority] = useState('');
//   const [taskDeadline, setTaskDeadline] = useState('');
//   const [searchText, setSearchText] = useState('');
//   const [personName, setPersonName] = useState('');
//   const [taskStatus, setTaskStatus] = useState('');

//   useEffect(() => {
//     // Fetch tasks from Firestore when the component mounts
//     const fetchData = async () => {
//       const taskCollection = collection(db, 'tasks');
//       const querySnapshot = await getDocs(taskCollection);
//       const taskData = [];
//       querySnapshot.forEach((doc) => {
//         taskData.push({ id: doc.id, ...doc.data() });
//       });
//       setTasks(taskData);
//     };

//     fetchData();
//   }, []);

//   const addTask = async () => {
//     if (taskText.trim() !== '' && personName.trim() !== '') {
//       const newTask = {
//         title: taskText,
//         description: taskDescription,
//         priority: taskPriority,
//         deadline: taskDeadline,
//         person: personName,
//         taskStatus:taskStatus,
//       };

//       try {
//         const docRef = await addDoc(collection(db, 'tasks'), newTask);
//         setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...newTask }]);
//         setTaskText('');
//         setTaskDescription('');
//         setTaskPriority('');
//         setTaskDeadline('');
//         setPersonName('');
//         setTaskStatus('');
//       } catch (error) {
//         console.error('Error adding task to Firestore: ', error);
//       }
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await deleteDoc(doc(db, 'tasks', taskId));
//       setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//     } catch (error) {
//       console.error('Error deleting task from Firestore: ', error);
//     }
//   };
//   return (
//         <View style={styles.container}>
          
//           <Text style={styles.header}>Task Manager</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Search by Title"
//             onChangeText={(text) => setSearchText(text)}
//             value={searchText}
//           />
//           <View style={styles.taskList}>
//             <FlatList
//               data={searchText ? filterTasks() : tasks}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <View style={styles.taskItem}>
//                   <Text style={styles.taskTitle}>{item.title}</Text>
//                   <Text>Description:{item.description}</Text>
//                   <Text>Priority: {item.priority}</Text>
//                   <Text>Deadline: {item.deadline}</Text>
//                   <Text>Peson: {item.person}</Text>
//                   <Text>taskStatus: {item.taskStatus}</Text>
//                   <TouchableOpacity
//                     onPress={() => deleteTask(item.id)}
//                     style={styles.deleteButton}
//                   >
//                     <Text style={styles.deleteButtonText}>Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />
//           </View>
//           <TextInput
//             style={styles.input}
//             placeholder="Title"
//             onChangeText={(text) => setTaskText(text)}
//             value={taskText}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="TaskStatus"
//             onChangeText={(text) => setTaskStatus(text)}
//             value={taskStatus}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Peson Name"
//             onChangeText={(text) => setPersonName(text)}
//             value={personName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Description"
//             onChangeText={(text) => setTaskDescription(text)}
//             value={taskDescription}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Priority"
//             onChangeText={(text) => setTaskPriority(text)}
//             value={taskPriority}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Deadline"
//             onChangeText={(text) => setTaskDeadline(text)}
//             value={taskDeadline}
//           />
//           <Button title="Add Task" onPress={addTask} />
//         </View>
//       );
//     };
    
//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         padding: 20,
//       },
//       header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         marginTop:30,
//       },
//       input: {
//         height: 40,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         marginBottom: 10,
//         paddingLeft: 10,
//       },
//       taskList: {
//         flex: 1,
//       },
//       taskItem: {
//         marginBottom: 20,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         padding: 10,
//         borderRadius: 5,
        
//       },
//       taskTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//       },
//       deleteButton: {
//         backgroundColor: '#f00',
//         marginTop: 10,
//         padding: 5,
//         borderRadius: 5,
//         alignItems: 'center',
//       },
//       deleteButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//       },
//     });

// export default App;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../config';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [searchText, setSearchText] = useState('');
  const [personName, setPersonName] = useState('');
 

  useEffect(() => {
    // Fetch tasks from Firestore when the component mounts
    const fetchData = async () => {
      const taskCollection = collection(db, 'tasks');
      const querySnapshot = await getDocs(taskCollection);
      const taskData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskData);
    };

    fetchData();
  }, []);

  const addTask = async () => {
    if (taskText.trim() !== '' && personName.trim() !== '') {
      const newTask = {
        title: taskText,
        description: taskDescription,
        priority: taskPriority,
        deadline: taskDeadline,
        person: personName,
      
      };

      try {
        const docRef = await addDoc(collection(db, 'tasks'), newTask);
        setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...newTask }]);
        setTaskText('');
        setTaskDescription('');
        setTaskPriority('');
        setTaskDeadline('');
        setPersonName('');
      } catch (error) {
        console.error('Error adding task to Firestore: ', error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task from Firestore: ', error);
    }
  };

  const filterTasks = () => {
    return tasks.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by Title"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <View style={styles.taskList}>
        <FlatList
          data={searchText ? filterTasks() : tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Priority: {item.priority}</Text>
              <Text>Deadline: {item.deadline}</Text>
              <Text>Person: {item.person}</Text>
              <Text>Task Status: {item.taskStatus}</Text>
              <TouchableOpacity
                onPress={() => deleteTask(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={(text) => setTaskText(text)}
        value={taskText}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Person Name"
        onChangeText={(text) => setPersonName(text)}
        value={personName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => setTaskDescription(text)}
        value={taskDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Priority"
        onChangeText={(text) => setTaskPriority(text)}
        value={taskPriority}
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline"
        onChangeText={(text) => setTaskDeadline(text)}
        value={taskDeadline}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  taskList: {
    flex: 1,
  },
  taskItem: {
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f00',
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;

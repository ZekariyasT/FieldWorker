import 'react-native-gesture-handler';
import Navigation from './Navigation';
import { useFonts } from 'expo-font';
import { UserContext } from "./UserContext";
import {NavigationContainer} from '@react-navigation/native';
import { AuthProvider } from './AuthContext';





export default function App() {
  const [fontsLoaded] = useFonts({
    'raleway': require('./assets/Fonts/Raleway-Regular.ttf'),
    'raleway-Bold': require('./assets/Fonts/Raleway-SemiBold.ttf'),
  });
  return (
    <>
      <UserContext>
        <AuthProvider>
        <Navigation/>
        </AuthProvider>
        
        {/* <Move/> */}
       
      </UserContext>
    </>

    
    
    
  );
}



  
  
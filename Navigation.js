import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChangePassword from './screens/ChangePassword';
import Search from './screens/Search';
import Map from './screens/Map';
import Profile from './screens/Profile';
import WDashbord from './screens/WDashbord';
import SMap from './screens/SMap';
import LocationList from './screens/SDashbord';
import Task from './screens/Task';
import Main from './screens/Main';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './screens/Login';
import Register from './screens/Register';
import{createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useAuth } from './AuthContext';


const Tab=createBottomTabNavigator();

const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <AuthStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}
function TabGroup(){
    return(
        <Tab.Navigator 
        screenOptions={({route,navigation})=>({
            tabBarIcon:({color,focused,size})=>{
               let iconName;
               if(route.name==="Home") {
                iconName= focused? "home":"home-outline";
               }
               else if(route.name==="Register"){
                iconName= focused? "create":"create-outline";
               }
              else if(route.name==="Add Task"){
                iconName= focused? "add-circle":"add-circle-outline";
               }
            else if(route.name==="Map"){
                iconName= focused? "compass":"compass-outline";
               }
               else if(route.name==="Profile"){
                iconName= focused? "person":"person-outline";
               }
               return <Ionicons name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor:"#1DA1F2",
            tabBarInactiveTintColor:"gray",
            
        })
        }>
            <Tab.Screen name='Home' component={LocationList} options={{headerShown:false}}/>
            <Tab.Screen name='Register' component={Register} options={{headerShown:false}}/>
            <Tab.Screen name='Add Task' component={Task} options={{headerShown:false}}/>
            <Tab.Screen name='Map' component={SMap} options={{headerShown:false}}/>
            <Tab.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}



function TabGroupW(){
  return(
      <Tab.Navigator 
      screenOptions={({route,navigation})=>({
          tabBarIcon:({color,focused,size})=>{
             let iconName;
             if(route.name==="Home") {
              iconName= focused? "home":"home-outline";
             }
             else if(route.name==="File"){
              iconName= focused? "images":"images-outline";
             }
            else if(route.name==="ChangePassword"){
              iconName= focused? "create":"create-outline";
             }
          else if(route.name==="Map"){
              iconName= focused? "compass":"compass-outline";
             }
             else if(route.name==="Profile"){
              iconName= focused? "person":"person-outline";
             }
             return <Ionicons name={iconName} size={size} color={color}/>
          },
          tabBarActiveTintColor:"#1DA1F2",
          tabBarInactiveTintColor:"gray",
          
      })
      }>
          <Tab.Screen name='Home' component={Main} options={{headerShown:false}}/>
          <Tab.Screen name='File' component={Search} options={{headerShown:false}}/>
          <Tab.Screen name='ChangePassword' component={ChangePassword} options={{headerShown:false}}/>
          <Tab.Screen name='Map' component={Map} options={{headerShown:false}}/>
          <Tab.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
      </Tab.Navigator>
  )
}

















export default function Navigation(){
    const { isLoggedIn } = useAuth();
    const {isSupervisor} =useAuth();
    return(
        <NavigationContainer>
      {isLoggedIn ?( isSupervisor?<TabGroup />:<TabGroupW /> ): (<AuthNavigator  />)}
    </NavigationContainer>
        

    // <NavigationContainer>
    //     <TabGroup/>
    // </NavigationContainer>
    );
}

           

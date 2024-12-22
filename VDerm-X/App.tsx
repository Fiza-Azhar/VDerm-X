// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from './src/Screens/launchScreen';
import LoginScreen from './src/Screens/loginScreen';
import verifyScreen from './src/Screens/verifyScreen';
import HomeScreen from './src/Screens/homeScreen';
import RegisterScreen from './src/Screens/registerScreen'; // Assuming you will create this later
import VetsScreen from './src/Screens/vetsScreen';
import DiagnosticScreen from './src/Screens/diagnosticScreen';

// Define the param list for all screens
export type RootStackParamList = {
  Launch: undefined; 
  Login: undefined; 
  Register: undefined; 
  Verify: undefined; 
  Home: undefined; 
  Vets: undefined; 
  Diagnosis:undefined;
};

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen
          name="Launch"
          component={LaunchScreen}
          options={{ headerShown: false }} // Hide the default header
        />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Verify" component={verifyScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Vets" component={VetsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='Diagnosis' component={DiagnosticScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

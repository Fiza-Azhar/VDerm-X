// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from './src/Screens/launchScreen';
import LoginScreen from './src/Screens/loginScreen';
import RegisterScreen from './src/Screens/registerScreen'; // Assuming you will create this later

// Define the param list for all screens
export type RootStackParamList = {
  Launch: undefined; 
  Login: undefined; 
  Register: undefined; 
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
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

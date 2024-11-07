import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Login from '../pages/Login';

const Stack = createStackNavigator();

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerTitle: '', headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

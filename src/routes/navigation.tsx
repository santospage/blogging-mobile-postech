import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Classes from '../pages/Classes';
import Perfil from '../pages/Perfil';
import ClassRoom from '../pages/ClassRoom';
import * as styles from '../routes/styles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...styles.drawerStyles,
        drawerLabelStyle: {
          ...styles.drawerStyles.drawerLabelStyle,
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="ListofClasses"
        component={Classes}
        options={{
          drawerLabel: 'List of Classes',
          headerTransparent: true,
          title: '',
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Users"
        component={Perfil}
        options={{
          drawerLabel: 'Users',
          drawerIcon: () => (
            <Image
              source={require('../../assets/users.png')}
              style={styles.customStyles.icon}
            />
          ),
          headerTransparent: true,
          title: '',
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={Perfil}
        options={{
          drawerLabel: 'Categories',
          drawerIcon: () => (
            <Image
              source={require('../../assets/categories.png')}
              style={styles.customStyles.icon}
            />
          ),
          headerTransparent: true,
          title: '',
        }}
      />
      <Drawer.Screen
        name="Classes"
        component={Perfil}
        options={{
          drawerLabel: 'Classes',
          drawerIcon: () => (
            <Image
              source={require('../../assets/classes.png')}
              style={styles.customStyles.icon}
            />
          ),
          headerTransparent: true,
          title: '',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitle: '', headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen name="Drawer" component={DrawerRoutes} />
        <Stack.Screen name="ClassRoom" component={ClassRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

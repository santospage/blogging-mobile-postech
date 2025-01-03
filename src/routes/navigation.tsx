/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Classes from '../pages/Classes';
import User from '../pages/User';
import ClassRoom from '../pages/ClassRoom';
import Category from '../pages/Category';
import List from '../pages/ClassRoom/List';
import * as styles from '../routes/styles';
import Logout from '../pages/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenService } from '../services/Auth/TokenService';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('ACCESS_TOKEN_KEY');
      const isValid = await tokenService.isValid();
      setIsAuthenticated(!!token && isValid);
    };

    checkAuth();
  }, []);

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

      {isAuthenticated ? (
        <Drawer.Screen
          name="Users"
          component={User}
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
      ) : (
        <Drawer.Screen
          name="Users"
          component={Home}
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
      )}

      {isAuthenticated ? (
        <Drawer.Screen
          name="Categories"
          component={Category}
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
      ) : (
        <Drawer.Screen
          name="Categories"
          component={Home}
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
      )}

      {isAuthenticated ? (
        <Drawer.Screen
          name="Classes"
          component={List}
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
      ) : (
        <Drawer.Screen
          name="Classes"
          component={Home}
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
      )}

      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerLabel: 'Logout',
          drawerIcon: () => (
            <Image
              source={require('../../assets/logout.png')}
              style={styles.customStyles.icon}
            />
          ),
          headerTransparent: true,
          title: '',
          drawerItemStyle: !isAuthenticated ? { display: 'none' } : {},
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

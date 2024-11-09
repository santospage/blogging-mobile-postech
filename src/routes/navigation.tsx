import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ListaPets from '../pages/ListaPets';
import Mensagem from '../pages/Mensagem';
import Sobre from '../pages/Sobre';
import Perfil from '../pages/Perfil';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#36D6AD',
        },
        drawerLabelStyle: {
          color: '#fff',
          fontSize: 14,
          fontFamily: 'Roboto',
          fontWeight: '400',
          lineHeight: 20,
        },
      }}
    >
      <Drawer.Screen
        name="ListadePets"
        component={TabRoutes}
        options={{
          drawerLabel: 'Pets para adoção',
          drawerIcon: () => (
            <Image
              source={require('../../assets/pets.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
          headerTransparent: true,
          title: '',
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{
          drawerLabel: 'Perfil',
          headerTransparent: true,
          title: '',
        }}
      />
      <Drawer.Screen
        name="Sair"
        component={Home}
        options={{
          drawerLabel: 'Sair',
          headerTransparent: true,
          title: '',
        }}
      />
    </Drawer.Navigator>
  );
}

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ListaPetsTab"
        component={ListaPets}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/pets-green.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen name="Mensagens" component={Mensagem} />
    </Tab.Navigator>
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
        <Stack.Screen name="Sobre" component={Sobre} />
        <Stack.Screen name="Mensagem" component={Mensagem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

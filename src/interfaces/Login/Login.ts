import { StackNavigationProp } from "@react-navigation/stack";

export type Login = {
  user: string;
  password: string;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cadastro: undefined;
  Drawer: undefined;
  ListClasses: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type Props = {
  navigation: LoginScreenNavigationProp;
};
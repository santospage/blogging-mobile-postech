import 'react-native-gesture-handler';
import React from 'react';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Navigation from '../src/routes/navigation'; // Importando a Navegação
import { AuthProvider } from '../src/contexts/AuthenticationContext'; // Corrigido para o nome correto do AuthProvider

export default function App(): JSX.Element | null {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: Poppins_400Regular,
  });

  // Se as fontes não forem carregadas ou ocorrer um erro, retorna null
  if (!fontsLoaded || fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

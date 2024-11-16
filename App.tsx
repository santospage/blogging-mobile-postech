import 'react-native-gesture-handler';
import React from 'react';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

import Navigation from './src/routes/navigation';
import { AuthentuicationProvider } from './src/contexts/AuthenticationContext';

export default function App(): JSX.Element | null {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: Poppins_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthentuicationProvider>
      <Navigation />
    </AuthentuicationProvider>
  )
}

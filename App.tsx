import 'react-native-gesture-handler';
import React from 'react';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { AuthentuicationProvider } from './src/contexts/AuthenticationContext';
import Toast from 'react-native-toast-message';

import Navigation from './src/routes/navigation';

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
      <Toast
        config={{
          topOffset: () => 30,
          visibilityTime: () => 3000,
          zIndex: () => 9999,
        }}
      />
    </AuthentuicationProvider>
  );
}

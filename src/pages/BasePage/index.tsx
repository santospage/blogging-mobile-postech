import React, {ReactNode} from 'react';
import {ImageBackground, View} from 'react-native';

import {styles} from './styles';

type PaginaBaseProps = {
  children: ReactNode;
};

export default function PaginaBase({children}: PaginaBaseProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        imageStyle={{
          resizeMode: 'cover',
          height: 300,
          top: 0,
        }}>
        {children}
      </ImageBackground>
    </View>
  );
}

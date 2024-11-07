import React, {ReactNode} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9f3',
  },
  backgroundImage: {
    height: '100%',
  },
});

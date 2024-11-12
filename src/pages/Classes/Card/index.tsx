import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../Card/styles';

interface CardProps {
  title: string;
  detail: string;
  resume: string;
  image: any;
  responsible: string;
  published: string;
  navigation: {
    navigate: (screen: string, params?: Record<string, any>) => void;
  };
}

export const Card: React.FC<CardProps> = ({
  title,
  detail,
  resume,
  image,
  responsible,
  published,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ClassRoom', {
            title: title,
            detail: detail,
            resume: resume,
            image: image,
            responsible,
            published,
          })
        }
      >
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.containerInformacoes}>
        <Text style={styles.resume}>{resume}</Text>
      </View>
    </View>
  );
};

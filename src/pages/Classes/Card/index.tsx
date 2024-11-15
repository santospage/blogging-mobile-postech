import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../Card/styles';
import { ClassRoomModel } from '../../../interfaces/Classes/Classes';

export const Card: React.FC<ClassRoomModel> = ({
  title,
  detail,
  resume,
  image,
  category,
  updatedAt,
  user,
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
            category: category.name,
            updatedAt: updatedAt,
            user: user,
          })
        }
      >
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.containerInformacoes}>
        <Text style={styles.resume}>{resume}</Text>
      </View>
    </View>
  );
};

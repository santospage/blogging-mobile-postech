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
        testID="TouchableOpacity"
        onPress={() =>
          navigation.navigate('ClassRoom', {
            title: title,
            detail: detail,
            resume: resume,
            image: image,
            category: category,
            updatedAt: updatedAt,
            user: user,
          })
        }
      >
        {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
      </TouchableOpacity>
      <View style={styles.containerInformacoes}>
        <Text style={styles.resume}>{resume}</Text>
      </View>
    </View>
  );
};

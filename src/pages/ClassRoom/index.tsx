import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import BasePage from '../BasePage';
import { useRoute, RouteProp } from '@react-navigation/native';

import { styles } from './styles';
import { ClassRoomParams } from '../../interfaces/Classes/Classes';

export default function ClassRoom() {
  const rotas = useRoute<RouteProp<ClassRoomParams, 'params'>>();
  const { title, detail, image, user, updatedAt } = rotas.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <BasePage>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.textList}>{detail}</Text>
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.image}
                testID="image"
              />
            ) : (
              <Text style={styles.textList}>No image available</Text>
            )}
            <Text style={styles.textList}>Responsible: {user?.user}</Text>
            <Text style={styles.textList}>
              Date:{' '}
              {updatedAt
                ? new Intl.DateTimeFormat('pt-BR').format(new Date(updatedAt))
                : 'No date available'}
            </Text>
          </View>
        </BasePage>
      </ScrollView>
    </View>
  );
}

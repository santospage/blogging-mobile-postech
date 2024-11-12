import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  ImageSourcePropType,
} from 'react-native';

import BasePage from '../BasePage';
import { useRoute, RouteProp } from '@react-navigation/native';
import { styles } from './styles';

type RouteParams = {
  params: {
    title: string;
    detail: string;
    resume: string;
    image: ImageSourcePropType;
    responsible: string;
    published: string;
  };
};

export default function ClassRoom() {
  const rotas = useRoute<RouteProp<RouteParams, 'params'>>();
  const { title, detail, image, responsible, published } = rotas.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <BasePage>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.textList}>{detail}</Text>
            <Image source={image} style={styles.image} />
            <Text style={styles.textList}>Responsible: {responsible}</Text>
            <Text style={styles.textList}>Published: {published}</Text>
          </View>
        </BasePage>
      </ScrollView>
    </View>
  );
}

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  ImageSourcePropType,
} from 'react-native';
import BasePage from '../BasePage';
import { Link, useRoute, RouteProp } from '@react-navigation/native';

// Tipagem dos parâmetros esperados na rota
type RouteParams = {
  params: {
    nome: string;
    imagem: ImageSourcePropType;
    descricao: {
      informacoes: string[];
      resumo: string;
      fotos: ImageSourcePropType[];
    };
    localidade: string;
  };
};

export default function Sobre() {
  const rotas = useRoute<RouteProp<RouteParams, 'params'>>();
  const { nome, imagem, descricao, localidade } = rotas.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <BasePage>
          <View style={styles.contentContainer}>
            <Image source={imagem} style={styles.imagem} />
            <Text style={styles.text}>{nome}</Text>
            {descricao.informacoes.map((informacao, index) => (
              <Text key={index} style={styles.textList}>
                {informacao}
              </Text>
            ))}
            <View style={styles.containerContato}>
              <Text style={styles.local}>{localidade}</Text>
              <View style={styles.informacoes}>
                <View style={styles.containerInteracoes}>
                  <Image source={require('../../../assets/chat.png')} />
                  <Link
                    to={{
                      screen: 'Mensagem',
                      params: {
                        nomePet: nome,
                      },
                    }}
                    style={styles.local}
                  >
                    Falar com responsável
                  </Link>
                </View>
                <View style={styles.containerInteracoes}>
                  <Image source={require('../../../assets/share.png')} />
                  <Link to={'/'} style={styles.local}>
                    Compartilhar
                  </Link>
                </View>
              </View>
            </View>
            <Text style={styles.textResumo}>{descricao.resumo}</Text>
            {descricao.fotos.map((foto, index) => (
              <Image key={index} source={foto} style={styles.image} />
            ))}
          </View>
        </BasePage>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 150,
    marginHorizontal: 40,
    zIndex: 1,
  },
  text: {
    color: '#3772FF',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagem: {
    alignSelf: 'center',
  },
  textList: {
    color: '#737380',
    fontSize: 14,
    lineHeight: 20,
  },
  containerInteracoes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  informacoes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  local: {
    color: '#737380',
    fontSize: 12,
  },
  containerContato: {
    paddingVertical: 32,
  },
  textResumo: {
    color: '#737380',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 24,
  },
});

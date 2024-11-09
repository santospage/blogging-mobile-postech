import React from 'react';
import { Link } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CardProps {
  nome: string;
  idade: string;
  porte: string;
  imagem: any;
  caracteristicas: string;
  localidade: string;
  descricao: string;
  navigation: {
    navigate: (screen: string, params?: Record<string, any>) => void;
  };
}

const Card: React.FC<CardProps> = ({
  nome,
  idade,
  porte,
  imagem,
  caracteristicas,
  localidade,
  descricao,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Sobre', {
            nome: nome,
            imagem: imagem,
            localidade: localidade,
            descricao: descricao,
          })
        }
      >
        <Image source={imagem} />
      </TouchableOpacity>
      <View style={styles.containerInformacoes}>
        <Text style={styles.title}>{nome}</Text>

        <View style={styles.informacoes}>
          <Text style={styles.informacoesTexto}>{idade}</Text>
          <Text style={styles.informacoesTexto}>{porte}</Text>
          <Text style={styles.informacoesTexto}>{caracteristicas}</Text>
        </View>

        <View style={styles.informacoes}>
          <Text style={styles.local}>{localidade}</Text>
          <View style={styles.containerChat}>
            <Image source={require('../../../../assets/chat.png')} />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Mensagem', {
                  nomePet: nome,
                })
              }
            >
              <Text style={styles.local}>Falar com responsável</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 21,
    marginBottom: 16,
  },
  title: {
    color: '#3772FF',
    fontWeight: '600',
    lineHeight: 24,
    fontSize: 16,
    marginBottom: 8,
  },
  informacoesTexto: {
    color: '#737380',
    lineHeight: 20,
    fontSize: 14,
  },
  informacoes: {
    display: 'flex',
    gap: 6,
    fontFamily: 'PoppinsRegular',
    marginBottom: 16,
  },
  local: {
    color: '#737380',
    lineHeight: 16,
    fontSize: 12,
  },
  containerInformacoes: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  containerChat: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});

export default Card;

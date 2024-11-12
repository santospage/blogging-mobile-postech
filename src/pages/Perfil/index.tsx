import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import BasePage from '../BasePage';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <BasePage>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>Tela de Cadastro</Text>
            <View style={styles.perfilContainer}>
              <Text style={styles.perfilTitle}>Perfil</Text>
              <View>
                <Text style={styles.perfilLabel}>Foto</Text>
                <Image
                  style={styles.perfilImagem}
                  source={require('../../../assets/favicon.png')}
                />
                <Text style={styles.perfilInfo}>
                  Clique na foto para editar
                </Text>
              </View>
              <View>
                <Text style={styles.perfilLabel}>Nome</Text>
                <Text style={styles.perfilDescription}>Teste</Text>
              </View>
              <View>
                <Text style={styles.perfilLabel}>Telefone</Text>
                <Text style={styles.perfilDescription}>55 11 XXXXX-XXXX</Text>
              </View>
              <View>
                <Text style={styles.perfilLabel}>Cidade</Text>
                <Text style={styles.perfilDescription}>São Paulo</Text>
              </View>
              <View>
                <Text style={styles.perfilLabel}>Sobre</Text>
                <Text style={styles.perfilDescription}>Teste de Descição.</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BasePage>
      </ScrollView>
    </View>
  );
}

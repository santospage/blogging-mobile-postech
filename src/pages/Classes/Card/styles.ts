import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  resume: {
    color: '#737380',
    fontWeight: '500',
    lineHeight: 24,
    fontSize: 15,
    marginBottom: 8,
  },
  containerInformacoes: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 16,
    flex: 1,
  },
});

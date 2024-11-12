import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentContainer: {
    gap: 32,
    paddingTop: 150,
  },
  text: {
    color: '#3772FF',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 67,
  },
  perfilTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#737380',
    fontFamily: 'PoppinsRegular',
    textAlign: 'center',
    marginBottom: 32,
  },
  perfilLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3772FF',
  },
  perfilContainer: {
    backgroundColor: '#F6F6F6',
    padding: 24,
    gap: 24,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  perfilImagem: {
    alignSelf: 'center',
  },
  perfilInfo: {
    color: '#FC7071',
    textAlign: 'center',
    fontSize: 12,
  },
  perfilDescription: {
    color: '#737380',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#FC7071',
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    width: 200,
    alignSelf: 'center',
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

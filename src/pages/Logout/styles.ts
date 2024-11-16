import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#3772FF',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    fontWeight: '400',
  },
  contentContainer: {
    gap: 32,
    paddingLeft: 56,
    paddingRight: 56,
    paddingTop: 150,
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginVertical: 16,
  },  
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
    height: '100%',
  },
  input: {
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#3299cc',
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
    width: 200,
    alignSelf: 'center',
  },
  textoBotao: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
});

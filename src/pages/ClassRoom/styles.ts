import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
    marginHorizontal: 20,
  },
  text: {
    color: '#000000',
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  textList: {
    color: '#737380',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'left',
    marginTop: 30,
  },
  image: {
    width: 370,
    height: 300,
    marginTop: -30,
    marginBottom: -30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

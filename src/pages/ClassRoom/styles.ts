import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 50,
    marginHorizontal: 20,
  },
  text: {
    color: '#000000',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 4,
  },
  textList: {
    color: '#737380',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'left',
    marginBottom: 4,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

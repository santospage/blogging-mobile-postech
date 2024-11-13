import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  contentContainer: {
    gap: 32,
    paddingTop: 80,
    zIndex: 1,
  },
  text: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 67,
  },
  searchInput: {
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: 'white',
    fontSize: 14,
    width: '50%',
    marginLeft: 5,
  },
});

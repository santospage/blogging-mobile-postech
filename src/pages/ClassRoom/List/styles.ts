import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 70,
    backgroundColor: '#d9d9f3',
  },
  classRoomItem: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  classRoomText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});

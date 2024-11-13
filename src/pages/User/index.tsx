import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';

import mockUsers from '../../mocks/users';
import UserForm from './Form';
import { styles } from './styles';

export type User = {
  id: number;
  user: string;
  fullName: string;
  email: string;
  password: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(mockUsers);
      } catch (error) {
        Alert.alert('Alert', 'Unable to load users');
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
    closeModal();
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    closeModal();
  };

  const confirmDeleteUser = (id: number) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => handleDeleteUser(id),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const openModal = (user: User | null = null) => {
    setCurrentUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentUser(null);
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.userText}>User: {item.user}</Text>
      <Text style={styles.userText}>Full Name: {item.fullName}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openModal(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => confirmDeleteUser(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>Include</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <UserForm
          user={currentUser}
          onSave={currentUser ? handleEditUser : handleAddUser}
          onClose={closeModal}
        />
      </Modal>
    </View>
  );
}

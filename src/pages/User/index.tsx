import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import UserForm from './Form';
import { styles } from './styles';
import { UserModel } from '../../interfaces/User/User';
import { userService } from '../../services/User/UserService';

export default function UserList() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const subscription = (await userService.getUsers()).subscribe({
        next: (data) => setUsers(data),
        error: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to load users',
            text2: error.toString(),
          });
        },
      });

      return () => subscription.unsubscribe();
    };

    fetchData();
  }, []);

  const handleAddUser = async (newUser: Omit<UserModel, '_id'>) => {
    (await userService.postUser(newUser)).subscribe({
      next: (savedUser) => {
        const userToAdd = savedUser.id;
        setUsers((prevUsers) => {
          return [...prevUsers, userToAdd];
        });

        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User created successfully',
        });
      },
      error: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to create user.',
        });
      },
    });
  };

  const handleEditUser = async (updatedUser: UserModel) => {
    (await userService.putUser(updatedUser)).subscribe({
      next: (savedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((cat) =>
            cat._id === savedUser._id
              ? {
                  ...cat,
                  user: savedUser.user,
                  fullName: savedUser.fullName,
                  email: savedUser.email,
                  password: savedUser.password,
                }
              : cat
          )
        );

        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User updated successfully',
        });
      },
      error: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update user.',
        });
      },
    });
  };

  const confirmDeleteUser = (id: string) => {
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

  const handleDeleteUser = async (id: string) => {
    (await userService.deleteUser(id)).subscribe({
      next: () => {
        setUsers((prevUsers) => prevUsers.filter((cat) => cat._id !== id));
        Toast.show({
          type: 'success',
          text1: 'Deleted',
          text2: 'User deleted successfully.',
        });
      },
      error: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to delete user.',
        });
      },
    });
  };

  const openModal = (user: UserModel | null = null) => {
    setCurrentUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentUser(null);
  };

  const renderItem = ({ item }: { item: UserModel }) => (
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
          onPress={() => confirmDeleteUser(item._id!)}
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
        keyExtractor={(item) => item._id!}
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

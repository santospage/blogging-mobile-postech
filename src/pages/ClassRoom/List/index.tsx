import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import ClassRoomForm from '../Form';
import { styles } from './styles';
import { classroomService } from '../../../services/Classes/ClassRoomService';
import { ClassRoomModel } from '../../../interfaces/Classes/Classes';

export default function ClassRoomList() {
  const [classes, setClasses] = useState<ClassRoomModel[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentClassRoom, setCurrentClassRoom] =
    useState<ClassRoomModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const subscription = (
        await classroomService.getClassesManagerial()
      ).subscribe({
        next: (data: ClassRoomModel[]) => setClasses(data),
        error: (error: Error) => {
          Toast.show({
            type: 'error',
            text1: 'Failed to load classes',
            text2: 'An error occurred while loading classes.',
          });
        },
      });

      return () => subscription.unsubscribe();
    };

    fetchData();
  }, []);

  const handleAddClassRoom = async (
    newClassRoom: Omit<ClassRoomModel, '_id'>,
  ) => {
    (await classroomService.postClassRoom(newClassRoom)).subscribe({
      next: (savedClassRoom) => {
        const classRoomToAdd = savedClassRoom.id;
        setClasses((prevClasses) => {
          return [...prevClasses, classRoomToAdd];
        });

        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'ClassRoom created successfully',
        });
      },
      error: () => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to create classroom.',
        });
      },
    });
  };

  const handleEditClassRoom = async (updatedClassRoom: ClassRoomModel) => {
    (await classroomService.putClassRoom(updatedClassRoom)).subscribe({
      next: (savedClassRoom) => {
        setClasses((prevClasses) =>
          prevClasses.map((cat) =>
            cat._id === savedClassRoom._id
              ? {
                  ...cat,
                  title: savedClassRoom.title,
                  resume: savedClassRoom.resume,
                  detail: savedClassRoom.detail,
                  category: savedClassRoom.category,
                  user: savedClassRoom.user,
                  image: savedClassRoom.image,
                }
              : cat,
          ),
        );

        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Classroom updated successfully',
        });
      },
      error: () => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update classroom.',
        });
      },
    });
  };

  const confirmDeleteCLassRoom = (id: string) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this classroom?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => handleDeleteClassRoom(id),
        },
      ],
      { cancelable: true },
    );
  };

  const handleDeleteClassRoom = async (id: string) => {
    (await classroomService.deleteClassRoom(id)).subscribe({
      next: () => {
        setClasses((prevClasses) =>
          prevClasses.filter((cat) => cat._id !== id),
        );
        Toast.show({
          type: 'success',
          text1: 'Deleted',
          text2: 'Classroom deleted successfully.',
        });
      },
      error: () => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to delete classroom.',
        });
      },
    });
  };

  const openModal = (classRoom: ClassRoomModel | null = null) => {
    setCurrentClassRoom(classRoom);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentClassRoom(null);
  };

  const renderItem = ({ item }: { item: ClassRoomModel }) => (
    <View style={styles.classRoomItem}>
      <Text style={styles.classRoomText}>Title: {item.title}</Text>
      <Text style={styles.classRoomText}>Resume: {item.resume}</Text>
      <Text style={styles.classRoomText}>Detail: {item.detail}</Text>
      <Text style={styles.classRoomText}>Category: {item.category.name}</Text>
      <Text style={styles.classRoomText}>User: {item.user.user}</Text>
      <Text style={styles.classRoomText}>
        Date:{' '}
        {item.updatedAt
          ? new Date(item.updatedAt).toLocaleDateString('pt-BR')
          : 'N/A'}
      </Text>
      <Text style={styles.classRoomText}>Image: {item.image}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openModal(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => confirmDeleteCLassRoom(item._id!)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item._id!}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>Include</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <ClassRoomForm
          classRoom={currentClassRoom}
          onSave={currentClassRoom ? handleEditClassRoom : handleAddClassRoom}
          onClose={closeModal}
        />
      </Modal>
    </View>
  );
}

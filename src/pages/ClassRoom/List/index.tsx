import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';

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
    const subscription = classroomService.getClasses().subscribe({
      next: (data) => setClasses(data),
      error: (error) => {
        Alert.alert('Alert', error);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAddClassRoom = (newClassRoom: ClassRoomModel) => {
    const newClassRoomModel: ClassRoomModel = {
      ...newClassRoom,
      title: '',
      detail: '',
      resume: '',
      image: '',
      updatedAt: '',
      category: { name: '' },
      user: { user: '' },
    };
    setClasses([...classes, newClassRoomModel]);
    closeModal();
  };

  const handleEditClassRoom = (updatedClassRoom: ClassRoomModel) => {
    setClasses(
      classes.map((u) =>
        u._id === updatedClassRoom._id ? updatedClassRoom : u
      )
    );
    closeModal();
  };

  const confirmDeleteClassRoom = (id: string) => {
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
      { cancelable: true }
    );
  };

  const handleDeleteClassRoom = (id: string) => {
    setClasses(classes.filter((u) => u._id !== id));
  };

  const openModal = (user: ClassRoomModel | null = null) => {
    setCurrentClassRoom(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentClassRoom(null);
  };

  const renderItem = ({ item }: { item: ClassRoomModel }) => (
    <View style={styles.classRoomItem}>
      <Text style={styles.classRoomText}>
        <Text style={{ fontWeight: 'bold' }}>Title: </Text>
        {item.title}
      </Text>
      <Text style={styles.classRoomText}>
        <Text style={{ fontWeight: 'bold' }}>Detail: </Text>
        {item.detail}
      </Text>
      <Text style={styles.classRoomText}>
        <Text style={{ fontWeight: 'bold' }}>Resume: </Text>
        {item.resume}
      </Text>
      <Text style={styles.classRoomText}>
        <Text style={{ fontWeight: 'bold' }}>Category: </Text>
        {item.category.name}
      </Text>
      <Text style={styles.classRoomText}>
        <Text style={{ fontWeight: 'bold' }}>Responsible: </Text>
        {item.user.user}
      </Text>
      <Text style={styles.classRoomText}>
        <Text style={{ fontWeight: 'bold' }}>Date: </Text>
        {item.updatedAt
          ? new Intl.DateTimeFormat('pt-BR').format(new Date(item.updatedAt))
          : 'No date available'}
      </Text>
      <Text style={styles.classRoomText}>
        <Text style={{ fontWeight: 'bold' }}>Image: </Text>
        {item.image}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openModal(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => confirmDeleteClassRoom(item._id)}
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
        keyExtractor={(item) => item._id.toString()}
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

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageSourcePropType,
} from 'react-native';
import Modal from 'react-native-modal';

import ClassRoomForm from '../Form';
import { styles } from './styles';
import classesMock from '../../../mocks/classes';

export type ClassRoom = {
  id: number;
  title: string;
  detail: string;
  resume: string;
  responsible: string;
  published: string;
  image?: ImageSourcePropType;
  url: string;
};

export default function ClassRoomList() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentClassRoom, setCurrentClassRoom] = useState<ClassRoom | null>(
    null
  );

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setClasses(classesMock);
      } catch (error) {
        Alert.alert('Alert', 'Unable to load classes');
      }
    };
    fetchClasses();
  }, []);

  const handleAddClassRoom = (newClassRoom: ClassRoom) => {
    setClasses([...classes, newClassRoom]);
    closeModal();
  };

  const handleEditClassRoom = (updatedClassRoom: ClassRoom) => {
    setClasses(
      classes.map((u) => (u.id === updatedClassRoom.id ? updatedClassRoom : u))
    );
    closeModal();
  };

  const confirmDeleteClassRoom = (id: number) => {
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

  const handleDeleteClassRoom = (id: number) => {
    setClasses(classes.filter((u) => u.id !== id));
  };

  const openModal = (user: ClassRoom | null = null) => {
    setCurrentClassRoom(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentClassRoom(null);
  };

  const renderItem = ({ item }: { item: ClassRoom }) => (
    <View style={styles.classRoomItem}>
      <Text style={styles.classRoomText}>Title: {item.title}</Text>
      <Text style={styles.classRoomText}>Detail: {item.detail}</Text>
      <Text style={styles.classRoomText}>Resume: {item.resume}</Text>
      <Text style={styles.classRoomText}>Responsible: {item.responsible}</Text>
      <Text style={styles.classRoomText}>Published: {item.published}</Text>
      <Text style={styles.classRoomText}>URL: {item.url}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openModal(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => confirmDeleteClassRoom(item.id)}
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
        keyExtractor={(item) => item.id.toString()}
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

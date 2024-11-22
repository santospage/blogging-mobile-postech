import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import {
  ClassRoom,
  ClassRoomFormProps,
} from '../../../interfaces/Classes/Classes';
import { CategoryModel } from '../../../interfaces/Category/Category';
import { categoryService } from '../../../services/Category/CategoryService';

export default function CategoryForm({
  classRoom,
  onSave,
  onClose,
}: ClassRoomFormProps) {
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState('');
  const [detail, setDetail] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [user, setUser] = useState('');
  const [idUser, setIdUser] = useState('');
  const [image, setImage] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  // Fetch categories
  useEffect(() => {
    const subscription = categoryService.getCategories().subscribe({
      next: (data) =>
        setCategories(
          data.map((category) => ({ ...category, _id: category._id || '' })),
        ),
      error: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error loading categories',
          text2: error.message || 'Try again later.',
        });
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  // Set default values
  useEffect(() => {
    async function fetchDefaults() {
      const currentUser = await AsyncStorage.getItem('USER_SESSION');
      const idUser = await AsyncStorage.getItem('USER_ID');
      const currentDate = new Date().toISOString();

      setUser(
        typeof classRoom?.user === 'string'
          ? classRoom.user
          : currentUser || '',
      );
      setIdUser(idUser || '');
      setUpdatedAt(
        classRoom?.updatedAt
          ? new Date(classRoom.updatedAt).toLocaleDateString('pt-BR')
          : new Date(currentDate).toLocaleDateString('pt-BR'),
      );
    }

    fetchDefaults();

    setTitle(classRoom?.title || '');
    setResume(classRoom?.resume || '');
    setDetail(classRoom?.detail || '');
    setCategoryId(classRoom?._id || '');
    setImage(classRoom?.image || '');
  }, [classRoom]);

  const handleSave = async () => {
    // Validations
    if (!title || !resume || !detail || !categoryId) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'All fields are mandatory!',
        visibilityTime: 3000,
      });
      return;
    }

    const formData: ClassRoom = {
      ...classRoom,
      title,
      resume,
      detail,
      category: categoryId,
      user: idUser,
      date: Date.now().toString(),
      image,
    };

    onSave(formData);
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Resume:</Text>
        <TextInput
          style={styles.input}
          placeholder="Resume"
          value={resume}
          onChangeText={setResume}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Detail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Detail"
          value={detail}
          onChangeText={setDetail}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={categoryId}
          onValueChange={(itemValue) => setCategoryId(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a category" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
          ))}
        </Picker>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>User:</Text>
        <TextInput
          style={styles.input}
          placeholder="User"
          value={user}
          onChangeText={setUser}
          editable={false}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={updatedAt}
          editable={false}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Image:</Text>
        <TextInput
          style={styles.input}
          placeholder="Image"
          value={image}
          onChangeText={setImage}
          editable={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

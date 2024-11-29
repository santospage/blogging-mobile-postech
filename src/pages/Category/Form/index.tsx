import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import { CategoryFormProps } from '../../../interfaces/Category/Category';

export default function CategoryForm({
  category,
  onSave,
  onClose,
}: CategoryFormProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(category?.name || '');
  }, [category]);

  const handleSave = () => {
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Name is mandatory!',
      });
      return;
    }

    const newCategory = category
      ? { ...category, name: name.trim() }
      : { name: name.trim() };

    onSave(newCategory);
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
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

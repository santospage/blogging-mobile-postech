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

  // Validation
  if (!name) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'Name is mandatory!',
    });
    return;
  }

  const handleSave = () => {
    if (category) {
      onSave({ ...category, name });
    } else {
      onSave({ name });
    }
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

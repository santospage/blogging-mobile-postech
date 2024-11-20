import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../Form/styles';
import { CategoryModel } from '../../../interfaces/Categories/Categories';

type CategoryFormProps = {
  category: CategoryModel | null;
  onSave: (category: CategoryModel) => void;
  onClose: () => void;
};

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

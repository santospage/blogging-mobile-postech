import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import { Category } from '..';
import { styles } from '../Form/styles';

type CategoryFormProps = {
  category: Category | null;
  onSave: (category: Category) => void;
  onClose: () => void;
};

export default function CategoryForm({
  category,
  onSave,
  onClose,
}: CategoryFormProps) {
  const [categoryData, setCategoryData] = useState<Pick<Category, 'name'>>({
    name: '',
  });

  useEffect(() => {
    if (category) {
      setCategoryData({
        name: category.name,
      });
    } else {
      setCategoryData({ name: '' });
    }
  }, [category]);

  const handleSave = () => {
    if (categoryData.name) {
      const newCategory = category
        ? { ...category, ...categoryData }
        : { ...categoryData, id: Date.now() };
      onSave(newCategory);
    } else {
      Alert.alert('Alert', 'Fill in all fields');
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={categoryData.name}
          onChangeText={(text) =>
            setCategoryData({ ...categoryData, name: text })
          }
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

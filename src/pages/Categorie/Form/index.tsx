import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import { styles } from '../Form/styles';
import { CategoryModel } from '../../../interfaces/Categories/Categories';
import { categoryService } from '../../../services/Categories/CategorieService';

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
  const [categoryData, setCategoryData] = useState<Pick<CategoryModel, 'name'>>(
    {
      name: '',
    }
  );

  useEffect(() => {
    if (category) {
      setCategoryData({
        name: category.name,
      });
    } else {
      setCategoryData({ name: '' });
    }
  }, [category]);

  const handleSave = async () => {
    if (categoryData.name) {
      try {
        const newCategory = category
          ? { ...category, ...categoryData }
          : { ...categoryData, _id: Date.now().toString() };

        categoryService.putCategory(newCategory);

        onSave(newCategory);
      } catch (error) {
        Alert.alert('Error', 'Failed to save category');
      }
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

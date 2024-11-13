import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';

import CategorieForm from './Form';
import { styles } from './styles';
import mockCategories from '../../mocks/categories';

export type Category = {
  id: number;
  name: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(mockCategories);
      } catch (error) {
        Alert.alert('Alert', 'Unable to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
    closeModal();
  };

  const handleEditCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map((u) => (u.id === updatedCategory.id ? updatedCategory : u))
    );
    closeModal();
  };

  const confirmDeleteCategory = (id: number) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this category?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => handleDeleteCategory(id),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((u) => u.id !== id));
  };

  const openModal = (category: Category | null = null) => {
    setCurrentCategory(category);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentCategory(null);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>Name: {item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openModal(item)}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => confirmDeleteCategory(item.id)}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>Include</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <CategorieForm
          category={currentCategory}
          onSave={currentCategory ? handleEditCategory : handleAddCategory}
          onClose={closeModal}
        />
      </Modal>
    </View>
  );
}

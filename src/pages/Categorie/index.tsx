import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import CategorieForm from './Form';
import { styles } from './styles';
import { CategoryModel } from '../../interfaces/Categories/Categories';
import { categoryService } from '../../services/Categories/CategorieService';

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryModel | null>(
    null
  );

  useEffect(() => {
    const subscription = categoryService.getCategories().subscribe({
      next: (data) => setCategories(data),
      error: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Failed to load categories',
          text2: error.toString(),
        });
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAddCategory = (newCategory: CategoryModel) => {
    categoryService.postCategory(newCategory).subscribe({
      next: (savedCategory) => {
        setCategories([...categories, savedCategory]);
        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Category added successfully',
        });
      },
      error: (error) => {
        console.error('Failed to add category:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to add category. Please try again later.',
        });
      },
    });
  };

  const handleDeleteCategory = (id: string) => {
    categoryService.deleteCategory(id).subscribe({
      next: () => {
        setCategories(categories.filter((u) => u._id !== id));
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Category deleted successfully',
        });
      },
      error: (error) => {
        console.error('Failed to delete category:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to delete category. Please try again later.',
        });
      },
    });
  };

  const confirmDeleteCategory = (id: string) => {
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

  const openModal = (category: CategoryModel | null = null) => {
    setCurrentCategory(category);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentCategory(null);
  };

  const renderItem = ({ item }: { item: CategoryModel }) => (
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
          onPress={() => confirmDeleteCategory(item._id)}
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
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>Include</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <CategorieForm
          category={currentCategory}
          onSave={handleAddCategory}
          onClose={closeModal}
        />
      </Modal>
      <Toast />
    </View>
  );
}

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import CategoryForm from './Form';
import { styles } from './styles';
import { CategoryModel } from '../../interfaces/Category/Category';
import { categoryService } from '../../services/Category/CategoryService';

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

  const handleAddCategory = async (newCategory: Omit<CategoryModel, '_id'>) => {
    (await categoryService.postCategory(newCategory)).subscribe({
      next: (savedCategory) => {
        const categoryToAdd = savedCategory.id;
        setCategories((prevCategories) => {
          return [...prevCategories, categoryToAdd];
        });

        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Category created successfully',
        });
      },
      error: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to create category.',
        });
      },
    });
  };

  const handleEditCategory = async (updatedCategory: CategoryModel) => {
    (await categoryService.putCategory(updatedCategory)).subscribe({
      next: (savedCategory) => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === savedCategory._id
              ? { ...cat, name: savedCategory.name }
              : cat
          )
        );

        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Category updated successfully',
        });
      },
      error: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update category.',
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

  const handleDeleteCategory = async (id: string) => {
    (await categoryService.deleteCategory(id)).subscribe({
      next: () => {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat._id !== id)
        );
        Toast.show({
          type: 'success',
          text1: 'Deleted',
          text2: 'Category deleted successfully.',
        });
      },
      error: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to delete category.',
        });
      },
    });
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
          onPress={() => confirmDeleteCategory(item._id!)}
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
        keyExtractor={(item) => item._id!}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>Include</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <CategoryForm
          category={currentCategory}
          onSave={currentCategory ? handleEditCategory : handleAddCategory}
          onClose={closeModal}
        />
      </Modal>
    </View>
  );
}

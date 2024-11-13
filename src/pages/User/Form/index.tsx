import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { User } from '..';
import { styles } from '../Form/styles';

type UserFormProps = {
  user: User | null;
  onSave: (user: User) => void;
  onClose: () => void;
};

export default function UserForm({ user, onSave, onClose }: UserFormProps) {
  const [userData, setUserData] = useState<
    Pick<User, 'user' | 'fullName' | 'email' | 'password'>
  >({
    user: '',
    fullName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setUserData({
        user: user.user,
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      });
    } else {
      setUserData({ user: '', fullName: '', email: '', password: '' });
    }
  }, [user]);

  const handleSave = () => {
    if (
      userData.user &&
      userData.fullName &&
      userData.email &&
      userData.password
    ) {
      const newUser = user
        ? { ...user, ...userData }
        : { ...userData, id: Date.now() };
      onSave(newUser);
    } else {
      Alert.alert('Alert', 'Fill in all fields');
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>User:</Text>
        <TextInput
          style={styles.input}
          placeholder="User"
          value={userData.user}
          onChangeText={(text) => setUserData({ ...userData, user: text })}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>FullName:</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={userData.fullName}
          onChangeText={(text) => setUserData({ ...userData, fullName: text })}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>E-Mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={userData.password}
          secureTextEntry
          onChangeText={(text) => setUserData({ ...userData, password: text })}
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

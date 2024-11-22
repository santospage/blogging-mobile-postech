import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import { styles } from './styles';
import { UserFormProps } from '../../../interfaces/User/User';

export default function UserForm({ user, onSave, onClose }: UserFormProps) {
  const [currentUser, setUser] = useState(user?.user || '');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');

  useEffect(() => {
    setUser(user?.user || '');
    setFullName(user?.fullName || '');
    setEmail(user?.email || '');
    setPassword(user?.password || '');
  }, [user]);

  // Validations
  if (!currentUser) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'User is mandatory!',
    });
    return;
  }

  if (!fullName) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'FullName is mandatory!',
    });
    return;
  }

  if (!password) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'Password is mandatory!',
    });
    return;
  }

  const handleSave = () => {
    if (user) {
      onSave({ ...user, user: currentUser, fullName, email, password });
    } else {
      onSave({ user: currentUser, fullName, email, password });
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>User:</Text>
        <TextInput
          style={styles.input}
          placeholder="User"
          value={currentUser}
          onChangeText={setUser}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
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

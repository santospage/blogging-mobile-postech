import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import { styles } from '../Form/styles';
import {
  ClassRoomFormProps,
  ClassRoomModel,
} from '../../../interfaces/Classes/Classes';

export default function ClassRoomForm({
  classRoom,
  onSave,
  onClose,
}: ClassRoomFormProps) {
  const [classRoomData, setClassRoomData] = useState<
    Pick<
      ClassRoomModel,
      | 'title'
      | 'detail'
      | 'resume'
      | 'category'
      | 'user'
      | 'updatedAt'
      | 'image'
    >
  >({
    title: '',
    detail: '',
    resume: '',
    category: { name: '' },
    user: { user: '' },
    updatedAt: '',
    image: '',
  });

  useEffect(() => {
    if (classRoom) {
      setClassRoomData({
        title: classRoom.title,
        detail: classRoom.detail,
        resume: classRoom.resume,
        category: { name: classRoom.category.name },
        user: classRoom.user,
        updatedAt: classRoom.updatedAt,
        image: classRoom.image,
      });
    } else {
      setClassRoomData({
        title: '',
        detail: '',
        resume: '',
        category: { name: '' },
        user: { user: '' },
        updatedAt: '',
        image: '',
      });
    }
  }, [classRoom]);

  const handleSave = () => {
    if (
      classRoomData.title &&
      classRoomData.detail &&
      classRoomData.resume &&
      classRoomData.category
    ) {
      const newClassRoom = classRoom
        ? { ...classRoom, ...classRoomData }
        : { ...classRoomData, _id: Date.now().toString() };
      onSave(newClassRoom);
    } else {
      Alert.alert('Alert', 'Fill in all fields');
    }
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={classRoomData.title}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, title: text })
          }
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Detail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Detail"
          value={classRoomData.detail}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, detail: text })
          }
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Resume:</Text>
        <TextInput
          style={styles.input}
          placeholder="Resume"
          value={classRoomData.resume}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, resume: text })
          }
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={classRoomData.category.name}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, category: { name: text } })
          }
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Responsible:</Text>
        <TextInput
          style={styles.input}
          placeholder="Responsible"
          value={classRoomData.user.user}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, user: { user: text } })
          }
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={
            classRoomData.updatedAt
              ? new Intl.DateTimeFormat('pt-BR').format(
                  new Date(classRoomData.updatedAt)
                )
              : ''
          }
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, updatedAt: text })
          }
          editable={false}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Image:</Text>
        <TextInput
          style={styles.input}
          placeholder="Image"
          value={classRoomData.image}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, image: text })
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

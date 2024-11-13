import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import { ClassRoom } from '../List';
import { styles } from '../Form/styles';

type ClassRoomFormProps = {
  classRoom: ClassRoom | null;
  onSave: (user: ClassRoom) => void;
  onClose: () => void;
};

export default function ClassRoomForm({
  classRoom,
  onSave,
  onClose,
}: ClassRoomFormProps) {
  const [classRoomData, setClassRoomData] = useState<
    Pick<
      ClassRoom,
      'title' | 'detail' | 'resume' | 'responsible' | 'published' | 'url'
    >
  >({
    title: '',
    detail: '',
    resume: '',
    responsible: '',
    published: '',
    url: '',
  });

  useEffect(() => {
    if (classRoom) {
      setClassRoomData({
        title: classRoom.title,
        detail: classRoom.detail,
        resume: classRoom.resume,
        responsible: classRoom.responsible,
        published: classRoom.published,
        url: classRoom.url,
      });
    } else {
      setClassRoomData({
        title: '',
        detail: '',
        resume: '',
        responsible: '',
        published: '',
        url: '',
      });
    }
  }, [classRoom]);

  const handleSave = () => {
    if (
      classRoomData.title &&
      classRoomData.detail &&
      classRoomData.resume &&
      classRoomData.responsible &&
      classRoomData.published &&
      classRoomData.url
    ) {
      const newClassRoom = classRoom
        ? { ...classRoom, ...classRoomData }
        : { ...classRoomData, id: Date.now() };
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
        <Text style={styles.label}>Responsible:</Text>
        <TextInput
          style={styles.input}
          placeholder="Responsible"
          value={classRoomData.responsible}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, responsible: text })
          }
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Published:</Text>
        <TextInput
          style={styles.input}
          placeholder="Published"
          value={classRoomData.published}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, published: text })
          }
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>URL:</Text>
        <TextInput
          style={styles.input}
          placeholder="URL"
          value={classRoomData.url}
          onChangeText={(text) =>
            setClassRoomData({ ...classRoomData, url: text })
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

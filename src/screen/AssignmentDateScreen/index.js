import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssignmentDateScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    const newItem = {title, description, dueDate: dueDate.toISOString()};
    const newItems = [...items, newItem];
    await saveData(newItems);
    setTitle('');
    setDescription('');
    setDueDate(new Date());
    setItems(newItems);
  };

  const saveData = async data => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('items', jsonValue);
    } catch (e) {
      console.error('Error saving data', e);
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('items');
      setItems(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.error('Error loading data', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <DatePicker
        style={styles.datePicker}
        value={dueDate}
        mode="date"
        display="default"
        onChange={(event, date) => date && setDueDate(date)}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <Text>{`${item.title} - ${new Date(
            item.dueDate,
          ).toLocaleDateString()}`}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePicker: {
    marginBottom: 20,
  },
});

export default AssignmentDateScreen;

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../../features/counter/counterSlice';
import {addToCart} from '../../features/cart/cartSlice';
import {logout} from '../../features/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from '@react-native-community/datetimepicker';

const itemList = [
  {id: 1, name: 'Macbook', details: '', price: 2500},
  {id: 2, name: 'iPhone', details: '', price: 1500},
  {id: 3, name: 'iPad', details: '', price: 800},
  {id: 4, name: 'Tripod', details: '', price: 50},
  {id: 5, name: 'Newtonion Telescope', details: '', price: 500},
  {id: 6, name: 'LED Monitor', details: '', price: 200},
];

const ReduxScreen = () => {
  const [customVal, setCustomVal] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [assignments, setAssignments] = useState([]);
  const dispatch = useDispatch();
  const counterValue = useSelector(state => state.counter.value);

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    const newItem = {title, description, dueDate: dueDate.toISOString()};
    const newAssignments = [...assignments, newItem];
    await saveData(newAssignments);
    setAssignments(newAssignments);
    setTitle('');
    setDescription('');
    setDueDate(new Date());
  };

  const saveData = async data => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('assignments', jsonValue);
    } catch (e) {
      console.error('Error saving data', e);
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('assignments');
      setAssignments(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.error('Error loading data', e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.assignmentForm}>
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
      </View>

      <FlatList
        style={{flex: 1}}
        data={assignments}
        renderItem={({item}) => (
          <View style={styles.assignmentItem}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{new Date(item.dueDate).toLocaleDateString()}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Rest of the existing ReduxScreen content */}
    </View>
  );
};

const styles = StyleSheet.create({
  assignmentForm: {
    marginBottom: 20,
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
  assignmentItem: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
  },
});

export default ReduxScreen;

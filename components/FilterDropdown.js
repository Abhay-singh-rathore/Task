import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FilterDropdown = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selected}
        style={{ height: 30, width: 150 }}
        onValueChange={onSelect}
        mode="dropdown"
      >
        <Picker.Item label="By Priority" value="priority" />
        <Picker.Item label="By Time Added" value="time" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
});

export default FilterDropdown;

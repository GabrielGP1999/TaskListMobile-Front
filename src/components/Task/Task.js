import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Task = (props) => {
const [checkTask, setCheckTask] = useState(false)

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={() => setCheckTask(!checkTask)} style={styles.square}>
            {checkTask ? <Icon name="check" style={styles.checkIcon} size={26} color={'#000'} /> : null}
        </TouchableOpacity>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View><Icon name="delete-outline" size={26} color={"#002b8f"} /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    width: '95%',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,

  },
  itemLeft: {
    flexDirection: "row",
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15
  },
  itemText: {
    maxWidth: '80%'
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  
}); 

export default Task;

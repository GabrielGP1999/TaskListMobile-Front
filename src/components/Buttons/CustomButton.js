import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'

const CustomButton = ({onPress, text, type = "PRIMARY"}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={styles.logo}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        padding: 15,
        
        margin: 5,
        width: '100%',
        borderRadius: 5
    },

    container_MARGINTOP: {
        marginTop: 15
    },

    container_PRIMARY: {
        backgroundColor: '#3b71F3',
    },

    container_SECONDARY: {
        backgroundColor: '#002b8f',
    },

    logo: {
        fontWeight: 'bold',
        color: 'white'
    }
})

export default CustomButton
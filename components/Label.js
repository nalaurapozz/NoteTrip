import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Label = ({text, style}) => 
    <Text style={[styles.text, style]}>{text}</Text>


export default Label

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontWeight: "bold",
        left: 10,
      },
})
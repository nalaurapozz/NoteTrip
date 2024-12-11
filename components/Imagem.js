import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Imagem = ({source, caption}) => {
  return (
    <View style={styles.container}>
   
    <Image source={{uri:source}} style={styles.imagem} />
   
    <Text style={styles.caption}>{caption}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 30
    },
    imagem: {
      width: '60%',
      height: '80%',
      borderRadius: 10,
      marginBottom: 10,
      
    },
    caption: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000',
    },
  });

export default Imagem

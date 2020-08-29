import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

function Header({ titleText, onBack, isBack = false }) {
  return (
    <View style={styles.container}>
      {isBack ? <Text onPress={onBack} style={styles.back} >Back</Text> : <View />}
      <Text style={styles.title}>{titleText}</Text>
      <View />
    </View >
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#55e886'
  },
  container: {
    flexDirection: "row",
    height: 50,
    width: '100%',
    backgroundColor: '#55e886',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  back: {
    color: 'white',
    marginStart: 15
  },
  title: {
    color: 'white'
  }
})

export default Header

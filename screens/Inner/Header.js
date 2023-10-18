import { View, Text, TextInput,StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View>
      <TextInput placeholder='Search' style={styles.SearchBar}/>
    </View>
  )
}
const styles = StyleSheet.create({
    SearchBar:{
        borderWidth:1,
        width:Dimensions.get('screen').width*0.9,
        marginLeft:20,
        borderColor:'gray',
        marginTop:30,
        padding:7,
        paddingLeft:10,
        borderRadius:50,
    }
})
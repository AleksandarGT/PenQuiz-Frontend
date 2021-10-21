import { StyleSheet, ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function ReactiveSquares() {
    const onLayout = (e) => {
      if (width !== e.nativeEvent.layout.width) {
        setWidth({
          width: e.nativeEvent.layout.width
        })
      }
    }
  
    const [width, setWidth] = useState(110);
  
  
    return (
      <ScrollView>
      <View style={styles.container} onLayout={onLayout.bind(this)}>
        <View style={[styles.wrapper, { width: width }]}>
          <View style={styles.box}></View>
        </View>
        <View style={[styles.wrapper, { width: width }]}>
          <View style={styles.box}></View>
        </View>
        <View style={[styles.wrapper, { width: width }]}>
          <View style={styles.box}></View>
        </View>
        <View style={[styles.wrapper, { width: width }]}>
          <View style={styles.box}></View>
        </View>
        <View style={[styles.wrapper, { width: width }]}>
          <View style={styles.box}></View>
        </View>
      </View>
    </ScrollView>
    )
  }
  

  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: 40,
    },
    box: {
      width: 100,
      height: 100,
      backgroundColor: 'green',
    },
    wrapper: {
      marginVertical: 10, alignItems: 'center'
    }
  });
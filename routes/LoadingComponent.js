import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export function LoadingComponent() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });
import { Center } from 'native-base';
import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

export function LoadingComponent({ message }) {
  return (
    <View style={styles.container}>
      <Center>
        <Text>{message}</Text>
      </Center>
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
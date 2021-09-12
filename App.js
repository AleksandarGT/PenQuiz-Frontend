import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import FlexibleSquares from './components/FlexibleSquares';
import GridSquares from './components/GridSquares';
import ReactiveSquares from './components/ReactiveSquares';
import { SignalRComponent } from './components/SignalRComponent';

export default function App() {
  return (
    <SignalRComponent />
  )
}


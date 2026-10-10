import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function LoadingSpinner({ message = 'Cargando...' }: { message?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0a7ea4" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 10, color: '#666', fontSize: 14 },
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BASE_URL } from '../../constants/config';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de la API</Text>
      <Text style={styles.label}>Base URL actual:</Text>
      <Text style={styles.url}>{BASE_URL}</Text>
      <Text style={styles.hint}>Esta URL se configura en src/constants/config.ts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 6 },
  url: { fontSize: 14, color: '#0a7ea4', fontWeight: '600', backgroundColor: '#f1f1f1', padding: 10, borderRadius: 8 },
  hint: { fontSize: 12, color: '#999', marginTop: 10, fontStyle: 'italic' },
});
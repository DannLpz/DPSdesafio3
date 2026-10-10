import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  error?: string;
}

export default function CustomInput({ label, value, onChangeText, placeholder, keyboardType = 'default', error }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12,
    paddingVertical: 10, fontSize: 15, backgroundColor: '#fff',
  },
  inputError: { borderColor: '#d32f2f' },
  errorText: { color: '#d32f2f', fontSize: 12, marginTop: 4 },
});
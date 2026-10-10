import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createItem } from '../../services/resourceService';
import CustomInput from '../../components/CustomInput';

export default function CreateScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'El título es obligatorio';
    if (!author.trim()) newErrors.author = 'El autor es obligatorio';
    if (!category.trim()) newErrors.category = 'La categoría es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setSaving(true);
      await createItem({
        title, author, category,
        imageUrl: imageUrl || 'https://via.placeholder.com/150',
        status: 'Disponible',
        rating: 0,
        createdAt: new Date().toISOString(),
      });
      Alert.alert('Éxito', 'Libro agregado correctamente');
      setTitle(''); setAuthor(''); setCategory(''); setImageUrl('');
      router.replace('/');
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar el libro');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <CustomInput label="Título del Libro" value={title} onChangeText={setTitle} error={errors.title} placeholder="Ej. Cien años de soledad" />
      <CustomInput label="Autor" value={author} onChangeText={setAuthor} error={errors.author} placeholder="Ej. Gabriel García Márquez" />
      <CustomInput label="Categoría" value={category} onChangeText={setCategory} error={errors.category} placeholder="Ej. Novela" />
      <CustomInput label="URL de Portada (opcional)" value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={saving}>
        <Text style={styles.buttonText}>{saving ? 'Guardando...' : 'Agregar Libro'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  button: { backgroundColor: '#0a7ea4', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
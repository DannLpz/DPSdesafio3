import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getItemById, updateItem, deleteItem } from '../../services/resourceService';
import { EntityItem } from '../../types/Entity';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<EntityItem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const data = await getItemById(id);
      setItem(data);
    } catch (e) {
      Alert.alert('Error', 'No se pudo cargar el libro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItem(); }, [id]);

  const toggleStatus = async () => {
  if (!item) return;
  const newStatus = item.status === 'Disponible' ? 'Prestado' : 'Disponible';
  try {
    const updated = await updateItem(item.id, { status: newStatus });
    setItem(updated);
    Alert.alert('✅ Actualizado', `El libro ahora está: ${newStatus}`);
  } catch (e: any) {
    const msg = e.response?.data?.message || e.message || 'Error desconocido';
    Alert.alert('Error al actualizar', `Detalle: ${msg}`);
  }
};

const handleDelete = async () => {
  try {
    await deleteItem(id);
    Alert.alert('✅ Eliminado', 'El libro ha sido eliminado');
    router.replace('/');
  } catch (e: any) {
    const msg = e.response?.data?.message || e.message || 'Error desconocido';
    Alert.alert('Error al eliminar', `Detalle: ${msg}`);
  }
};

  const confirmDelete = () => {
    Alert.alert('Confirmar', '¿Estás seguro de eliminar este libro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: handleDelete },
    ]);
  };

  if (loading) return <LoadingSpinner />;
  if (!item) return <Text style={{ padding: 20 }}>Libro no encontrado</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
      <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.category}>Categoría: {item.category}</Text>
      
      <View style={[styles.badge, { backgroundColor: item.status === 'Disponible' ? '#2e7d32' : '#d32f2f' }]}>
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.updateBtn]} onPress={toggleStatus}>
        <Text style={styles.buttonText}>Cambiar Estado (PUT)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteBtn]} onPress={confirmDelete}>
        <Text style={styles.buttonText}>Eliminar Libro (DELETE)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: 160, height: 220, borderRadius: 12, marginBottom: 16, backgroundColor: '#eee' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  author: { fontSize: 16, color: '#555', marginTop: 4 },
  category: { fontSize: 14, color: '#0a7ea4', marginTop: 8 },
  badge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, marginTop: 16 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  button: { width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  updateBtn: { backgroundColor: '#0a7ea4' },
  deleteBtn: { backgroundColor: '#d32f2f' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
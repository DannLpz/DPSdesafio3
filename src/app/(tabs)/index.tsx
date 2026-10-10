import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getItems } from '../../services/resourceService';
import { EntityItem } from '../../types/Entity';
import ItemCard from '../../components/ItemCard';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function CatalogScreen() {
  const [items, setItems] = useState<EntityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getItems();
      
      // 🔍 LOGS DE DIAGNÓSTICO — BORRAR DESPUÉS DE ARREGLAR
      console.log('📚 Total de libros:', data.length);
      console.log('📚 Primer libro completo:', JSON.stringify(data[0], null, 2));
      console.log('📚 IDs de todos:', data.map(d => d.id));
      
      setItems(data);
    } catch (e) {
      console.error('❌ Error al cargar:', e);
      setError('Error al cargar los libros. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  const handlePressItem = (item: EntityItem) => {
    console.log('🎯 Item presionado:', item.title, '| ID:', item.id);
    if (!item.id) {
      console.error('❌ Este libro NO tiene ID:', item);
      return;
    }
    router.push(`/detail/${item.id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retry} onPress={fetchItems}>Toca para reintentar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item.id ?? 'book'}-${index}`}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={() => handlePressItem(item)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay libros en el catálogo.</Text>}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: '#d32f2f', fontSize: 16, textAlign: 'center' },
  retry: { color: '#0a7ea4', marginTop: 10, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, color: '#666' },
});
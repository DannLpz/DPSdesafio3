import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EntityItem } from '../types/Entity';

interface Props {
  item: EntityItem;
  onPress: () => void;
}

export default function ItemCard({ item, onPress }: Props) {
  const isAvailable = item.status === 'Disponible';
  const rating = item.rating || 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }}
        style={styles.image}
      />
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title || 'Sin título'}
          </Text>
        </View>

        <Text style={styles.author} numberOfLines={1}>
          <Ionicons name="person-outline" size={12} color="#666" />{' '}
          {item.author || 'Autor desconocido'}
        </Text>

        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: isAvailable ? '#e8f5e9' : '#ffebee' }]}>
            <View style={[styles.dot, { backgroundColor: isAvailable ? '#2e7d32' : '#d32f2f' }]} />
            <Text style={[styles.badgeText, { color: isAvailable ? '#2e7d32' : '#d32f2f' }]}>
              {item.status || 'Sin estado'}
            </Text>
          </View>
          <Text style={styles.category}>{item.category || 'General'}</Text>
        </View>

        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= rating ? 'star' : 'star-outline'}
              size={13}
              color="#f5a623"
            />
          ))}
          <Text style={styles.ratingText}>({rating}/5)</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 14,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  image: {
    width: 85,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  info: { flex: 1, marginLeft: 14 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: '#1a1a1a', flex: 1 },
  author: { fontSize: 13, color: '#666', marginTop: 4 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  category: {
    fontSize: 11,
    color: '#0a7ea4',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    fontWeight: '600',
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  ratingText: { fontSize: 11, color: '#999', marginLeft: 4 },
  chevron: { marginLeft: 4 },
});
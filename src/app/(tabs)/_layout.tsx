import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0a7ea4', headerStyle: { backgroundColor: '#0a7ea4' }, headerTintColor: '#fff' }}>
      <Tabs.Screen name="index" options={{ title: 'Catálogo', tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} /> }} />
      <Tabs.Screen name="create" options={{ title: 'Agregar', tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Ajustes', tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> }} />
    </Tabs>
  );
}
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="detail/[id]" options={{ headerShown: true, title: 'Detalle del Libro' }} />
    </Stack>
  );
}
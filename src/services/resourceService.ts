import { api } from './api';
import { EntityItem } from '../types/Entity';

export const getItems = async (): Promise<EntityItem[]> => {
  const { data } = await api.get('/books');
  return data;
};

export const getItemById = async (id: string): Promise<EntityItem> => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

export const createItem = async (item: Omit<EntityItem, 'id'>): Promise<EntityItem> => {
  const { data } = await api.post('/books', item);
  return data;
};

export const updateItem = async (id: string, item: Partial<EntityItem>): Promise<EntityItem> => {
  try {
    console.log('📤 PUT a /books/' + id, 'Payload:', JSON.stringify(item));
    const { data } = await api.patch(`/books/${id}`, item);
    console.log('✅ PUT exitoso:', data);
    return data;
  } catch (error: any) {
    console.log('❌ Error en PUT:', error.message);
    console.log('📋 Response:', error.response?.data);
    console.log('📋 Status:', error.response?.status);
    throw error;
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  try {
    console.log('📤 DELETE a /books/' + id);
    await api.delete(`/books/${id}`);
    console.log('✅ DELETE exitoso');
  } catch (error: any) {
    console.log('❌ Error en DELETE:', error.message);
    console.log('📋 Response:', error.response?.data);
    console.log('📋 Status:', error.response?.status);
    throw error;
  }
};
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create store with initial state
const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

// Load saved favorites and update store
const loadSavedFavorites = async () => {
  try {
    const savedFavorites = await AsyncStorage.getItem('favorites');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      store.dispatch({
        type: 'favorites/setState',
        payload: favorites,
      });
    }
  } catch (error) {
    console.error('Error loading saved favorites:', error);
  }
};

// Initialize favorites when store is created
loadSavedFavorites();

export default store;

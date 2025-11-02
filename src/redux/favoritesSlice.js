import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Load initial state from AsyncStorage
const loadInitialState = async () => {
  try {
    const savedFavorites = await AsyncStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : { favoriterecipes: [] };
  } catch (error) {
    console.error('Error loading favorites:', error);
    return { favoriterecipes: [] };
  }
};

const initialState = {
  favoriterecipes: [], // Will be populated from AsyncStorage
};

// Initialize state from AsyncStorage
loadInitialState().then(state => {
  initialState.favoriterecipes = state.favoriterecipes;
});

// Helper function to save favorites to AsyncStorage
const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify({ favoriterecipes: favorites }));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setState: (state, action) => {
      return action.payload;
    },
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      // Find the position (index) of the recipe within the favorites array
      const existingIndex = state.favoriterecipes.findIndex(
        (item) => item.idFood === recipe.idFood
      );
      if (existingIndex >= 0) {
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        state.favoriterecipes.push(recipe);
      }
      // Save updated favorites to AsyncStorage
      saveFavorites(state.favoriterecipes);
    },
  },
});

export const { toggleFavorite, setState } = favoritesSlice.actions;
export default favoritesSlice.reducer;

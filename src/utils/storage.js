const STORAGE_KEY = 'dashboard_state';

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

export const loadState = () => {
  try {
    const state = localStorage.getItem(STORAGE_KEY);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Error loading state:', error);
    return null;
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing state:', error);
  }
};

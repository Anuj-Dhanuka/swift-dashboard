// src/utils/localStorageUtils.js

const STORAGE_KEY = 'dashboardState';

export const getDashboardState = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const setDashboardState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

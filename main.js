// src/main.js
import { fetchDataFromApi } from '../api/apiService';

const main = async () => {
  try {
    const apiData = await fetchDataFromApi();
    console.log(apiData);
    
  } catch (error) {
    console.error('Main error:', error);
  }
};

main();

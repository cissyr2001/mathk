// src/config/api.ts

// Use import.meta.env.VITE_API_URL to access the environment variable
// Provide a fallback URL for development if the .env file isn't present
export const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// You can add other global configuration variables here
// export const ITEMS_PER_PAGE: number = 10;
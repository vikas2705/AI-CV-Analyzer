export const ENV_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
} as const;

export const getApiUrl = (endpoint: string): string => {
  return `${ENV_CONFIG.API_BASE_URL}${endpoint}`;
};

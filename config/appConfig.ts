// Configuración de la aplicación
export const config = {
  // API Configuration
  openWeatherMap: {
    apiKey: 'bc4c6a5a121f03dbdacebc9394a2b2d7', // Reemplazar con tu API key
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    defaultUnits: 'metric', // metric, imperial, standard
    defaultLanguage: 'es', // es, en, fr, de, etc.
  },
  
  // App Configuration
  app: {
    name: 'AppClima',
    version: '1.0.0',
    defaultCity: '', // Ciudad por defecto (opcional)
  },
  
  // UI Configuration
  ui: {
    theme: {
      primary: '#1E3A8A',
      secondary: '#10B981',
      danger: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
    },
    animations: {
      enabled: true,
      duration: 300,
    },
  },
  
  // Feature Flags
  features: {
    extendedWeatherInfo: true,
    weatherIcons: true,
    sunriseSunset: true,
    errorReporting: true,
  },
};

export default config;

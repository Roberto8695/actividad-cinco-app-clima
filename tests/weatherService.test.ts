// Archivo de prueba para verificar la integración con la API
import { WeatherService } from '../services/weatherService';

export const testWeatherService = async () => {
  console.log('🧪 Iniciando pruebas del servicio de clima...');

  // Prueba 1: Ciudad válida
  try {
    console.log('📍 Probando ciudad válida: Madrid');
    const madridWeather = await WeatherService.getWeatherByCity('Madrid');
    console.log('✅ Madrid - Éxito:', {
      ciudad: madridWeather.name,
      temperatura: WeatherService.formatTemperature(madridWeather.main.temp),
      descripcion: madridWeather.weather[0].description,
    });
  } catch (error) {
    console.error('❌ Error al obtener clima de Madrid:', error);
  }

  // Prueba 2: Ciudad inválida
  try {
    console.log('📍 Probando ciudad inválida: CiudadQueNoExiste123');
    await WeatherService.getWeatherByCity('CiudadQueNoExiste123');
    console.log('❌ No debería llegar aquí - se esperaba un error');
  } catch (error) {
    console.log('✅ Error manejado correctamente para ciudad inválida:', error instanceof Error ? error.message : error);
  }

  // Prueba 3: String vacío
  try {
    console.log('📍 Probando string vacío');
    await WeatherService.getWeatherByCity('');
    console.log('❌ No debería llegar aquí - se esperaba un error');
  } catch (error) {
    console.log('✅ Error manejado correctamente para string vacío:', error instanceof Error ? error.message : error);
  }

  // Prueba 4: Múltiples ciudades
  const ciudades = ['Buenos Aires', 'Mexico City', 'Lima', 'Bogota'];
  console.log('📍 Probando múltiples ciudades latinoamericanas...');
  
  for (const ciudad of ciudades) {
    try {
      const weather = await WeatherService.getWeatherByCity(ciudad);
      console.log(`✅ ${ciudad}: ${WeatherService.formatTemperature(weather.main.temp)} - ${weather.weather[0].description}`);
    } catch (error) {
      console.error(`❌ Error en ${ciudad}:`, error instanceof Error ? error.message : error);
    }
  }

  console.log('🏁 Pruebas completadas');
};

// Función para probar formateo de datos
export const testFormatting = () => {
  console.log('🧪 Probando funciones de formateo...');
  
  // Pruebas de formateo
  console.log('🌡️ Temperatura:', WeatherService.formatTemperature(23.5)); // "24°C"
  console.log('💨 Viento:', WeatherService.formatWindSpeed(3.2)); // "3.2 m/s"
  console.log('👁️ Visibilidad:', WeatherService.formatVisibility(10000)); // "10.0 km"
  
  // Pruebas de emojis
  const weatherTypes = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'mist'];
  weatherTypes.forEach(type => {
    console.log(`${type}: ${WeatherService.getWeatherEmoji(type)}`);
  });
};

// Función para ejecutar todas las pruebas
export const runAllTests = async () => {
  console.log('🚀 Ejecutando todas las pruebas...\n');
  
  testFormatting();
  console.log('\n');
  await testWeatherService();
  
  console.log('\n✨ Todas las pruebas completadas');
};

// Para usar en desarrollo, descomenta la siguiente línea:
// runAllTests();

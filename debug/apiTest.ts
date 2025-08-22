// Herramienta de diagnóstico para probar la API key
import config from '../config/appConfig';

export const testApiKey = async () => {
  const apiKey = config.openWeatherMap.apiKey;
  console.log('🔍 Probando API Key:', apiKey.substring(0, 8) + '...');

  // Prueba 1: Petición básica a una ciudad conocida
  const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric&lang=es`;
  
  try {
    console.log('📡 Haciendo petición a:', testUrl.replace(apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(testUrl);
    const data = await response.json();
    
    console.log('📊 Respuesta HTTP Status:', response.status);
    console.log('📝 Respuesta completa:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ API Key funciona correctamente!');
      console.log(`🌡️ Temperatura en Madrid: ${data.main.temp}°C`);
      return true;
    } else {
      console.log('❌ Error en la API:');
      console.log('Código:', data.cod);
      console.log('Mensaje:', data.message);
      
      // Diagnóstico específico por código de error
      switch (response.status) {
        case 401:
          console.log('🔐 API Key inválida o no activada. Posibles soluciones:');
          console.log('   - Verifica que la API key sea correcta');
          console.log('   - Espera hasta 2 horas para la activación');
          console.log('   - Genera una nueva API key en OpenWeatherMap');
          break;
        case 404:
          console.log('🗺️ Ciudad no encontrada');
          break;
        case 429:
          console.log('⏰ Demasiadas peticiones, espera un momento');
          break;
        default:
          console.log('🚨 Error desconocido');
      }
      return false;
    }
  } catch (error) {
    console.error('💥 Error de red:', error);
    return false;
  }
};

// Función para verificar el formato de la API key
export const validateApiKeyFormat = (apiKey: string) => {
  console.log('🔧 Validando formato de API key...');
  
  // Las API keys de OpenWeatherMap tienen 32 caracteres hexadecimales
  const isValidFormat = /^[a-f0-9]{32}$/i.test(apiKey);
  
  console.log('Longitud:', apiKey.length, '(debe ser 32)');
  console.log('Formato hexadecimal:', isValidFormat ? '✅' : '❌');
  console.log('API Key:', apiKey.substring(0, 8) + '...' + apiKey.substring(24));
  
  if (!isValidFormat) {
    console.log('⚠️ El formato de la API key no es el esperado');
    console.log('   - Debe tener exactamente 32 caracteres');
    console.log('   - Solo debe contener números (0-9) y letras (a-f)');
  }
  
  return isValidFormat;
};

// Función principal de diagnóstico
export const runDiagnostic = async () => {
  console.log('🚀 Iniciando diagnóstico de API...\n');
  
  const apiKey = config.openWeatherMap.apiKey;
  
  // Paso 1: Validar formato
  console.log('📋 PASO 1: Validando formato de API key');
  const formatValid = validateApiKeyFormat(apiKey);
  console.log('');
  
  // Paso 2: Probar conexión
  console.log('📋 PASO 2: Probando conexión con la API');
  const connectionValid = await testApiKey();
  console.log('');
  
  // Resumen
  console.log('📋 RESUMEN DEL DIAGNÓSTICO:');
  console.log('Formato de API key:', formatValid ? '✅' : '❌');
  console.log('Conexión con API:', connectionValid ? '✅' : '❌');
  
  if (formatValid && connectionValid) {
    console.log('🎉 Todo funciona correctamente!');
  } else {
    console.log('🔧 Se requiere acción para solucionar los problemas');
  }
  
  return formatValid && connectionValid;
};

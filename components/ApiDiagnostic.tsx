import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import config from '../config/appConfig';

export const ApiDiagnostic: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const runApiTest = async () => {
    setIsLoading(true);
    setTestResult('Probando API key...\n');
    
    const apiKey = config.openWeatherMap.apiKey;
    
    // Validar formato
    const isValidFormat = /^[a-f0-9]{32}$/i.test(apiKey);
    let result = `🔧 VALIDACIÓN DE FORMATO:\n`;
    result += `Longitud: ${apiKey.length} (debe ser 32)\n`;
    result += `Formato hexadecimal: ${isValidFormat ? '✅' : '❌'}\n`;
    result += `API Key: ${apiKey.substring(0, 8)}...${apiKey.substring(24)}\n\n`;
    
    setTestResult(result);
    
    // Probar conexión
    const testUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric&lang=es`;
    
    try {
      result += `📡 PROBANDO CONEXIÓN:\n`;
      result += `URL: ${testUrl.replace(apiKey, 'API_KEY_HIDDEN')}\n\n`;
      setTestResult(result);
      
      const response = await fetch(testUrl);
      const data = await response.json();
      
      result += `📊 RESPUESTA:\n`;
      result += `Status HTTP: ${response.status}\n`;
      
      if (response.ok) {
        result += `✅ ¡API Key funciona correctamente!\n`;
        result += `🌡️ Temperatura en Madrid: ${data.main.temp}°C\n`;
        result += `🌤️ Clima: ${data.weather[0].description}\n`;
        
        Alert.alert('¡Éxito!', 'Tu API key funciona correctamente. Ya puedes usar la aplicación normalmente.');
      } else {
        result += `❌ Error en la API:\n`;
        result += `Código: ${data.cod}\n`;
        result += `Mensaje: ${data.message}\n\n`;
        
        switch (response.status) {
          case 401:
            result += `🔐 SOLUCIÓN PARA ERROR 401:\n`;
            result += `- Verifica que la API key sea correcta\n`;
            result += `- Las nuevas keys tardan hasta 2 horas en activarse\n`;
            result += `- Genera una nueva key si es necesario\n`;
            break;
          case 404:
            result += `🗺️ Ciudad no encontrada (esto no debería pasar con Madrid)\n`;
            break;
          case 429:
            result += `⏰ Demasiadas peticiones, espera un momento\n`;
            break;
        }
        
        Alert.alert('Error de API', `Código ${response.status}: ${data.message}`);
      }
    } catch (error) {
      result += `💥 ERROR DE RED:\n`;
      result += `${error}\n`;
      result += `\nVerifica tu conexión a internet\n`;
      
      Alert.alert('Error de conexión', 'Verifica tu conexión a internet');
    }
    
    setTestResult(result);
    setIsLoading(false);
  };

  const openApiKeyInstructions = () => {
    Alert.alert(
      '🔑 Cómo obtener una API Key',
      '1. Ve a openweathermap.org\n2. Crea una cuenta gratuita\n3. Ve a "API keys" en tu perfil\n4. Copia tu API key\n5. Pégala en config/appConfig.ts\n\n⏰ Las nuevas keys tardan hasta 2 horas en activarse',
      [{ text: 'Entendido' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Diagnóstico de API</Text>
      <Text style={styles.subtitle}>Prueba tu API key de OpenWeatherMap</Text>
      
      <TouchableOpacity 
        style={[styles.button, styles.testButton]} 
        onPress={runApiTest}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? '🔄 Probando...' : '🧪 Probar API Key'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.helpButton]} 
        onPress={openApiKeyInstructions}
      >
        <Text style={styles.buttonText}>❓ ¿Cómo obtener API Key?</Text>
      </TouchableOpacity>
      
      {testResult ? (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.resultText}>{testResult}</Text>
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  testButton: {
    backgroundColor: '#3B82F6',
  },
  helpButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  resultText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#1F2937',
    lineHeight: 18,
  },
});

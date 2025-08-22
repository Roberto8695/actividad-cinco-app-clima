import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { WeatherData, WeatherService } from './services/weatherService';
import { WeatherCard } from './components/WeatherCard';
import { ApiDiagnostic } from './components/ApiDiagnostic';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre de una ciudad');
      return;
    }

    setLoading(true);
    try {
      const data = await WeatherService.getWeatherByCity(city);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      
      // Mostrar error más específico
      let errorMessage = 'Error desconocido al obtener los datos del clima';
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Si es error de autenticación, sugerir usar el diagnóstico
        if (error.message.includes('autenticación')) {
          Alert.alert(
            'Error de API Key',
            'Hay un problema con tu API key. ¿Quieres usar la herramienta de diagnóstico para verificarla?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Diagnóstico', onPress: () => setShowDiagnostic(true) }
            ]
          );
          setLoading(false);
          return;
        }
      }
      
      Alert.alert('Error', errorMessage);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setWeatherData(null);
    setCity('');
  };

  // Si estamos mostrando el diagnóstico, mostrar esa pantalla
  if (showDiagnostic) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.diagnosticHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowDiagnostic(false)}
          >
            <Text style={styles.backButtonText}>← Volver a la App</Text>
          </TouchableOpacity>
        </View>
        <ApiDiagnostic />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🌤️ Visor de Clima</Text>
          <Text style={styles.subtitle}>Consulta el clima de cualquier ciudad</Text>
          
          {/* Botón de diagnóstico */}
          <TouchableOpacity 
            style={styles.diagnosticButton}
            onPress={() => setShowDiagnostic(true)}
          >
            <Text style={styles.diagnosticButtonText}>🔧 Diagnóstico API</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el nombre de la ciudad"
            placeholderTextColor="#A0A0A0"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeatherData}
            returnKeyType="search"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.searchButton]} 
              onPress={fetchWeatherData}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonText}>🔍 Buscar</Text>
              )}
            </TouchableOpacity>
            
            {weatherData && (
              <TouchableOpacity 
                style={[styles.button, styles.clearButton]} 
                onPress={clearData}
              >
                <Text style={styles.buttonText}>🗑️ Limpiar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {weatherData && (
          <WeatherCard weatherData={weatherData} />
        )}

        {!weatherData && !loading && (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderEmoji}>🌍</Text>
            <Text style={styles.placeholderText}>
              Ingresa el nombre de una ciudad para conocer su clima actual
            </Text>
            <Text style={styles.placeholderSubtext}>
              Si tienes problemas, usa el botón "Diagnóstico API" arriba
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
  keyboardView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 16,
  },
  diagnosticButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  diagnosticButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  diagnosticHeader: {
    padding: 20,
    paddingBottom: 0,
  },
  backButton: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    backgroundColor: '#10B981',
  },
  clearButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  placeholderEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherData, WeatherService } from '../services/weatherService';

interface WeatherCardProps {
  weatherData: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      {/* Header con ciudad y emoji */}
      <View style={styles.header}>
        <View style={styles.cityInfo}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.country}>{weatherData.sys.country}</Text>
        </View>
        <Text style={styles.weatherEmoji}>
          {WeatherService.getWeatherEmoji(weatherData.weather[0].main)}
        </Text>
      </View>

      {/* Temperatura principal */}
      <View style={styles.temperatureSection}>
        <Text style={styles.temperature}>
          {WeatherService.formatTemperature(weatherData.main.temp)}
        </Text>
        <Text style={styles.feelsLike}>
          Sensación térmica: {WeatherService.formatTemperature(weatherData.main.feels_like)}
        </Text>
        <Text style={styles.description}>
          {weatherData.weather[0].description}
        </Text>
      </View>

      {/* Detalles del clima */}
      <View style={styles.detailsSection}>
        <View style={styles.detailsRow}>
          <DetailItem 
            icon="💧" 
            label="Humedad" 
            value={`${weatherData.main.humidity}%`} 
          />
          <DetailItem 
            icon="💨" 
            label="Viento" 
            value={WeatherService.formatWindSpeed(weatherData.wind.speed)} 
          />
        </View>
        
        <View style={styles.detailsRow}>
          <DetailItem 
            icon="🌡️" 
            label="Presión" 
            value={`${weatherData.main.pressure} hPa`} 
          />
          <DetailItem 
            icon="👁️" 
            label="Visibilidad" 
            value={WeatherService.formatVisibility(weatherData.visibility)} 
          />
        </View>

        <View style={styles.detailsRow}>
          <DetailItem 
            icon="🌅" 
            label="Amanecer" 
            value={formatTime(weatherData.sys.sunrise)} 
          />
          <DetailItem 
            icon="🌇" 
            label="Atardecer" 
            value={formatTime(weatherData.sys.sunset)} 
          />
        </View>
      </View>
    </View>
  );
};

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailIcon}>{icon}</Text>
    <View style={styles.detailText}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  weatherEmoji: {
    fontSize: 56,
  },
  temperatureSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  temperature: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  feelsLike: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#374151',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  detailsSection: {
    gap: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  detailIcon: {
    fontSize: 20,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});

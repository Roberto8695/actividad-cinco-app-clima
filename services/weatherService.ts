// Servicio para manejar las peticiones a la API del clima
import config from '../config/appConfig';
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface WeatherError {
  cod: string;
  message: string;
}

export class WeatherService {
  private static readonly API_KEY = config.openWeatherMap.apiKey;
  private static readonly BASE_URL = `${config.openWeatherMap.baseUrl}/weather`;

  static async getWeatherByCity(cityName: string): Promise<WeatherData> {
    if (!cityName.trim()) {
      throw new Error('El nombre de la ciudad es requerido');
    }

    try {
      const response = await fetch(
        `${this.BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${this.API_KEY}&units=${config.openWeatherMap.defaultUnits}&lang=${config.openWeatherMap.defaultLanguage}`
      );

      const data = await response.json();

      if (!response.ok) {
        const error = data as WeatherError;
        switch (response.status) {
          case 404:
            throw new Error('Ciudad no encontrada. Verifica el nombre e intenta nuevamente.');
          case 401:
            throw new Error('Error de autenticación con la API del clima.');
          case 429:
            throw new Error('Demasiadas peticiones. Intenta nuevamente en unos minutos.');
          case 500:
            throw new Error('Error del servidor. Intenta nuevamente más tarde.');
          default:
            throw new Error(error.message || 'Error desconocido al obtener los datos del clima');
        }
      }

      return data as WeatherData;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      }
      throw error;
    }
  }

  static getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  static formatTemperature(temp: number): string {
    return `${Math.round(temp)}°C`;
  }

  static formatWindSpeed(speed: number): string {
    return `${speed} m/s`;
  }

  static formatVisibility(visibility: number): string {
    return `${(visibility / 1000).toFixed(1)} km`;
  }

  static getWeatherEmoji(weatherMain: string): string {
    const emojiMap: { [key: string]: string } = {
      'clear': '☀️',
      'clouds': '☁️',
      'rain': '🌧️',
      'drizzle': '🌦️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️',
      'fog': '🌫️',
      'haze': '🌫️',
      'dust': '💨',
      'sand': '💨',
      'ash': '🌋',
      'squall': '💨',
      'tornado': '🌪️'
    };

    return emojiMap[weatherMain.toLowerCase()] || '🌤️';
  }
}

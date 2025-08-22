# 🔑 Cómo Obtener tu API Key de OpenWeatherMap

Para que la aplicación funcione correctamente, necesitas tu propia API key de OpenWeatherMap. Aquí te explico cómo obtenerla paso a paso:

## 📝 Pasos para Obtener la API Key

### 1. Crear una Cuenta
1. Ve a [OpenWeatherMap](https://openweathermap.org/)
2. Haz clic en "Sign Up" en la esquina superior derecha
3. Completa el formulario de registro:
   - Username (nombre de usuario)
   - Email
   - Password
   - Confirma que no eres un robot
4. Acepta los términos y condiciones
5. Haz clic en "Create Account"

### 2. Verificar tu Email
1. Ve a tu bandeja de entrada del email que registraste
2. Busca un email de OpenWeatherMap con el asunto "Please confirm your email"
3. Haz clic en el enlace de confirmación en el email

### 3. Iniciar Sesión
1. Regresa a [OpenWeatherMap](https://openweathermap.org/)
2. Haz clic en "Sign In"
3. Ingresa tu email y contraseña
4. Haz clic en "Sign In"

### 4. Acceder a las API Keys
1. Una vez que hayas iniciado sesión, ve a tu perfil haciendo clic en tu nombre de usuario
2. En el menú, selecciona "My API keys" o ve directamente a: https://home.openweathermap.org/api_keys
3. Verás una API key por defecto que ya ha sido generada para ti

### 5. Copiar tu API Key
1. En la página "API keys", verás una clave similar a: `bd5e378503939ddaee76f12ad7a97608`
2. Copia esta clave (usa el botón de copiar o selecciona y copia manualmente)

### 6. Configurar en la Aplicación
1. Abre el archivo `config/appConfig.ts` en tu proyecto
2. Encuentra la línea que dice:
   ```typescript
   apiKey: 'bd5e378503939ddaee76f12ad7a97608', // Reemplazar con tu API key
   ```
3. Reemplaza la clave de ejemplo con tu clave real:
   ```typescript
   apiKey: 'TU_API_KEY_AQUI',
   ```
4. Guarda el archivo

## ⚠️ Notas Importantes

### Tiempo de Activación
- **Las nuevas API keys pueden tomar hasta 2 horas en activarse**
- Si recibes un error 401 (Unauthorized), espera un poco y vuelve a intentar

### Límites del Plan Gratuito
- **1,000 llamadas por día**
- **60 llamadas por minuto**
- Datos actualizados cada 10 minutos
- Acceso a datos meteorológicos actuales

### Seguridad
- ❌ **NO compartas tu API key públicamente**
- ❌ **NO la subas a repositorios públicos de Git**
- ✅ Manténla en archivos de configuración locales
- ✅ En producción, usa variables de entorno

## 🔍 Verificar que Funciona

Una vez que hayas configurado tu API key, puedes probar que funciona:

1. Ejecuta la aplicación: `npm start`
2. Ingresa el nombre de una ciudad conocida (ej: "Madrid")
3. Si ves los datos del clima, ¡funciona correctamente!

## 🚨 Solución de Problemas

### Error 401 - Unauthorized
- **Causa**: API key inválida o no activada
- **Solución**: Verifica que la key sea correcta y espera hasta 2 horas para la activación

### Error 429 - Too Many Requests
- **Causa**: Has excedido el límite de peticiones
- **Solución**: Espera un minuto o considera actualizar tu plan

### Error 404 - Not Found
- **Causa**: Ciudad no encontrada
- **Solución**: Verifica la ortografía o prueba con nombres en inglés

## 🔗 Enlaces Útiles

- [Documentación de la API](https://openweathermap.org/api)
- [Gestión de API Keys](https://home.openweathermap.org/api_keys)
- [Precios y Planes](https://openweathermap.org/price)
- [Soporte](https://home.openweathermap.org/questions)

## 💡 Consejos Adicionales

1. **Guarda tu API key en un lugar seguro** - podrás reutilizarla en otros proyectos
2. **Considera crear múltiples keys** - para diferentes proyectos
3. **Monitorea tu uso** - en el dashboard puedes ver cuántas llamadas has hecho
4. **Lee la documentación** - para aprovechar al máximo la API

---

¡Una vez que tengas tu API key configurada, tu aplicación de clima estará lista para usar! 🌤️

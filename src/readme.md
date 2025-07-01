**Aplicación Móvil para Registro de Asistencia**

Esta aplicación fue desarrollada utilizando Ionic y Angular con el objetivo de permitir a los usuarios registrar su asistencia laboral (entrada y salida) de forma segura, precisa y confiable. El sistema emplea:

-Geolocalización en tiempo real

-Captura fotográfica obligatoria

-Autenticación mediante Firebase

-Almacenamiento estructurado en Firestore

**Tecnologías empleadas**

- Ionic Framework — desarrollo de interfaces móviles híbridas.

- Angular — arquitectura robusta basada en componentes.

- Capacitor — integración nativa con dispositivos móviles.

- Firebase Authentication — sistema de autenticación de usuarios.

- Firestore Database — base de datos en la nube en tiempo real.

- Capacitor Plugins — cámara, geolocalización, etc.

**Funcionalidades principales**

-Registro y autenticación de usuarios utilizando Firebase.

-Registro de asistencia con fotografía obligatoria y verificación de ubicación GPS.

-Restricción de registros a una zona geográfica delimitada previamente.

-Visualización de historial de asistencias por usuario (entradas/salidas).

-Cierre de sesión y navegación protegida.

**Validaciones implementadas**

-Verificación de ubicación dentro del área permitida para aceptar la asistencia.

-Captura de imagen obligatoria al momento del registro.

-Fecha y hora asignadas automáticamente al evento.

-Mensajes de error en caso de fallas en GPS o permisos de cámara, impidiendo registros incompletos.

**Estado actual del proyecto**

-Completamente funcional.

-Probado en navegador y dispositivos Android físicos.

-Implementación de validaciones y manejo de errores.

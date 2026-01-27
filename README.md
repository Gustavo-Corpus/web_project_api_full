# Tripleten web_project_api_full

## Descripción del Proyecto

Around The U.S. es una aplicación web interactiva que permite a los usuarios compartir fotografías de lugares alrededor de Estados Unidos. Los usuarios pueden crear una cuenta, subir imágenes, dar "me gusta" a las fotos de otros usuarios y gestionar su perfil personal.

## Funcionalidades

- ✅ **Registro y autenticación de usuarios** con JWT
- ✅ **Gestión de perfil**: Editar nombre, descripción y foto de perfil
- ✅ **Gestión de tarjetas**: Agregar y eliminar tarjetas con imágenes
- ✅ **Sistema de likes**: Dar y quitar "me gusta" a las tarjetas
- ✅ **Visualización de imágenes**: Ver imágenes en tamaño completo
- ✅ **Protección de rutas**: Solo usuarios autenticados pueden acceder
- ✅ **Validación de datos**: Validación en frontend y backend

## Tecnologías y Técnicas Utilizadas

### Frontend
- **React** - Biblioteca de JavaScript para construir interfaces de usuario
- **React Router** - Navegación entre páginas
- **Context API** - Gestión de estado global
- **CSS3** - Estilos y diseño responsive
- **Fetch API** - Comunicación con el backend

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas
- **Winston** - Logging de solicitudes y errores
- **express-validator** - Validación de datos

### Seguridad
- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración de 7 días
- Validación de datos en todas las rutas
- Manejo centralizado de errores
- CORS configurado

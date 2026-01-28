# Tripleten web_project_api_full
  
## 🌐 Enlace al Proyecto  
  
**Frontend:** http://aroundtheus.ignorelist.com  
**Backend API:** http://api.aroundtheus.ignorelist.com 
  
## 📖 Descripción del Proyecto  
  
Around The U.S. es una aplicación web interactiva que permite a los usuarios compartir fotografías de lugares alrededor de Estados Unidos. Los usuarios pueden crear una cuenta, subir imágenes, dar "me gusta" a las fotos de otros usuarios y gestionar su perfil personal.  
  
Este proyecto es la culminación del bootcamp de Desarrollo Web de TripleTen, integrando frontend y backend en una aplicación full-stack completa.  
  
## ✨ Funcionalidades  
  
- ✅ **Registro y autenticación de usuarios** con JWT  
- ✅ **Gestión de perfil**: Editar nombre, descripción y foto de perfil  
- ✅ **Gestión de tarjetas**: Agregar y eliminar tarjetas con imágenes  
- ✅ **Sistema de likes**: Dar y quitar "me gusta" a las tarjetas  
- ✅ **Visualización de imágenes**: Ver imágenes en tamaño completo  
- ✅ **Protección de rutas**: Solo usuarios autenticados pueden acceder  
- ✅ **Validación de datos**: Validación completa en frontend y backend  
- ✅ **Logging**: Registro de solicitudes y errores  
- ✅ **Manejo de errores centralizado**  
  
## 🛠️ Tecnologías y Técnicas Utilizadas  
  
### Frontend  
- **React** - Biblioteca de JavaScript para construir interfaces de usuario  
- **React Router** - Navegación entre páginas  
- **Context API** - Gestión de estado global del usuario  
- **CSS3** - Estilos y diseño responsive con metodología BEM  
- **Fetch API** - Comunicación con el backend  
  
### Backend  
- **Node.js** - Entorno de ejecución de JavaScript  
- **Express** - Framework web para Node.js  
- **MongoDB** - Base de datos NoSQL  
- **Mongoose** - ODM para MongoDB  
- **JWT (jsonwebtoken)** - Autenticación basada en tokens  
- **bcryptjs** - Encriptación de contraseñas  
- **Celebrate + Joi** - Validación de datos de entrada  
- **Winston** - Logging de solicitudes y errores  
- **Validator** - Validación de URLs y emails  
- **dotenv** - Gestión de variables de entorno  
- **CORS** - Configuración de políticas de origen cruzado  
  
### Seguridad  
- 🔐 Contraseñas hasheadas con bcrypt (salt rounds: 10)  
- 🔑 Tokens JWT con expiración de 7 días  
- ✅ Validación de datos en todas las rutas  
- 🛡️ Manejo centralizado de errores  
- 🌐 CORS configurado para orígenes permitidos  
- 🚫 Campo `password` excluido de respuestas por defecto  
  
### DevOps  
- **PM2** - Gestor de procesos para Node.js  
- **nginx** - Servidor web y proxy inverso  
- **Google Cloud** - Hosting del servidor  
- **Let's Encrypt** - Certificados SSL gratuitos  

👨‍💻 Autor

Gustavo Corpus
Estudiante de Desarrollo Web - TripleTen Bootcamp
📄 Licencia

Este proyecto fue creado como parte del programa educativo de TripleTen.
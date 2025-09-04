# RBU - Sistema de Gestión de Desarrolladores y Proyectos

Aplicación web para la gestión de desarrolladores y proyectos, construida con React , TypeScript y Vite.

## Características Implementadas

- CRUD completo de desarrolladores (crear, listar, editar, eliminar)
- CRUD completo de proyectos (crear, listar, editar, eliminar)
- Sistema de filtros para desarrolladores y proyectos
- Formularios con validación usando React Hook Form + Zod
- Diseño responsivo con ShadCN/UI y TailwindCSS
- Notificaciones con Sonner Toast

## Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- npm

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ByronDein/RBU
   ```

2. **Navegar al directorio del proyecto**
   ```bash
   cd RBU
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Configurar variables de entorno**
   Crear archivo `.env` en la raíz:
   ```
   VITE_API_URL=ejemplo-url.cl
   VITE_BEARER_TOKEN=tu-token
   ```

5. **Ejecutar aplicación**
   ```bash
   npm run dev
   ```

6. **Abrir navegador**
   ```
   http://localhost:5173
   ```

### Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── components/          # Componentes de la interfaz
│   ├── ui/             # Componentes base (botones, inputs, etc)
│   ├── developers/     # Componentes de desarrolladores
│   ├── projects/       # Componentes de proyectos
│   └── layouts/        # Layout principal
├── hooks/              # Custom hooks para lógica de negocio
├── services/           # Servicios para comunicación con API
├── types/              # Definiciones de tipos TypeScript
└── pages/              # Páginas de la aplicación
```

### Descripción de Capas

#### **Components**
- **UI**: Componentes reutilizables basados en ShadCN/UI
- **Developers**: Formularios, listas y cards de desarrolladores
- **Projects**: Formularios, listas y cards de proyectos
- **Layouts**: Layout principal con sidebar

#### **Hooks**
- `use-developers.ts`: Manejo de estado y operaciones CRUD de desarrolladores
- `use-project.ts`: Manejo de estado y operaciones CRUD de proyectos  
- `use-mobile.ts`: Detección de dispositivos móviles

#### **Services**
- `api.service.ts`: Cliente HTTP base con configuración de Axios
- `developer.service.ts`: Endpoints específicos de desarrolladores
- `project.service.ts`: Endpoints específicos de proyectos

#### **Types**
- `developer.types.ts`: Interfaces y tipos de desarrolladores
- `project.types.ts`: Interfaces y tipos de proyectos
- `api.types.ts`: Tipos para respuestas de API

### Stack Tecnológico Utilizado

- **React ** - Framework frontend
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **ShadCN/UI** - Sistema de componentes
- **TailwindCSS** - Framework CSS
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP
- **React Router** - Enrutamiento
- **Sonner** - Notificaciones toast

### Flujo de la Aplicación

```
Usuario → Componente → Hook → Servicio → API
           ↓
   Notificación ← Estado ← Respuesta
```

## Funcionalidades por Módulo

### Desarrolladores
- **Lista**: Visualización con filtros por tecnología y años de experiencia
- **Crear**: Formulario con validación (nombre, tecnologías, años experiencia)
- **Editar**: Modificación de datos existentes
- **Eliminar**: Eliminación con confirmación
- **Detalle**: Vista completa de información del desarrollador
- **Asignar Proyectos**: Modal para asignar Proyectos a los  Desarrolladroes

### Proyectos
- **Lista**: Visualización con filtros por estado y tecnología
- **Crear**: Formulario con validación (nombre, descripción, tecnologías, estado)
- **Editar**: Modificación de datos existentes
- **Eliminar**: Eliminación con confirmación
- **Detalle**: Vista completa de información del proyecto



# Frontend - Cuidado Seguro

## Descripción

El frontend de **Cuidado Seguro** corresponde a la interfaz web principal del sistema, desarrollada utilizando React y Vite.

La aplicación permite la interacción entre usuarios y los distintos microservicios backend del sistema, proporcionando funcionalidades orientadas a la gestión clínica, monitoreo de pacientes y comunicación entre tutores y profesionales de la salud.

El frontend fue diseñado bajo una arquitectura modular basada en componentes reutilizables y navegación dinámica mediante React Router.

---

# Tecnologías Utilizadas

## Framework y Librerías

* **React 18**
* **Vite**
* **React Router DOM**
* **React Bootstrap**
* **Bootstrap 5**
* **React Bootstrap Icons**

## Desarrollo

* **JavaScript (ES6+)**
* **JSX**
* **CSS3**
* **ESLint**

## Arquitectura

* **Arquitectura basada en componentes**
* **Single Page Application (SPA)**
* **Frontend desacoplado**

---

# Funcionalidad del Frontend

La aplicación frontend permite:

* Registro de usuarios
* Inicio de sesión
* Gestión de pacientes
* Visualización de información clínica
* Comunicación entre tutor y centro médico
* Navegación dinámica por roles
* Integración con microservicios backend

---

# Arquitectura del Proyecto

El frontend se encuentra organizado mediante una arquitectura modular basada en componentes reutilizables.

## Componentes principales

### Pages

Contiene las vistas principales del sistema.

### Components

Contiene componentes reutilizables de interfaz.

### Styles

Gestiona los estilos CSS del sistema.

### Data

Contiene datos simulados y estructuras auxiliares.

---

# Estructura del Proyecto

```bash
cuidado-seguro-react
│
├── src
│   ├── components
│   ├── pages
│   ├── styles
│   ├── data
│   ├── App.jsx
│   └── main.jsx
│
├── public
│
├── package.json
│
├── vite.config.js
│
└── index.html
```

---

# Dependencias Principales

| Dependencia           | Descripción                   |
| --------------------- | ----------------------------- |
| React                 | Librería principal frontend   |
| Vite                  | Entorno de desarrollo y build |
| React Router DOM      | Navegación SPA                |
| React Bootstrap       | Componentes visuales          |
| Bootstrap 5           | Framework CSS                 |
| React Bootstrap Icons | Iconografía                   |
| ESLint                | Calidad de código             |

---

# Configuración del Proyecto

## Instalación de dependencias

```bash
npm install
```

---

# Ejecución del Proyecto

## Ejecutar entorno desarrollo

```bash
npm run dev
```

## Compilar proyecto producción

```bash
npm run build
```

## Vista previa producción

```bash
npm run preview
```

---

# Configuración Vite

El proyecto utiliza Vite como herramienta de desarrollo frontend.

## Beneficios

* Hot Reload
* Compilación rápida
* Optimización de build
* Mejor rendimiento de desarrollo

---

# Navegación y Rutas

La aplicación utiliza React Router DOM para gestionar navegación dinámica.

## Funcionalidades

* Navegación SPA
* Protección de rutas
* Navegación por roles
* Redirecciones dinámicas

---

# Integración con Backend

El frontend se comunica con:

* API Gateway
* Backend For Frontend (BFF)
* Microservicio de Autenticación
* Microservicio de Pacientes
* Microservicio de Datos Médicos

---

# Componentes Implementados

## Login

Permite autenticación de usuarios.

## Registro

Permite registrar distintos tipos de usuarios.

## Dashboard Tutor

Visualización de información clínica del paciente.

## Dashboard Profesional

Gestión clínica y seguimiento médico.

## Dashboard Profesional Externo

Acceso clínico para profesionales externos.

---

# Diseño de Interfaz

La interfaz utiliza Bootstrap y React Bootstrap para construir un diseño:

* Responsive
* Modular
* Escalable
* Adaptable a distintos dispositivos

---

# Configuración Docker

```yaml
services:
  frontend-cuidado-seguro:
    build: .
    container_name: frontend-cuidado-seguro
    ports:
      - "5173:5173"
```

---

# Requisitos Previos

Antes de ejecutar el proyecto se requiere:

* Node.js
* npm
* Puerto 5173 disponible
* Backend del sistema ejecutándose

---

# Puertos Utilizados

| Puerto | Descripción           |
| ------ | --------------------- |
| 5173   | Frontend React + Vite |
| 8080   | API Gateway           |
| 8090   | Backend For Frontend  |

---

# Testing y Validación

Las pruebas del frontend pueden realizarse mediante:

* Navegador web
* Integración backend
* Testing manual de componentes

---

# Scripts Disponibles

| Script          | Descripción                   |
| --------------- | ----------------------------- |
| npm run dev     | Ejecuta entorno desarrollo    |
| npm run build   | Compila aplicación producción |
| npm run preview | Vista previa build producción |
| npm run lint    | Verificación ESLint           |

---

# Arquitectura Implementada

## Single Page Application (SPA)

La aplicación funciona como SPA mediante React Router.

## Arquitectura Basada en Componentes

Permite reutilización y modularidad.

## Frontend Desacoplado

Separación completa entre frontend y backend.

## Integración con Microservicios

Comunicación mediante API Gateway y BFF.

---

# Autor

Proyecto desarrollado para la asignatura de Fullstack III.

Desarrollado por: Karina Pimentel.

---

# Conclusión

El frontend de Cuidado Seguro implementa una solución moderna basada en React y Vite.

El sistema permite:

* Gestionar usuarios y pacientes
* Visualizar información clínica
* Integrarse con arquitectura de microservicios
* Implementar navegación dinámica por roles
* Construir una interfaz escalable y modular

Todo esto permite desarrollar una plataforma moderna, desacoplada y preparada para aplicaciones web escalables.

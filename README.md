# 🏨 Sistema de Gestión Hotelera

Este es el repositorio central del Sistema de Gestión Hotelera, compuesto por un backend en **Spring Boot (Java)** y un frontend en **Angular**. 

El proyecto utiliza una arquitectura de monolito modular para gestionar las operaciones, trazabilidad, perfiles y facturación de múltiples sedes hoteleras.

---

## 🛠️ Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu entorno local antes de comenzar:

* **Java JDK 17** (o superior)
* **Node.js** (v18 LTS o superior)
* **Angular CLI** (`npm install -g @angular/cli`)
* **MySQL** (o el motor de base de datos que estemos usando)
* Tu IDE favorito (IntelliJ IDEA, Eclipse, VS Code)

---

## 🗄️ 1. Configuración de la Base de Datos

Antes de levantar el backend, necesitas preparar la base de datos:

1. Abre tu gestor de base de datos (Ej. MySQL Workbench, DBeaver, phpMyAdmin).
2. Crea una nueva base de datos vacía. Por ejemplo:
   ```sql
   CREATE DATABASE db_hotel;
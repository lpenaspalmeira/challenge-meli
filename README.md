# Prototipo: Comparador de Productos - MVP Asistente de Compras

Este repositorio contiene el código fuente, la documentación técnica y el plan estratégico para el prototipo de un Asistente de Compras con GenAI.

**Para una visión completa del proyecto, se recomienda leer primero el Plan Estratégico:**
-   **[📄 Ver Plan Estratégico del Proyecto (PDF)](./Plan-De-Trabajo-ProyectoGenAI.pdf)**

---
## Tabla de Contenidos
1. [Requisitos Previos](#1-requisitos-previos)
2. [Configuración del Backend](#2-configuración-del-backend)
3. [Acceso a la Aplicación Frontend](#3-acceso-a-la-aplicación-frontend)
4. [Notas Importantes](#4-notas-importantes)

---

### 1. Requisitos Previos

Para ejecutar este proyecto, es necesario tener el siguiente software instalado:

- **Python 3.6+**
- **pip** (Gestor de paquetes de Python)
- Un **Navegador Web** moderno (ej. Google Chrome, Mozilla Firefox).

### 2. Configuración del Backend

El backend es un servidor API construido con Flask que provee los datos de los productos.

**Paso 1: Navegar al Directorio del Proyecto**
Abra una terminal o línea de comandos y sitúese en la carpeta raíz de este proyecto.

**Paso 2: Crear un Entorno Virtual**
Se recomienda el uso de un entorno virtual para aislar las dependencias del proyecto.

```bash
python -m venv venv
```

**Paso 3: Activar el Entorno Virtual**
Una vez activado, el prompt de su terminal cambiará para mostrar el prefijo (venv).

En macOS o Linux:

```Bash
source venv/bin/activate
```

En Windows:

```Bash
venv\Scripts\activate
```
**Paso 4: Instalar Dependencias**
Este comando leerá el archivo requirements.txt e instalará las versiones exactas de las librerías necesarias.

```Bash
python -m pip install -r requirements.txt
```

**Paso 5: Iniciar el Servidor API**
Finalmente, inicie el servidor Flask.

```Bash
python api.py
```

El servidor se ejecutará y estará escuchando peticiones en http://127.0.0.1:5000.

### 3. Acceso a la Aplicación Frontend

El frontend es la interfaz de usuario con la que se interactúa en el navegador.

Verifique que el servidor del backend esté en ejecución. (Debe mantener abierta la terminal del paso anterior).

Navegue a la carpeta del proyecto en su explorador de archivos.

Abra el archivo index.html con su navegador web.

La aplicación cargará los datos desde la API y estará lista para usar.

### 4. Notas Importantes

**Mantener el Servidor Activo:** La terminal donde se ejecuta el backend (python api.py) debe permanecer abierta durante el uso de la aplicación.

**Error "Puerto en uso":** Si al iniciar la API recibe un error indicando que el puerto 5000 ya está en uso, puede cambiarlo fácilmente. Abra el archivo api.py y modifique la última línea, cambiando port=5000 por otro número (ej. port=5001).

```Python
# api.py - última línea
app.run(debug=True, port=5001)
``` 
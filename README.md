# 📁 Estructura del Portafolio — Mauricio Varela

```
portfolio/
├── index.html              ← Página principal (Inicio)
├── academico.html          ← Sección académica
├── proyectos.html          ← Sección de proyectos
├── contacto.html           ← Información de contacto
├── css/
│   └── styles.css          ← Todos los estilos
├── js/
│   └── script.js           ← JavaScript (animaciones, audio, etc.)
└── assets/
    ├── images/
    │   ├── foto.jpg        ← Tu foto de perfil (colócala aquí)
    │   └── projects/
    │       ├── erp-novatek.jpg
    │       ├── doomt.jpg
    │       └── strng.jpg
    └── audio/
        └── presentacion.mp3  ← Tu audio de presentación
```

---

## 🚀 Cómo subir a GitHub Pages (paso a paso)

### 1. Crea el repositorio en GitHub
1. Ve a https://github.com y haz login.
2. Haz clic en **"New repository"** (botón verde).
3. Nómbralo así EXACTAMENTE: `tu-usuario.github.io`
   - Ejemplo: si tu usuario es `MauricioVar`, el nombre sería `MauricioVar.github.io`
4. Márcalo como **Public**.
5. NO actives "Add a README file" (ya tienes uno).
6. Haz clic en **"Create repository"**.

### 2. Sube los archivos
Tienes dos opciones:

#### Opción A — Desde la web (más fácil)
1. En tu repositorio recién creado, haz clic en **"uploading an existing file"**.
2. Arrastra TODA la carpeta `portfolio/` (o selecciona todos los archivos).
3. Escribe un mensaje de commit, ej: `"Primer commit - portafolio completo"`.
4. Clic en **"Commit changes"**.

> ⚠️ GitHub no sube carpetas vacías. Asegúrate de que las carpetas `assets/images/projects/` y `assets/audio/` tengan al menos un archivo (como los LEEME.txt) para que GitHub las suba.

#### Opción B — Con Git en la terminal
```bash
cd portfolio
git init
git add .
git commit -m "Primer commit - portafolio completo"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-usuario.github.io.git
git push -u origin main
```

### 3. Activa GitHub Pages
1. En tu repositorio, ve a **Settings** (pestaña superior).
2. En el menú izquierdo, busca **Pages**.
3. En "Source", selecciona **Deploy from a branch**.
4. En "Branch", selecciona **main** y carpeta **/ (root)**.
5. Haz clic en **Save**.
6. Espera 1-2 minutos y tu página estará en:
   👉 `https://tu-usuario.github.io`

---

## 📝 Antes de subir — checklist

- [ ] Coloqué mi foto en `assets/images/foto.jpg`
- [ ] Coloqué las imágenes de proyectos en `assets/images/projects/`
- [ ] Grabé y coloqué mi audio en `assets/audio/presentacion.mp3`
- [ ] Actualicé el enlace de GitHub en `contacto.html` (busca `href="https://github.com/"`)
- [ ] Revisé que todo se vea bien abriendo `index.html` en el navegador

---

## ⚠️ Cosas importantes para que GitHub Pages funcione bien

1. **Rutas relativas**: Todos los enlaces ya usan rutas relativas (`css/styles.css`, `assets/images/foto.jpg`), lo que significa que funcionarán perfectamente en GitHub Pages sin cambiar nada.

2. **El archivo principal DEBE llamarse `index.html`**: Ya está así.

3. **Sensibilidad a mayúsculas**: En GitHub Pages (Linux), los nombres de archivos distinguen mayúsculas. Si tu foto se llama `Foto.jpg` y el HTML dice `foto.jpg`, no funcionará. Usa siempre minúsculas.

4. **Audio**: GitHub Pages soporta archivos `.mp3` y `.ogg`. Si el audio no reproduce, verifica que el archivo esté en la ruta correcta.

---

¡Listo! Con esto tu portafolio estará en línea. 🎉

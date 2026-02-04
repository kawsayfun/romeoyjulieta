# Carta San Valentín - Proyecto Interactivo 3D

Una carta de amor interactiva con efectos 3D, animaciones suaves y diseño responsive.

## Stack Tecnológico

- **React** + **Vite**
- **TailwindCSS** - Estilos responsive
- **Framer Motion** - Animaciones y transiciones
- **Three.js** con:
  - `@react-three/fiber` (R3F)
  - `@react-three/drei` (OrbitControls, Float, Stars, etc.)
- **React Icons** - Iconos

## Estructura del Proyecto

```
src/
├── assets/
│   ├── cover.jpg (opcional)
│   └── photos/
│       ├── 1.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       ├── 4.jpg
│       └── 5.jpg
├── components/
│   ├── CoverLetter.jsx         - Portada inicial
│   ├── Heart3DSection.jsx      - Corazón 3D animado
│   ├── SurpriseCarousel3D.jsx  - Carrusel de fotos 3D
│   ├── SpaceJourney.jsx        - Sección con estrellas
│   ├── LoveLetterSection.jsx   - Carta de amor
│   ├── Footer.jsx              - Pie de página
│   └── HeartsBurst.jsx         - Efecto de corazones
├── data/
│   └── content.js              - Contenido personalizable
├── App.jsx                     - Componente principal
└── main.jsx                    - Punto de entrada
```

## Personalización

### 1. Editar el contenido

Modifica el archivo `src/data/content.js` para personalizar:
- Títulos y mensajes
- Párrafos de la carta de amor
- Tu firma
- Rutas de las fotos

### 2. Agregar fotos

Coloca tus fotos en la carpeta `src/assets/photos/` con los nombres:
- 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg

### 3. Desarrollar los componentes

Los componentes tienen estructura básica. Puedes desarrollarlos agregando:

**Heart3DSection.jsx**
- Crear geometría de corazón real (en lugar de esfera)
- Agregar animaciones de latido

**SurpriseCarousel3D.jsx**
- Cargar texturas de las fotos
- Implementar rotación circular 3D
- Agregar navegación entre fotos

**SpaceJourney.jsx**
- Personalizar el campo de estrellas
- Agregar planetas o elementos adicionales

**HeartsBurst.jsx**
- Ajustar cantidad y velocidad de corazones
- Cambiar colores y tamaños

## Próximos Pasos

1. **Personaliza el contenido** en `src/data/content.js`
2. **Agrega tus fotos** en `src/assets/photos/`
3. **Desarrolla los componentes 3D** según tus necesidades
4. **Ajusta colores y estilos** en los componentes
5. **Prueba en diferentes dispositivos** para asegurar responsividad

## Notas de Desarrollo

- Los componentes 3D usan `Canvas` de `@react-three/fiber`
- Las animaciones usan `motion` de `framer-motion`
- El diseño es completamente responsive con Tailwind
- Puedes agregar más secciones según necesites

## Comandos

Ya instalado y listo para usar. El servidor de desarrollo se inicia automáticamente.

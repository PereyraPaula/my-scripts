# File Categorizer

`File Categorizer` es un script que organiza un directorio especificado que se le pasa como argumento y agrupa los archivos en diferentes carpetas según su tipo de archivo.

## Idea detrás del script
Forma parte de un programa personal que cree porque las carpeas que más usaba, se desorganizaban muy facilmente, y era aburrido ponerse a ordenarlo manualmente. Por el lado técnico, quería probar Typescript y las caracteristicas nuevas de Node v22.0.0

## Tecnologías Usadas

Este proyecto utiliza las siguientes tecnologías - más detalle en el `package.json`:

- [**Node.js**](https://nodejs.org): Entorno de ejecución para JavaScript en el servidor.
- [**TypeScript**](https://www.typescriptlang.org): Lenguaje de programación que extiende JavaScript con tipado estático.
- **ts-node**: Herramienta para ejecutar directamente archivos TypeScript en Node.js.
- **fs-extra**: Biblioteca que extiende las funcionalidades del módulo `fs` de Node.js.
- [**chalk**](https://github.com/chalk/chalk): Biblioteca para estilizar la salida en la terminal.
- **@types**: Tipos TypeScript para las bibliotecas usadas.


## Instalación

1. Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/PereyraPaula/my-scripts.git
cd my-scripts/file-categorizer
```

2. Instala las dependencias utilizando `npm` (Yo la desarrollé usando pnpm):

```bash
npm install
```

## Uso

Para ejecutar el script en modo de desarrollo, usa el siguiente comando. Asegúrate de proporcionar la ruta del directorio que deseas ordenar como argumento:

```bash
npm run dev <ruta_del_directorio>
```

Por ejemplo, si quieres organizar los archivos en `C:\Users\test\Documents\files`, ejecuta:

```bash
npm run dev C:\Users\test\Documents\files
```

## Ejemplo

Supongamos que tienes el siguiente directorio:

```bash
C:\Users\test\Documents\files
├── image1.png
├── document1.pdf
├── song1.mp3
└── video1.mp4
```

Después de ejecutar el script, los archivos se organizarán en carpetas según su tipo:

```bash
C:\Users\test\Documents\files
├── Images
│   └── image1.png
├── Documents
│   └── document1.pdf
├── Music
│   └── song1.mp3
└── Videos
    └── video1.mp4
```

## Licencia

Este proyecto está licenciado bajo la licencia MIT.

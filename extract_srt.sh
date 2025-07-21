#!/bin/bash

# Para que funcione tiene que estar instalado en linux jq (herramienta para trabajar con archivos JSON) y mkvtoolnix

# Verificar si se pasó un archivo
if [ -z "$1" ]; then
  echo "Uso: $0 archivo.mkv"
  exit 1
fi

ARCHIVO="$1"

# Verificar existencia
if [ ! -f "$ARCHIVO" ]; then
  echo "El archivo '$ARCHIVO' no existe."
  exit 1
fi

# Verificar que jq está instalado
if ! command -v jq &> /dev/null; then
  echo "❌ El programa 'jq' no está instalado. Instalalo con:"
  echo "sudo apt install jq     # Debian/Ubuntu"
  echo "sudo dnf install jq     # Fedora"
  echo "brew install jq         # macOS"
  exit 1
fi

echo "🔍 Buscando pistas de subtítulos en: $ARCHIVO"
echo ""

# Listar solo pistas de subtítulos
mkvmerge -J "$ARCHIVO" | jq -r '
  .tracks[] 
  | select(.type == "subtitles") 
  | "[" + (.id|tostring) + "] Idioma: " + (.properties.language // "desconocido") + " | Codec: " + .codec
'

echo ""
read -p "👉 Ingresá el número de la pista de subtítulos a extraer: " NUMERO

# Intentar detectar extensión según codec
EXT=$(mkvmerge -J "$ARCHIVO" | jq -r "
  .tracks[] 
  | select(.type == \"subtitles\" and .id == $NUMERO) 
  | .codec
")

# Mapear codec a extensión de archivo
case "$EXT" in
  "SubRip/SRT") EXT="srt" ;;
  "ASS") EXT="ass" ;;
  "SSA") EXT="ssa" ;;
  *) EXT="sub" ;;
esac

NOMBRE_SALIDA="${ARCHIVO%.*}_subtitulo_pista${NUMERO}.${EXT}"

echo ""
echo "📤 Extrayendo pista $NUMERO a '$NOMBRE_SALIDA'..."
mkvextract tracks "$ARCHIVO" "$NUMERO":"$NOMBRE_SALIDA"

if [ $? -eq 0 ]; then
  echo "✅ Subtítulo extraído correctamente: $NOMBRE_SALIDA"
else
  echo "❌ Error al extraer la pista."
fi

// Propósito: Explorar todas las carpetas dentro del directorio raíz especificado y eliminar todos los node_modules encontrados, acumulando el conteo de eliminaciones.
// Min NODE version: v22.0.0

import { argv } from 'node:process';
import { styleText } from "node:util";
import { readdirSync, statSync, rmSync } from 'node:fs';
import path from 'node:path';

const args = argv;
const argPath = args[2]; 

function findFolderRecursively(directory, folderName) {
  let deleted = 0;
  const files = readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (!statSync(fullPath).isFile()) {
      if (file === folderName) {
        console.log(styleText("grey", "NODE_MODULES encontrado: "), fullPath);
        try {
          rmSync(fullPath, { recursive: true, force: true });
          console.log(styleText("green", "Message: "), "El directorio fue eliminado exitosamente");
          deleted += 1;
        } catch (e) {
          console.log(styleText("red", "Error: "), e.message);
        }
      } else {
        deleted += findFolderRecursively(fullPath, folderName);
      }
    }
  }
  return deleted;
}

const folderToFind = 'node_modules';

if (!argPath) {
  console.error("Por favor, proporciona un path como argumento.");
  process.exit(1);
}

const count = findFolderRecursively(argPath, folderToFind);
console.log("Total de node_modules borrados: ", count);

// RUN: node clean-no-modules.js PATH

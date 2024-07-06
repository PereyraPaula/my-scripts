import chalk from 'chalk';
import { listFileType as commonExtensions } from '../data/list_filetype'
import { readdirSync, mkdir } from 'fs';
import { PATH_DIRECTORY } from '../main';
import { move } from 'fs-extra';
import path from 'path';
import { InfoFile } from '../types/main';

export const log = console.log;
export const error = console.error;

export const showError = (message: string) => error(chalk.red(message))
export const showMessage = (message: string) => log(chalk.white(`${chalk.blue.bold('[INFO]')} - ${message}`))

export const isExistingFormat = (file: string) => {
  for (const typeFile of commonExtensions) {
    if (file.toLowerCase().endsWith(typeFile.extension)) {
      return { exist: true, category: typeFile.category };
    }
  }
  return { exist: true, category: null };
}

export const getFiles = (dir: string): { files: InfoFile[], length: number } => {
  const files: { file: string, ext: string }[] = []
  const fileList = readdirSync(dir)
  fileList.forEach(async (file) => {
    const ext = path.extname(file)
    const { exist, category = null } = isExistingFormat(file)
    const object: InfoFile = { file: file, ext }
    if (ext.length !== 0 && exist && category) {
      object.category = category
      files.push(object)
    }
  })
  return { files, length: files.length }
}

export const createFolder = (name: string) => {
  mkdir(`${PATH_DIRECTORY}/${name}`, (err) => {
    if (err && err.code === 'EEXIST') {
      showError(`La carpeta "${name}" ya está creada.`);
      return false
    } else if (err && err.code !== 'EEXIST') {
      showError(`Error al crear la carpeta: ${err}`);
      return false
    } else {
      showMessage(`"${name}" creada exitosamente.`);
      return true
    }
  });
}

export const moveFile = (folder: string, file: string) => {
  const initial = `${PATH_DIRECTORY}/${file}`
  const final = `${PATH_DIRECTORY}/${folder}/${file}`
  move(initial, final, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        showError(`El archivo de origen no existe: ${initial}`);
      } else if (err.code === 'EEXIST') {
        showError(`El archivo ya existe en el destino: ${final}`, );
      } else {
        showError(`Error al mover el archivo: ${err}`);
      }
    } else {
      showMessage(`Se movió exitosamente '${initial}' a '${final}'.`);
    }
  });
}

export function findFile(data: Partial<Record<string, InfoFile[]>>, criteria: { file: string }) {
  let result = null;

  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      const found = data[key].find(item => {
        return Object.keys(criteria).every(critKey => item[critKey] === criteria[critKey]);
      });

      if (found) {
        result = found;
      }
    }
  });

  return result;
}
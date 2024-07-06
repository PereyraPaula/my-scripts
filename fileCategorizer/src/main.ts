import process from 'process'
import { createFolder, findFile, getFiles, moveFile, showMessage } from './utils/utils';

export let PATH_DIRECTORY: string = process.argv.slice(2)[0] // Si se pone como argumento "." toma el directorio del script

const main = () => {
  if (PATH_DIRECTORY === '.') PATH_DIRECTORY = __dirname
  const { files, length } = getFiles(PATH_DIRECTORY)
  showMessage(`Directorio actual: ${PATH_DIRECTORY}`)
  showMessage(`Cantidad de archivos ${length}`)
  const groupByExt = Object.groupBy(files, ({ category }) => category);
  const folders = Object.keys(groupByExt)
  folders.forEach((folder) => {
    createFolder(folder)
  })
  files.forEach(({ file: fileName }) => {
    const {category} = findFile(groupByExt, { file: fileName })
    moveFile(String(category), fileName)
  })
}

main()


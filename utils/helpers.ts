import util from 'node:util'

export const custom = {
  log: (x: unknown) => {
    console.log(util.inspect(x, { depth: null }))
  },
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result) // includes the data URL prefix
      } else {
        reject(new Error('File could not be read as a base64 string'))
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

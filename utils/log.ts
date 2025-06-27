'use server'
import util from 'node:util'

export const custom = {
  log: (x: unknown) => {
    console.log(util.inspect(x, { depth: null }))
  },
}

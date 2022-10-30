import path from 'node:path'
import url from 'node:url'

import express from 'express'

function publicCompound() {
  // eslint-disable-next-line no-undef
  const pwd = process.cwd()
  const dirname = path.dirname(url.fileURLToPath(pwd))
  const publicFolderName = 'public'

  const staticDirectory = path.join(dirname, publicFolderName)

  return express.static(staticDirectory)
}

export default publicCompound

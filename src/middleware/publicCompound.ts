import path from 'node:path'
import url from 'node:url'

import express from 'express'

function publicCompound() {
  const pwd = import.meta.url
  const dirname = path.dirname(url.fileURLToPath(pwd))
  const publicFolderName = 'public'

  const staticDirectory = path.join(dirname, publicFolderName)

  return express.static(staticDirectory)
}

export default publicCompound

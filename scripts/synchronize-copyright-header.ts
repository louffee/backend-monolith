import { ensureUpdatedCopyrightHeader } from 'copyright-header'
import * as colors from 'colors'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const now = new Date()

const templateCopyright = `
/* 
 * Copyright (c) ${now.getFullYear()} Louffee. All rights reserved. 
 *
 * Synchronize on ${now.getDay()} ${months[now.getMonth() + 1]} ${now.getFullYear()}
 */
`

function synchronizeCopyrightHeader() {
  console.log(`${colors.red.bold('COPYRIGHT')} ${colors.white('Synchronizing the copyright header...')}`)
  console.log(
    `${colors.white('This change affects all files inside')} ${colors.yellow('src')} ${colors.white(
      'and',
    )} ${colors.yellow('prisma')} ${colors.white('folders.')}`,
  )

  const result = ensureUpdatedCopyrightHeader({
    include: ['src', 'prisma'],
    copyrightHolder: 'Darth Fader',
    exclude: ['node_modules', 'build'],
    fix: true,
    template: templateCopyright,
  })

  if (result.unFixedFiles.length === 0) {
    console.log(`${colors.green('COPYRIGHT')} ${colors.white('All files are up to date.')}`)
  } else {
    const files = result.unFixedFiles.map((file) => file).join(', ')
    console.log(
      `${colors.red('COPYRIGHT')} ${colors.white('The following files are not up to date:')} ${colors.yellow(files)}`,
    )
  }
}

synchronizeCopyrightHeader()

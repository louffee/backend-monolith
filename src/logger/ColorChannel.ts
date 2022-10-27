import colors from 'colors'

import Console from './Channel'

/* define console */
class ColorChannel implements Console {
  log(message: string, ...optionalParameters: string[]): void {
    // eslint-disable-next-line no-console, no-undef
    console.log(colors.blue.bold('LOG'), colors.reset(message), ...optionalParameters)
  }

  info(message: string, ...optionalParameters: string[]): void {
    // eslint-disable-next-line no-console, no-undef
    console.log(colors.blue.bold('INFO'), colors.reset(message), ...optionalParameters)
  }

  warn(message: string, ...optionalParameters: string[]): void {
    // eslint-disable-next-line no-console, no-undef
    console.log(colors.yellow.bold('WARN'), colors.reset(message), ...optionalParameters)
  }

  error(message: string, ...optionalParameters: string[]): void {
    // eslint-disable-next-line no-console, no-undef
    console.log(colors.red.bold('ERROR'), colors.reset(message), ...optionalParameters)
  }

  debug(message: string, ...optionalParameters: string[]): void {
    // eslint-disable-next-line no-console, no-undef
    console.log(colors.gray.bold('DEBUG'), colors.reset(message), ...optionalParameters)
  }
}

export default ColorChannel

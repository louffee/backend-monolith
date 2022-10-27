interface Channel {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  log(message?: any, ...optionalParameters: any[]): void
  info(message?: any, ...optionalParameters: any[]): void
  warn(message?: any, ...optionalParameters: any[]): void
  error(message?: any, ...optionalParameters: any[]): void
  debug(message?: any, ...optionalParameters: any[]): void
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export default Channel

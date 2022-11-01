class Environment {
  public readonly environment: 'development' | 'production' =
    process.env.NODE_ENV === 'production' ? 'production' : 'development'
  public readonly databaseURL: string = process.env.DATABASE_URL ?? ''
  public readonly port: number = process.env.PORT ? Number(process.env.PORT) : 8080

  public isDevelopment(): boolean {
    return this?.environment === 'development'
  }

  public isProduction(): boolean {
    return this?.environment === 'production'
  }
}

export default Environment

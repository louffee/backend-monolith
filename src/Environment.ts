class Environment {
  public readonly environment: 'development' | 'production'
  public readonly databaseURL: string
  public readonly port: number

  constructor() {
    this.environment = process.env.NODE_ENV === 'production' ? 'production' : 'development'
    this.databaseURL = process.env.DATABASE_URL ?? ''
    this.port = process.env.PORT ? Number(process.env.PORT) : 8080
  }

  public isDevelopment(): boolean {
    return this.environment === 'development'
  }

  public isProduction(): boolean {
    return this.environment === 'production'
  }
}

export default Environment

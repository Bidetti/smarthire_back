interface jwtConfig {
    secret: string,
    accessTokenLifetime: string,
    refreshTokenLifetime: string,
    algorithm: string,
    authHeaderTypes: string[]
}

const jwtConfig: jwtConfig = {
    secret: process.env.JWT_SECRET!,
    accessTokenLifetime: process.env.JWT_ACCESS_TOKEN_LIFETIME! || '60m',
    refreshTokenLifetime: process.env.JWT_REFRESH_TOKEN_LIFETIME! || '1d',
    algorithm: process.env.JWT_ALGORITHM! || 'HS256',
    authHeaderTypes: ['Bearer'],
}
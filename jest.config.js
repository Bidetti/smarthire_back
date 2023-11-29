module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/config/(.*)$': '<rootDir>/src/config/$1',
      '^@/controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@/middleware/(.*)$': '<rootDir>/src/middleware/$1',
      '^@/models/(.*)$': '<rootDir>/src/models/$1',
      '^@/routes/(.*)$': '<rootDir>/src/routes/$1',
    },
    testMatch: ['**/__tests__/**/*.test.ts'],
    coverageDirectory: 'docs',
  };
  
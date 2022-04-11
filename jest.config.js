module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/src/**/*.ts',
  ],
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
    },
  },
}

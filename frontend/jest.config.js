module.exports = {
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@type/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@hooks': '<rootDir>/src/hooks',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

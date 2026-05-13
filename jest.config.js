module.exports = {
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Recognize test file patterns
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  // Allow importing from src without relative paths
  moduleDirectories: ['node_modules', 'src'],
};

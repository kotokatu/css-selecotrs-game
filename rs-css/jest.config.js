/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: './src',
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    // setupFilesAfterEnv: ['<rootDir>/_tests_/jest-setup.ts'],
};

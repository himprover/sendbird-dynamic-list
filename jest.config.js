/** @type {import('ts-jest').JestConfigWithTsJest} */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['./setupTest.js'],
};
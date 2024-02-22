export default   {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    transform: { '\\.[jt]sx?$': 'babel-jest', },
    
    // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    },
}

//USAR EXPORT DEFAULT SI TIRA ERROR DE ES MODULE EN LUGHAR DE MODULE.EXPORTS
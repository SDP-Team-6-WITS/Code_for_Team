// jest.config.js
module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testEnvironment: 'node',        // Set the environment to Node.js for backend testing
  moduleFileExtensions: ['js', 'jsx'], // Recognize .js and .jsx extensions
  verbose: true,                  // Display individual test results
};

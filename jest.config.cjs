module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|scss|png|jpg|jpeg|gif|svg)$": "identity-obj-proxy",
  },
};

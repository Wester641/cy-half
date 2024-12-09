const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "qkd1xg",
  e2e: {
    baseUrl: "https://app.easyfleet.ai",
    setupNodeEvents(on, config) {
      video = false;
      // implement node event listeners here
    },
    defaultCommandTimeout: 15000,
    animationDistanceThreshold: 500,
    waitForAnimations: true,
    delayBetweenCommands: 2000,
    responseTimeout: 10000,
    pageLoadTimeout: 10000,
    requestTimeout: 10000,
  },
});

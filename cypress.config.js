const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  projectId: "qkd1xg",
  defaultCommandTimeout: 50000,
  requestTimeout: 50000,
  responseTimeout: 50000,
  pageLoadTimeout: 50000,
  e2e: {
    baseUrl: "https://app.easyfleet.ai",
    setupNodeEvents(on, config) {
      video = false;
    },
  },
});

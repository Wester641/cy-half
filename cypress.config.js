const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "qkd1xg",
  e2e: {
    baseUrl: "https://app.easyfleet.ai",
    setupNodeEvents(on, config) {
      video = false;
      // implement node event listeners here
    },
  },
});

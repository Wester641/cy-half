const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "easy_fleet_id",
  video: false,
  defaultCommandTimeout: 50000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: "https://app.easyfleet.ai",
  },
});

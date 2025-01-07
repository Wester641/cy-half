const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "easy_fleet_id",
  video: false,
  e2e: {
    baseUrl: "https://app.easyfleet.ai",
  },
});

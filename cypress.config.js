// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   projectId: "easy_fleet_id",
//   video: false,
//   defaultCommandTimeout: 50000,
//   viewportWidth: 1920,
//   viewportHeight: 1080,
//   e2e: {
//     baseUrl: "https://app.easyfleet.ai",
//   },
// });
// import cypress from "cypress";
// const { cypress } = require("cypress");
// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   defaultCommandTimeout: 50000,
//   viewportWidth: 1920,
//   viewportHeight: 1080,
//   reporter: "cypress-multi-reporters",
//   reporterOptions: {
//     reporterEnabled: "cypress-qase-reporter",
//     cypressQaseReporterReporterOptions: {
//       mode: "testops",
//       debug: true,
//       testops: {
//         api: {
//           token:
//             "5755502fc3b560881b1ebfa4c910df1b2cbd4dd5025e666ef62a45b251ca0892",
//         },
//         project: "DEMO",
//         uploadAttachments: true,
//         run: {
//           complete: true,
//         },
//       },
//       framework: {
//         cypress: {
//           screenshotsFolder: "cypress/screenshots",
//         },
//       },
//     },
//   },
//   video: false,
//   e2e: {
//     setupNodeEvents(on, config) {
//       require("cypress-qase-reporter/plugin")(on, config);
//       require("cypress-qase-reporter/metadata")(on);
//     },
//     baseUrl: "https://app.easyfleet.ai",
//   },
// });
const cypress = require("cypress");
const qasePlugin = require("cypress-qase-reporter/plugin");
const qaseMetadata = require("cypress-qase-reporter/metadata");

module.exports = {
  defaultCommandTimeout: 50000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-qase-reporter",
    cypressQaseReporterReporterOptions: {
      mode: "testops",
      debug: true,
      testops: {
        api: {
          token:
            "d51535ad39b98d6ec01333d9670b3244826cc68690539ce0c0630c1057297ed6",
        },
        project: "EF",
        uploadAttachments: true,
        run: {
          complete: true,
        },
      },
      framework: {
        cypress: {
          screenshotsFolder: "cypress/screenshots",
        },
      },
    },
  },
  video: false,
  e2e: {
    baseUrl: "https://app.easyfleet.ai",

    setupNodeEvents(on, config) {
      qasePlugin(on, config);
      qaseMetadata(on);
    },
  },
};

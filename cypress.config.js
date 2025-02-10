module.exports = {
  projectId: "your-project-id",  // Укажи свой проект ID, если необходимо
  video: false,
  e2e: {
    baseUrl: "https://app.easyfleet.ai",
    setupNodeEvents(on, config) {
      // Здесь не будет необходимости подключать Qase плагин
    },
  },
};

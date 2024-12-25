Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("ResizeObserver loop completed")) {
    return false;
  }
});

describe("Test login EasyFleet", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("https://app.easyfleet.ai/");
  });

  // qase(
  //   11,
  it("Visits a login page EasyFleet and sign in", () => {
    cy.visit("https://app.easyfleet.ai/login");
    cy.loginWith(email, password);
    cy.url().should("include", "/units");
  });
  // );
});

// if you want to play this test-case run this command in the terminal
// QASE_MODE=testops npx cypress run --spec "cypress/e2e/test/qase1.cy.js",

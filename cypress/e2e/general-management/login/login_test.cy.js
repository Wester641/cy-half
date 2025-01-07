describe("Login and Redirect Test To Units Page", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1200);
  });

  it("should login and verify title on production page", () => {
    cy.intercept("POST", "/api/v1/accounts/login/").as("loginRequest");
    cy.loginWith(email, password);
    cy.wait("@loginRequest", { timeout: 10000 }).then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
    cy.url({ timeout: 10000 }).should("include", "/units");
  });
});

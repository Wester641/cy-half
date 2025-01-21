import { URLs } from "../../constants/links";

describe("Login and Redirect Test To Units Page", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit(URLs.login);
  });

  it("should login and verify title on production page", () => {
    cy.intercept("POST", URLs.api.login).as("loginRequest");
    cy.loginWith(email, password);
    cy.wait("@loginRequest").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
    cy.url().should("include", URLs.units);
  });
});

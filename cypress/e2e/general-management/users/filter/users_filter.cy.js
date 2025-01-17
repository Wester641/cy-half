import { Selectors } from "./Selectors";
import { URLs } from "../../../../constants/links";

describe("Test filters in users page", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should test filters", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.intercept("GET", URLs.api.contactsReq).as("contactsRequest");
    cy.visit(URLs.users);
    cy.url().should("include", URLs.users);

    cy.wait("@contactsRequest").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      cy.log(response.body);

      cy.get(Selectors.totalAmount)
        .should(Selectors.includeText, response.body.count)
        .invoke("css", "box-shadow", "0 0 0 2px red")
        .wait(500)
        .invoke("css", "box-shadow", "none");
    });

    for (let i = 0; i < 5; i++) {
      cy.get(Selectors.userRoleFilter).eq(0).click();
      cy.get(Selectors.userRoleItem).eq(i).click();
      cy.contains(Selectors.button, "Apply").click();
      cy.wait(1000);
    }

    cy.get(Selectors.userRoleFilter).eq(0).click();
    cy.get(".css-vubbuv").eq(1).click();

    for (let j = 0; j < 3; j++) {
      cy.get(Selectors.userRoleFilter).eq(1).click();
      cy.get(Selectors.userRoleItem).eq(j).click();
      cy.contains(Selectors.button, "Apply").click();
      cy.wait(1000);
    }
    cy.get(Selectors.userRoleFilter).eq(0).click();
    cy.get(".css-vubbuv").eq(1).click();

    for (let k = 0; k < 5; k++) {
      cy.get(Selectors.subLinks).eq(k).click();
      cy.wait(1000);
    }
  });
});

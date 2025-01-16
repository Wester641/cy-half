import { URLs } from "../../../../constants/links";
import { Selectors } from "./Selectors";

describe("Test create user", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should create user", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.wait(1500);

    cy.intercept("GET", URLs.api.contactsReq).as("Contacts");

    cy.visit(URLs.users);

    cy.wait("@Contacts").then((contacts) => {
      expect(contacts.response.statusCode).to.eq(200);
      const contactsData = contacts.response.body;
      cy.log(contactsData);

      cy.get(Selectors.totalAmount)
        .should(Selectors.includeText, contactsData.count)
        .wait(500);
    });

    cy.intercept("POST", URLs.api.createUser).as("CreateUser");

    cy.get(Selectors.addUser).click();
    cy.get(Selectors.input)
      .eq(0)
      .clear()
      .eq(0)
      .type(`User${Math.floor(Math.random() * 1000)}`);

    cy.get(Selectors.input)
      .eq(3)
      .type(`example${Math.floor(Math.random() * 1000)}@example.com`);
    cy.get(Selectors.groupOption).eq(1).click();
    cy.get(Selectors.selectGroupOption)
      .eq(Math.floor(Math.random() * 3))
      .click();
    cy.get(Selectors.submitButton).click();
    cy.wait("@CreateUser").then((interception) => {
      expect([200, 201, 204]).to.include(interception.response.statusCode);
    });
    cy.wait("@Contacts").then((contacts) => {
      expect(contacts.response.statusCode).to.eq(200);
      const contactsData = contacts.response.body;
      cy.log(contactsData);

      cy.get(Selectors.totalAmount)
        .should(Selectors.includeText, contactsData.count)
        .wait(500);
      cy.get(Selectors.userDataItem)
        .eq(1)
        .should(Selectors.includeText, contactsData.results[0].first_name);
      cy.get(Selectors.userDataItem)
        .eq(2)
        .should(Selectors.includeText, contactsData.results[0].email);
      cy.get(Selectors.userDataItem)
        .eq(3)
        .should(Selectors.includeText, contactsData.results[0].status);
      cy.get(Selectors.userDataItem)
        .eq(4)
        .should(
          Selectors.includeText,
          contactsData.results[0].role?.name || "---"
        );
      cy.get(Selectors.userDataItem)
        .eq(5)
        .should(
          Selectors.includeText,
          contactsData.results[0].group?.name || "---"
        );
      cy.get(Selectors.userDataItem)
        .eq(6)
        .should(
          Selectors.includeText,
          contactsData.results[0].assigned_vehicles?.name || "---"
        );
    });
  });
});

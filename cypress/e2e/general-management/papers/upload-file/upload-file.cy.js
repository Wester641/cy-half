import "cypress-file-upload";
/// <reference types="cypress" />

import { URLs } from "../../../../constants/links";
import { Selectors } from "./selectors";

describe("Test upload files", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should upload file", () => {
    cy.loginWith(email, password);
    cy.url().should("include", URLs.units);
    cy.visit(URLs.papers);
    cy.wait(3000);

    cy.get(Selectors.uploadButton).eq(0).click();

    const imagePath = "example-pictures/sample-2.jpg";
    const documentPath = "example-pictures/sample3.pdf";

    cy.get(Selectors.images).attachFile(imagePath).trigger("change");
    cy.get(Selectors.documents).attachFile(documentPath).trigger("change");

    cy.get(Selectors.saveButton).click().log("uploaded");
  });
});

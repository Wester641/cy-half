import "cypress-file-upload";
/// <reference types="cypress" />

describe("Test upload files", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
  });

  it("should upload file", () => {
    cy.loginWith(email, password);
    cy.url().should("include", `/units`);
    cy.visit("/papers");
    cy.wait(5000);

    cy.get(".css-1yxmbwk").eq(0).click();

    const imagePath = "example-pictures/sample-2.jpg";
    const documentPath = "example-pictures/sample3.pdf";

    cy.get('[for="images"]').attachFile(imagePath).trigger("change");
    cy.get('[for="documents"]').attachFile(documentPath).trigger("change");

    cy.get(".css-1hw9j7s").click().log("uploaded");
  });

  afterEach(() => {
    cy.visit("/papers");
  });

  it("should edit name uploaded files", () => {
    cy.loginWith(email, password);
    cy.url().should("include", `/units`);
    cy.visit("/papers");
    cy.wait(5000);

    cy.get(".css-1liixou")
      .eq(Math.floor(Math.random() * 8))
      .click();

    cy.get(".DetailInfo_detail__header__title__WwjYB")
      .invoke("text")
      .as("titleAlias");

    cy.get(".css-mrqjss").eq(2).click();

    cy.get("@titleAlias").then((title) => {
      cy.get(".css-mnn31")
        .eq(0)
        .type(`${Math.floor(Math.random() * 1000)}EditedByCypress_` + title);

      cy.log(title);
    });
    cy.get(".css-1hw9j7s").click().log("edited");
    cy.wait(5000);
  });

  it("should remove edited files", () => {
    cy.loginWith(email, password);
    cy.url().should("include", `/units`);
    cy.visit("/papers");
    cy.wait(5000);

    cy.get(".css-1liixou")
      .eq(Math.floor(Math.random() * 8))
      .click();

    cy.get(".PaperDetail_cursor_pointer__XdOA7").eq(0).click();
    cy.get(".css-1hw9j7s").eq(1).click().log("deleted");
    cy.wait(5000);
  });

  it("should download files", () => {
    cy.loginWith(email, password);
    cy.url().should("include", `/units`);
    cy.visit("/papers");
    cy.wait(5000);

    cy.get(".css-1liixou")
      .eq(Math.floor(Math.random() * 8))
      .click();

    cy.get(".css-mrqjss").eq(1).click().log("downloaded");
    cy.wait(5000);
  });
});

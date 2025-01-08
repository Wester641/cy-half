describe("Test create Inspection-form ", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });
  const loginAndRedirect = () => {
    cy.loginWith(email, password);
    cy.url().should("include", "/units");
    cy.visit("/inspections/forms");
  };

  it("should edit inspection-form", () => {
    loginAndRedirect();
    cy.wait(3000);
    cy.contains("Example form").then((element) => {
      cy.wait(3000);
      cy.get(".css-q34dxg").eq(0).click();
    });
    cy.wait(3000);
    cy.get(".css-mrqjss").eq(0).click().log("Edit");
    cy.wait(3000);

    cy.get(".css-mnn31").eq(0).type(`Date of form #1 EDT`).log("First field");

    cy.get(".css-mnn31").eq(1).clear().type(`Date short description #1 EDT`);

    cy.get(".css-mnn31").eq(2).clear().type(`Dropdown title #2 EDT`);
    cy.get(".css-mnn31")
      .eq(3)
      .clear()
      .type(`Short description of dropdown #2 EDT`);
    cy.get(".css-mnn31").eq(4).clear().type(`Chosen summary dropdown #2 EDT`);

    cy.get(".css-mnn31").eq(5).clear().type(`Free text title #3 EDT`);
    cy.get(".css-mnn31")
      .eq(6)
      .clear()
      .type(`Free text short description #3 EDT`);

    cy.get(".css-mnn31").eq(7).clear().type(`Meter history title #4 EDT`);
    cy.get(".css-mnn31")
      .eq(8)
      .clear()
      .type(`Meter history short description #4 EDT`);

    cy.get(".css-mnn31").eq(9).clear().type(`Number title #4 EDT`);
    cy.get(".css-mnn31").eq(10).clear().type(`Number short description #4 EDT`);
    cy.get(".css-mnn31").eq(11).clear().type(`12`);
    cy.get(".css-mnn31").eq(12).clear().type(`15`);

    cy.get(".css-mnn31").eq(13).clear().type(`Pass-Fail title #4 EDT`);
    cy.get(".css-mnn31")
      .eq(14)
      .clear()
      .type(`Pass-Fail short description #4 EDT`);
    cy.get(".css-mnn31").eq(15).clear().type(`Fail`);
    cy.get(".css-mnn31").eq(16).clear().type(`Pass`);

    cy.get(".css-mnn31").eq(17).clear().type(`Photo title #4 EDT`);
    cy.get(".css-mnn31").eq(18).clear().type(`Photo short description #4 EDT`);

    cy.get(".css-mnn31").eq(19).clear().type(`Photo summary title #4 EDT`);
    cy.get(".css-mnn31")
      .eq(20)
      .clear()
      .type(`Photo summary short description #4 EDT`);
    cy.get(".css-mnn31").eq(21).clear().type(`Section title #4 EDT`);

    cy.get(".css-1hw9j7s").click();
  });

  // DELETE THE FORMS
  // it("should delete created form", () => {
  //   loginAndRedirect();
  //   cy.wait(3000);

  //   // repeating 5 times
  //   Cypress._.times(3, () => {
  //     cy.contains("Example form").then((record) => {
  //       if (record) {
  //         cy.get(".css-1yxmbwk").eq(1).click();
  //         cy.contains("Delete").click();
  //         cy.get(".css-1hw9j7s").eq(2).click();
  //       }
  //     });
  //     cy.wait(1000);
  //   });
  // });
});

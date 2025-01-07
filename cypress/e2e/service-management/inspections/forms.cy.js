describe("Test create Inspection-form ", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  const timeout = { timeout: 50000 };

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1900, 1280);
  });
  const loginAndRedirect = () => {
    cy.loginWith(email, password);
    cy.url(timeout).should("include", "/units");
    cy.visit("/inspections/forms");
  };

  it("should create inspection-form", () => {
    loginAndRedirect();
    cy.wait(3000);
    cy.get(".css-1yxmbwk").eq(0).click();
    cy.get(".css-mnn31")
      .eq(0)
      .type(`Example form #${Math.floor(Math.random() * 100)}`);
    cy.get(".css-10oer18")
      .eq(0)
      .type(
        `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`
      );
    cy.get(".Styles_color__head__6fA04").eq(0).click();

    cy.get(".css-1m9pwf3").eq(0).check({ force: true });
    cy.get(".css-1m9pwf3").eq(1).check({ force: true });

    cy.get(".Styles_color__modal__item__AH0Zu")
      .eq(Math.floor(Math.random() * 6))
      .click();

    cy.wait(3000);
    cy.get(".css-1hw9j7s").eq(0).click().log("Continue");
    cy.wait(3000);

    // Filling the form
    cy.get(".Styles_items__item__7CSaH").eq(0).click().log("Date-item");
    cy.get(".css-mnn31").eq(0).type(`Date of form #1`);
    cy.get(".css-mnn31").eq(1).type(`Date short description #1`);
    cy.get(".Styles_items__item__7CSaH").eq(1).click();
    cy.get(".css-mnn31").eq(2).type(`Dropdown title #2`).log("Dropdown-item");
    cy.get(".css-mnn31").eq(3).type(`Short description of dropdown #2`);
    cy.get(".css-mnn31").eq(4).type(`Chosen summary dropdown #2`);
    cy.get(".Styles_items__item__7CSaH").eq(2).click().log("Free-text-item");
    cy.get(".css-mnn31").eq(5).type(`Free text title #3`);
    cy.get(".css-mnn31").eq(6).type(`Free text short description #3`);
    cy.get(".Styles_items__item__7CSaH")
      .eq(3)
      .click()
      .log("Meter-history-item");
    cy.get(".css-mnn31").eq(7).type(`Meter history title #4`);
    cy.get(".css-mnn31").eq(8).type(`Meter history short description #4`);

    cy.get(".Styles_items__item__7CSaH").eq(4).click().log("Number-item");
    cy.get(".css-mnn31").eq(9).type(`Number title #5`);
    cy.get(".css-mnn31").eq(10).type(`Number short description #5`);
    cy.get(".css-mnn31").eq(11).type(`5`);
    cy.get(".css-mnn31").eq(12).type(`20`);

    cy.get(".Styles_items__item__7CSaH").eq(5).click().log("Pass-Fail-item");
    cy.get(".css-mnn31").eq(13).type(`Pass-Fail title #5`);
    cy.get(".css-mnn31").eq(14).type(`Pass-Fail short description #5`);
    cy.get(".css-mnn31").eq(15).type(`Pass`);
    cy.get(".css-mnn31").eq(16).type(`Fail`);

    cy.get(".Styles_items__item__7CSaH").eq(6).click().log("Photo-item");

    cy.get(".css-mnn31").eq(17).type(`Photo title #6`);
    cy.get(".css-mnn31").eq(18).type(`Photo short description #6`);

    cy.get(".Styles_items__item__7CSaH")
      .eq(7)
      .click()
      .log("Photo-summary-item");

    cy.get(".css-mnn31").eq(19).type(`Photo summary title #7`);
    cy.get(".css-mnn31").eq(20).type(`Photo summary short description #7`);

    cy.get(".Styles_items__item__7CSaH").eq(8).click().log("Section-item");

    cy.get(".css-mnn31").eq(21).type(`Section title #8`);

    cy.get(".css-1hw9j7s").click();
    cy.wait(3000);
  });

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

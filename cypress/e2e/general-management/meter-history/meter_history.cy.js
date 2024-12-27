describe("Test Meter History's create funtion", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  const timeout = { timeout: 50000 };

  const loginAndRedirect = () => {
    cy.loginWith(email, password);
    cy.url(timeout).should("include", "/units");
    cy.visit("/meter-history");
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("should visit to meter-history page, and create manually meter history and check a void checkbox", () => {
    loginAndRedirect();

    cy.get(".css-1yxmbwk").should("be.visible").click();
    cy.get(".css-19bb58m").should("be.visible").click();
    cy.wait(5000);
    cy.get(".css-p7gue6-option", timeout)
      .eq(Math.floor(Math.random() * 4))
      .click();
    cy.get(".css-mnn31")
      .eq(0)
      .should("be.visible")
      .type(`300${Math.floor(Math.random() * 1000)}`);
    cy.get(".css-1m9pwf3").check();
    cy.get(".css-1hw9j7s").click();
  });
});

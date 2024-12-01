describe("Login and Redirect Test To Units Page", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1600, 1200);
  });

  it("should login and verify title on production page", () => {
    cy.loginWith(email, password);
    cy.url({ timeout: 10000 }).should("include", "/units?page=1");
  });
});

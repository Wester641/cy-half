describe("Login and Redirect Test To Units Page", () => {
  const email = "zafarzhon77@gmail.com";
  const password = "zafarzhon77";

  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1700, 1080);
  });

  it("should check all fields in units detail page with API data", () => {
    cy.loginEnter(email, password);
    cy.url({ timeout: 10000 }).should("include", "/units?page=1");
    cy.wait(1500);

    cy.intercept("GET", "/api/v1/vehicles/**/").as("getIdUnitDetail");
    cy.contains(".css-q34dxg", "TTruck").should("be.visible").click();
    cy.wait("@getIdUnitDetail", { timeout: 10000 }).then((interception) => {
      const unitsDetail = interception.response.body;

      expect([200, 201, 204]).to.include(interception.response.statusCode);
      // expect(unitsDetail).to.have.property("name");
      cy.log(unitsDetail.name);

      cy.get(".DetailInfo_profile__info__title__2XtbT").should(
        "have.text",
        unitsDetail.name
      );
      cy.get(".DetailInfo_profile__info__desc__U6qdb").should(
        "have.text",
        `${unitsDetail.type.name} · ${unitsDetail.year} ${unitsDetail.make.name} ${unitsDetail.model.name} · ${unitsDetail.vin_sn}· ${unitsDetail.license_plate}`
        // 'refrigirator · 2009 Freightliner Cascadia · 567896810 ·IL-TRK1235067'
      );
      cy.get(".DetailInfo_profile__info__driver__3hWmx").should(
        "have.text",
        `${unitsDetail.meter === null ? "No meter" : unitsDetail.meter}${
          unitsDetail.status
        }${unitsDetail.group.name}${unitsDetail.operator.first_name}`
        //  'No meteractiveDispatchMohamed'
      );
    });
  });
});

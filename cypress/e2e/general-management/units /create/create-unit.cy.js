import { URLs } from "../../../../constants/links";
import {
  Selectors,
  stateRegistration,
  truckColors,
  trimTrucks,
  truckMsrpRanges,
} from "./Selectors";

describe("Test create unit function", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should create unit", () => {
    cy.loginWith(email, password);

    cy.url().should("include", URLs.units);

    cy.contains(Selectors.addUnit, "Add Unit").click();

    cy.wait(2000);

    cy.url().should("include", URLs.createUnit);

    cy.get(Selectors.nameInput)
      .focus()
      .type(`FAKE UNIT NAME #${Math.floor(Math.random() * 10000).toFixed()}`);
    cy.get(Selectors.vinInput)
      .focus()
      .type(`56789${Math.floor(Math.random() * 100000).toFixed()}`);

    // Select random values
    for (let i = 0; i < 12; i++) {
      cy.get(Selectors.selectContainer)
        .eq(i)
        .should(Selectors.beVisible)
        .click();
      cy.get(Selectors.selectOption)
        .eq(`${Math.floor(Math.random() * 4)}`)
        .should(Selectors.beVisible)
        .click();
    }
    cy.get(Selectors.licenseInput)
      .focus()
      .type(`IL-TRK123${Math.floor(Math.random() * 10000).toFixed()}`);
    cy.get(Selectors.yearInput).type(
      `${2000 + Math.floor(Math.random() * 26)}`
    );

    cy.get(Selectors.input)
      .eq(4)
      .should(Selectors.beVisible)
      .type(trimTrucks[Math.floor(Math.random() * trimTrucks.length)]);
    cy.get(Selectors.input)
      .eq(5)
      .should(Selectors.beVisible)
      .type(
        stateRegistration[Math.floor(Math.random() * stateRegistration.length)]
      );
    cy.get(Selectors.input)
      .eq(6)
      .should(Selectors.beVisible)
      .type(truckColors[Math.floor(Math.random() * truckColors.length)]);
    cy.get(Selectors.input)
      .eq(7)
      .should(Selectors.beVisible)
      .type(
        truckMsrpRanges[Math.floor(Math.random() * truckMsrpRanges.length)]
      );

    cy.wait(1000);

    cy.intercept("POST", URLs.api.createUnit).as("createUnitRequest");
    cy.contains("button", "Save").should(Selectors.beVisible).click();

    cy.wait("@createUnitRequest").then((interception) => {
      console.log(interception);
      expect([200, 201]).to.include(interception.response.statusCode);
    });

    cy.contains(Selectors.toastMessage, "Success!").should(Selectors.beVisible);

    cy.contains(Selectors.threeDotsMenu, "FAKE UNIT NAME").should(
      Selectors.beVisible
    ); // .click(); IF YOU WANNA SEE VIEW DETAIL INFORMATION ABOUT UNIT

    cy.wait(2000);
  });
});

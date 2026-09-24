import loginPage from "../support/loginPage";
import loginData from "../fixtures/loginData.json";

describe("verifikasi fungsi login", () => {
  it("TC-001-Login dengan username valid password valid", () => {
    cy.intercept("GET", "**/api/v2/dashboard/employees/action-summary").as(
      "contohSummary",
    );
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.usernamevalid);
    loginPage.masukPasssword(loginData.passwordvalid);
    loginPage.clickLogin();
    loginPage.verifikasiLink();
    cy.wait("@contohSummary").its("response.statusCode").should("eq", 200);
  });
  it("TC-002-Login dengan username kosong password kosong", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    loginPage.masukHalaman();
    loginPage.clickLogin();
    loginPage.required();
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-003-Login dengan username invalid password invalid", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    loginPage.masukHalaman();
    loginPage.Usernamesalah(loginData.usernameinvalid);
    loginPage.Passswordsalah(loginData.passwordinvalid);
    loginPage.clickLogin();
    loginPage.invlidCredentials();
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-004-Login dengan username valid password tidak valid", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.usernamevalid);
    loginPage.Passswordsalah(loginData.passwordinvalid);
    loginPage.clickLogin();
    loginPage.invlidCredentials();
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-005-Login dengan username kosong password valid", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    loginPage.masukHalaman();
    loginPage.Passswordsalah(loginData.passwordvalid);
    loginPage.clickLogin();
    loginPage.required();
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-006-Login dengan username valid password kosong", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.usernamevalid);
    loginPage.clickLogin();
    loginPage.required();
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-007-Username dengan spasi di awal/akhir", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.userspasi);
    loginPage.Passswordsalah(loginData.passwordvalid);
    loginPage.clickLogin();
    loginPage.invlidCredentials();
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
  it("TC-008-sensitivity password", () => {
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
    ).as("halamanAwal");
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.usernamevalid);
    loginPage.Passswordsalah(loginData.passwordSensitivity);
    loginPage.clickLogin();
    loginPage.invlidCredentials();
    cy.wait("@halamanAwal").its("response.statusCode").should("eq", 200);
  });
});

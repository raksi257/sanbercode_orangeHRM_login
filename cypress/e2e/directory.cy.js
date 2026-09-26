import loginPage from "../support/loginPage";
import testData from "../fixtures/testData";
import directoryPage from "../support/directoryPage";

describe("Verifikasi fungsi Directory", () => {
  beforeEach(() => {
    loginPage.masukHalaman();
    loginPage.masukUsername(testData.usernamevalid);
    loginPage.masukPasssword(testData.passwordvalid);
    loginPage.clickLogin();
    loginPage.verifikasiLink();
  });

  it("TC-DIR-001 - Akses menu Directory", () => {
    cy.intercept("GET", "**/api/v2/directory/employees*").as("getDirectory");
    directoryPage.masukDirectory();
    cy.wait("@getDirectory").its("response.statusCode").should("eq", 200);
    directoryPage.hasildirectory();
    directoryPage.hasilEmployee();
  });

  it("TC-DIR-002 - Search Employee Name valid", () => {
    cy.intercept("GET", "**/api/v2/directory/employees*").as("searchEmployee");

    directoryPage.masukDirectory();
    directoryPage.inputEmployeeName(testData.employeeSearch);
    directoryPage.pilihEmployee(testData.employeeName);
    directoryPage.klikSearch();
    cy.wait("@searchEmployee").its("response.statusCode").should("eq", 200);
    directoryPage.verifikasiEmployee(testData.employeeName);
  });
  it("TC-DIR-003 - Search Employee Name tidak ditemukan", () => {
    cy.intercept("GET", "**/api/v2/directory/employees*").as(
      "searchEmployeeNotFound",
    );
    directoryPage.masukDirectory();
    directoryPage.inputEmployeeName("ZZNotFound123");
    directoryPage.klikSearch();
    cy.wait("@searchEmployeeNotFound")
      .its("response.statusCode")
      .should("eq", 200);
    directoryPage.verifikasiInvalidEmployeeName();
  });
  it("TC-DIR-004 - Search berdasarkan Location", () => {
    cy.intercept("GET", "**/api/v2/directory/employees*").as("searchLocation");
    directoryPage.masukDirectory();
    directoryPage.pilihLocation(testData.location);
    directoryPage.klikSearch();
    cy.wait("@searchLocation");
    directoryPage.verifikasiHasilLocation();
  });
  it("TC-DIR-005 - Search berdasarkan Job Title", () => {
    cy.intercept("GET", "**/api/v2/directory/employees*").as("searchJobTitle");
    directoryPage.masukDirectory();
    directoryPage.pilihJobTitle(testData.jobTitle);
    directoryPage.klikSearch();
    cy.wait("@searchJobTitle");
    directoryPage.verifikasiHasilSearch(testData.jobTitle);
  });
  it("TC-DIR-006 - Reset filter pencarian", () => {
    cy.intercept("GET", "**/api/v2/directory/employees*").as("resetDirectory");
    directoryPage.masukDirectory();
    directoryPage.inputEmployeeName(testData.employeeSearch);
    directoryPage.pilihEmployee(testData.employeeName);
    directoryPage.klikSearch();
    cy.wait("@resetDirectory").its("response.statusCode").should("eq", 200);
    directoryPage.verifikasiEmployee(testData.employeeName);
    directoryPage.klikReset();
  });
  it("TC-DIR-007 - Search seluruh filter kosong", () => {
    cy.intercept("GET", "**/api/v2/directory/employees*").as("searchEmpty");
    directoryPage.masukDirectory();
    directoryPage.klikSearch();
    cy.wait("@searchEmpty");
    directoryPage.verifikasiHasilLocation();
  });
  it("TC-DIR-08 - Membuka detail employee dari Directory", () => {
    cy.intercept("GET", "**/api/v2/directory/employees*").as("getEmployee");
    directoryPage.masukDirectory();
    directoryPage.inputEmployeeName(testData.employeeSearch);
    cy.wait(1000);
    directoryPage.pilihEmployee(testData.employeeName);
    directoryPage.klikSearch();
    cy.wait("@getEmployee");
    directoryPage.pilihHasilEmployee(testData.employeeName);
    directoryPage.verifikasiHalamanDetail();
  });
});

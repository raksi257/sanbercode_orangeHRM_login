class DirectoryPage {
  masukDirectory() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory",
    );
  }
  hasildirectory() {
    cy.contains("Directory").should("be.visible");
  }

  hasilEmployee() {
    cy.contains("Employee Name").should("be.visible");
  }

  inputEmployeeName(employeeSearch) {
    cy.get('input[placeholder="Type for hints..."]')
      .first()
      .should("be.visible")
      .clear()
      .type(employeeSearch);
  }

  pilihEmployee(employeeName) {
    cy.get(".oxd-autocomplete-option")
      .contains(employeeName)
      .should("be.visible")
      .click();
  }

  klikSearch() {
    cy.contains("button", "Search")
      .filter(":visible")
      .should("be.visible")
      .click();
  }
  klikSearchkosong() {
    cy.get("button.oxd-button")
      .filter(":visible")
      .contains("Search")
      .should("be.visible")
      .click();
  }
  verifikasiInvalidEmployeeName() {
    cy.contains("Invalid").should("be.visible");
  }
  pilihLocation(location) {
    cy.get(".oxd-select-text").eq(1).click();
    cy.contains(location).should("be.visible").click();
  }
  verifikasiHasilLocation(jumlah) {
    cy.contains(`Records Found`).should("be.visible");
  }

  verifikasiEmployee(employeeName) {
    cy.get(".orangehrm-directory-card")
      .should("be.visible")
      .and("contain.text", employeeName);
  }
  pilihJobTitle(jobTitle) {
    cy.get(".oxd-select-text").eq(0).click();

    cy.contains(jobTitle).should("be.visible").click();
  }
  verifikasiHasilSearch(jobTitle) {
    // Memastikan hasil pencarian muncul
    cy.contains("Record Found").should("be.visible");

    // Memastikan job title sesuai dengan filter
    cy.get(".orangehrm-directory-card")
      .should("be.visible")
      .and("contain.text", jobTitle);
  }
  klikReset() {
    cy.contains("Reset").should("be.visible").click();
  }
  cekTableDirectoryTampil() {
    cy.get(".orangehrm-directory-card").should("be.visible");
  }
  verifikasiHalamanDetail() {
    cy.get("body").should("be.visible");
  }
  pilihSuggestionEmployee(nama) {
    cy.get(".oxd-autocomplete-option")
      .contains(nama)
      .should("be.visible")
      .click();
  }
  pilihHasilEmployee(nama) {
    cy.contains(nama).should("be.visible").click();
  }
}

export default new DirectoryPage();

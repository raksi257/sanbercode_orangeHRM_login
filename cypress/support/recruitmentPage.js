class RecruitmentPage {
  bukaRecruitment() {
    cy.contains("span", "Recruitment").should("be.visible").click();

    cy.url().should("include", "/recruitment/viewCandidates");

    cy.get(".oxd-topbar-header-title")
      .should("be.visible")
      .and("contain", "Recruitment");
  }

  verifikasiMenuRecruitment() {
    cy.contains("Candidates").should("be.visible");
    cy.contains("Vacancies").should("be.visible");
  }

  isiNamaCandidate(nama) {
    cy.get('input[placeholder="Type for hints..."]')
      .first()
      .should("be.visible")
      .type(nama);
  }

  pilihAutocompletePertama() {
    cy.get(".oxd-autocomplete-option").first().should("be.visible").click();
  }

  pilihDropdown(label, option) {
    cy.contains("label", label)
      .closest(".oxd-input-group")
      .find(".oxd-select-text")
      .should("be.visible")
      .click();

    cy.contains(".oxd-select-option", option).should("be.visible").click();
  }

  verifikasiDropdown(label, value) {
    cy.contains("label", label)
      .closest(".oxd-input-group")
      .find(".oxd-select-text")
      .should("contain.text", value);
  }

  klikSearch() {
    cy.contains("button", "Search").should("be.visible").click();
  }

  klikReset() {
    cy.contains("button", "Reset").should("be.visible").click();
  }

  verifikasHasilReset() {
    cy.get(".oxd-select-text").each(($el) => {
      cy.wrap($el).should("not.contain.text", "Shortlisted");
    });
  }
  verifikasiTabelCandidate() {
    cy.get(".orangehrm-container").should("be.visible");

    cy.get(".oxd-table").should("be.visible");
  }

  verifikasiAdaCandidate() {
    cy.get(".oxd-table-body .oxd-table-row").should(
      "have.length.greaterThan",
      0,
    );
  }
  verifikasiStatus(status) {
    cy.get(".oxd-table-body").should("be.visible").and("contain.text", status);
  }

  verifikasiDropdownDefault() {
    cy.get(".oxd-select-text").each(($el) => {
      cy.wrap($el).should("contain.text", "-- Select --");
    });
  }

  verifikasiCandidateNameKosong() {
    cy.get('input[placeholder="Type for hints..."]')
      .first()
      .should("have.value", "");
  }

  verifikasiKeywordsTersedia() {
    cy.get('input[placeholder="Enter comma separated words..."]').should(
      "exist",
    );
  }

  verifikasiDateField() {
    cy.get('input[placeholder="From"]').should("exist").and("be.visible");

    cy.get('input[placeholder="To"]').should("exist").and("be.visible");
  }

  verifikasiRecordsFound() {
    cy.contains("Records Found").should("be.visible");
  }
  bukaDetailCandidate() {
    cy.get(".oxd-table-body .oxd-table-row")
      .first()
      .find(".oxd-table-cell-actions button")
      .first()
      .should("be.visible")
      .click();
  }

  verifikasiHalamanDetailCandidate() {
    cy.url().should("include", "/recruitment/addCandidate/");
  }
}

export default new RecruitmentPage();

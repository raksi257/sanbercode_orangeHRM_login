import loginPage from "../support/loginPage";
import recruitmentPage from "../support/recruitmentPage";
import testData from "../fixtures/testData";

describe("Verifikasi fungsi Recruitment", () => {
  beforeEach(() => {
    loginPage.masukHalaman();
    loginPage.masukUsername(testData.usernamevalid);
    loginPage.masukPasssword(testData.passwordvalid);
    loginPage.clickLogin();

    cy.url().should("include", "/dashboard/index");
  });
  it("TC-REC-001 - Akses menu Recruitment", () => {
    cy.intercept("GET", "**/api/v2/dashboard/employees/action-summary").as(
      "dashboard",
    );
    recruitmentPage.bukaRecruitment();
    recruitmentPage.verifikasiMenuRecruitment();
  });
  it("TC-REC-002 - Search Candidate berdasarkan nama yang valid", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );
    recruitmentPage.bukaRecruitment();
    recruitmentPage.isiNamaCandidate(testData.candidateName);
    recruitmentPage.pilihAutocompletePertama();
    recruitmentPage.klikSearch();
    cy.wait("@searchCandidate").its("response.statusCode").should("eq", 200);
    recruitmentPage.verifikasiTabelCandidate();
  });
  it("TC-REC-003 - Search Candidate dengan nama tidak ditemukan", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidateNotFound",
    );
    recruitmentPage.bukaRecruitment();
    recruitmentPage.isiNamaCandidate(testData.candidateNameNotFound);
    recruitmentPage.klikSearch();
    cy.wait("@searchCandidateNotFound")
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("body").should("not.contain", testData.candidateNameNotFound);
  });
  it("TC-REC-004 - Filter Candidate berdasarkan Vacancy", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "filterVacancy",
    );
    recruitmentPage.bukaRecruitment();
    recruitmentPage.pilihDropdown("Vacancy", testData.pilihVacancy);
    recruitmentPage.klikSearch();
    cy.wait("@filterVacancy").its("response.statusCode").should("eq", 200);
    recruitmentPage.verifikasiTabelCandidate();
  });
  it("TC-REC-005 - Filter Candidate berdasarkan Hiring Manager", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "filterHiringManager",
    );
    recruitmentPage.bukaRecruitment();
    recruitmentPage.pilihDropdown("Hiring Manager", testData.candidateManager);
    recruitmentPage.verifikasiDropdown(
      "Hiring Manager",
      testData.candidateManager,
    );
    recruitmentPage.klikSearch();
    cy.wait("@filterHiringManager")
      .its("response.statusCode")
      .should("eq", 200);
    recruitmentPage.verifikasiTabelCandidate();
  });
  it("TC-REC-006 - Filter Candidate berdasarkan Status", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as("filterStatus");
    recruitmentPage.bukaRecruitment();
    recruitmentPage.pilihDropdown("Status", testData.pilihStatus);
    recruitmentPage.klikSearch();
    cy.wait("@filterStatus").its("response.statusCode").should("eq", 200);
    recruitmentPage.verifikasiTabelCandidate();
    recruitmentPage.verifikasiStatus(testData.pilihStatus);
    recruitmentPage.verifikasiAdaCandidate();
  });
  it("TC-REC-007 - Reset filter Candidate", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "resetCandidate",
    );
    recruitmentPage.bukaRecruitment();
    recruitmentPage.pilihDropdown("Status", testData.pilihStatus);
    recruitmentPage.klikSearch();
    recruitmentPage.klikReset();
    recruitmentPage.verifikasHasilReset();
    recruitmentPage.verifikasiRecordsFound();
    cy.wait("@resetCandidate").its("response.statusCode").should("eq", 200);
  });
  it("TC-REC-008 - Membuka detail Candidate", () => {
    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );
    recruitmentPage.bukaRecruitment();
    recruitmentPage.isiNamaCandidate("Peter ai");
    recruitmentPage.pilihAutocompletePertama();
    recruitmentPage.klikSearch();
    cy.wait("@searchCandidate").its("response.statusCode").should("eq", 200);
    recruitmentPage.verifikasiTabelCandidate();
    recruitmentPage.bukaDetailCandidate();
    recruitmentPage.verifikasiHalamanDetailCandidate();
  });
});

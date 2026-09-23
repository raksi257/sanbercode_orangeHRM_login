import loginPage from "../support/loginPage";
import loginData from "../fixtures/loginData.json";

describe("verifikasi fungsi login", () => {
  it("TC-001-Login dengan username valid password valid", () => {
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.usernamevalid);
    loginPage.masukPasssword(loginData.passwordvalid);
    loginPage.clickLogin();
    loginPage.verifikasiLink();
  });
  it("TC-002-Login dengan username kosong password kosong", () => {
    loginPage.masukHalaman();
    loginPage.clickLogin();
    loginPage.required();
  });
  it("TC-003-Login dengan username invalid password invalid", () => {
    loginPage.masukHalaman();
    loginPage.Usernamesalah(loginData.usernameinvalid);
    loginPage.Passswordsalah(loginData.passwordinvalid);
    loginPage.clickLogin();
    loginPage.invlidCredentials();
  });
  it("TC-004-Login dengan username valid password tidak valid", () => {
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.usernamevalid);
    loginPage.Passswordsalah(loginData.passwordinvalid);
    loginPage.clickLogin();
    loginPage.invlidCredentials();
  });
  it("TC-005-Login dengan username kosong password valid", () => {
    loginPage.masukHalaman();
    loginPage.Passswordsalah(loginData.passwordvalid);
    loginPage.clickLogin();
    loginPage.required();
  });
  it("TC-006-Login dengan username valid password kosong", () => {
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.usernamevalid);
    loginPage.clickLogin();
    loginPage.required();
  });
  it("TC-007-Username dengan spasi di awal/akhir", () => {
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.userspasi);
    loginPage.Passswordsalah(loginData.passwordvalid);
    loginPage.clickLogin();
    loginPage.invlidCredentials();
  });
  it("TC-008-sensitivity password", () => {
    loginPage.masukHalaman();
    loginPage.masukUsername(loginData.usernamevalid);
    loginPage.Passswordsalah(loginData.passwordSensitivity);
    loginPage.clickLogin();
    loginPage.invlidCredentials();
  });
});

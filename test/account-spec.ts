import * as chai from "chai";
import { Account, accounts } from "../src/account";

const expect = chai.expect;

describe("accounts", () => {
  it("should retrun a list of accounts", () => {
    accounts().then((a) => {
      expect(a).to.be.an("array").that.is.not.empty;
      expect(a[0]).to.be.an("Account");
    });
  });
});

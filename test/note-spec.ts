import * as chai from "chai";

import { Note, notes } from "../src/note";

const expect = chai.expect;

describe("notes", () => {
  it("should retrun a list of notes", () => {
    notes().then((n) => {
      expect(n).to.be.an("array").that.is.not.empty;
      expect(n[0]).to.be.a("Note");
      expect(n[0].creationDate).to.be.a("Date");
      expect(n[0].modificationDate).to.be.a("Date");
    });
  });
});

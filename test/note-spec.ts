import * as chai from "chai";

import { Folder } from "../src/folder";
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

describe("Note", async () => {

  before(async () => {
    this.folder = await Folder.create("Chai test folder");
    this.note = new Note({
      body: "Hello Wold",
      title: "Hello Wold Note",
    });
  });

  it("should create a note", async () => {
    console.log(this.note);
    console.log(this.folder);
    this.note = await this.note.create(this.folder.id);
    expect(this.note.id).to.be.a("string").that.is.not.null;
  });

  after(async () => {
    this.folder.delete();
  });
});

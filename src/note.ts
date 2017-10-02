import * as osa from "osa2";

declare const Application: any;

/**
 * List all notes
 * @return      {Promise<Note[]>} List of notes
 */
export function notes(): Promise<Note[]> {
  return osa(() => {
    const Notes = Application("Notes");
    return Notes.notes().map((n) => {
      return {
        body: n.body(),
        creationDate: n.creationDate(),
        id: n.id(),
        modificationDate: n.modificationDate(),
        name: n.name(),
      };
    });
  })().then((notes) => {
    return notes.map((note) => new Note(note));
  });
}

export class Note {

  public id: string;
  public name: string;
  public body: string;
  public creationDate: string;
  public modificationDate: string;

  constructor(object?: any) {
    this.id = object.id;
    this.name = object.name;
    this.body = object.body;
    this.creationDate = object.creationDate;
    this.modificationDate = object.modificationDate;
  }

  /**
   * Update a note
   * @return {Promise<Note>} Updated Note
   */
  public update(): Promise<Note> {
    return osa((note) => {
      const Notes = Application("Notes");
      const oldNote = Notes.notes.byId(note.id);
      oldNote.name = note.name;
      oldNote.body = note.body;
      oldNote.save();
      return {
        body: oldNote.body(),
        creationDate: oldNote.creationDate(),
        id: oldNote.id(),
        modificationDate: oldNote.modificationDate(),
        name: oldNote.name(),
      };
    })(this).then((newNote) => new Note(newNote));
  }

  /**
   * Delete a note
   * @return {Promise<any>}
   */
  public delete(): Promise<any> {
    return osa((note) => {
      const Notes = Application("Notes");
      const oldNote = Notes.notes.byId(note.id);
      return oldNote.delete();
    })(this);
  }
}

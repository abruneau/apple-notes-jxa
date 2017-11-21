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

  public static findByName(name: string, folderId: string): Promise<Note> {
    return osa((name, folderId) => {
      const Notes = Application("Notes");
      const folder = Notes.folders.byId(folderId);
      const notes = folder.notes.where({
        name,
      });

      if (!notes.length) {
        throw new Error(`Note ${name} note found`);
      }
      return {
        body: notes[0].body(),
        creationDate: notes[0].creationDate(),
        id: notes[0].id(),
        modificationDate: notes[0].modificationDate(),
        name: notes[0].name(),
      };
    })(name, folderId).then((note) => new Note(note));
  }

  public id: string;
  public name: string;
  public body: string;
  public creationDate: Date;
  public modificationDate: Date;

  constructor(object?: any) {
    this.id = object.id;
    this.name = object.name;
    this.body = object.body;
    this.creationDate = object.creationDate instanceof Date ? object.creationDate : new Date(object.creationDate);
    this.modificationDate = object.modificationDate instanceof Date ? object.modificationDate : new Date(object.modificationDate);
  }

  /**
   * Create a new Note in a folder
   * @param  {string}        folderId The Folder Id
   * @return {Promise<Note>}          The new Note
   */
  public create(folderId: string): Promise<Note> {
    return osa((note, folderId) => {
      const Notes = Application("Notes");
      const folder = Notes.folders.byId(folderId);
      const newNote = Notes.Note({
        body: note.body,
        name: note.name,
      });
      folder.notes.push(newNote);
      return {
        body: newNote.body(),
        creationDate: newNote.creationDate(),
        id: newNote.id(),
        modificationDate: newNote.modificationDate(),
        name: newNote.name(),
      };
    })(this, folderId).then((note) => new Note(note));
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

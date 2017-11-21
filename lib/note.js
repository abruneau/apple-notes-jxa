"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var osa = require("osa2");
function notes() {
    return osa(function () {
        var Notes = Application("Notes");
        return Notes.notes().map(function (n) {
            return {
                body: n.body(),
                creationDate: n.creationDate(),
                id: n.id(),
                modificationDate: n.modificationDate(),
                name: n.name(),
            };
        });
    })().then(function (notes) {
        return notes.map(function (note) { return new Note(note); });
    });
}
exports.notes = notes;
var Note = (function () {
    function Note(object) {
        this.id = object.id;
        this.name = object.name;
        this.body = object.body;
        this.creationDate = object.creationDate instanceof Date ? object.creationDate : new Date(object.creationDate);
        this.modificationDate = object.modificationDate instanceof Date ? object.modificationDate : new Date(object.modificationDate);
    }
    Note.findByName = function (name, folderId) {
        return osa(function (name, folderId) {
            var Notes = Application("Notes");
            var folder = Notes.folders.byId(folderId);
            var notes = folder.notes.where({
                name: name,
            });
            if (!notes.length) {
                throw new Error("Note " + name + " note found");
            }
            return {
                body: notes[0].body(),
                creationDate: notes[0].creationDate(),
                id: notes[0].id(),
                modificationDate: notes[0].modificationDate(),
                name: notes[0].name(),
            };
        })(name, folderId).then(function (note) { return new Note(note); });
    };
    Note.prototype.create = function (folderId) {
        return osa(function (note, folderId) {
            var Notes = Application("Notes");
            var folder = Notes.folders.byId(folderId);
            var newNote = Notes.Note({
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
        })(this, folderId).then(function (note) { return new Note(note); });
    };
    Note.prototype.update = function () {
        return osa(function (note) {
            var Notes = Application("Notes");
            var oldNote = Notes.notes.byId(note.id);
            oldNote.name = note.name;
            oldNote.body = note.body;
            return {
                body: oldNote.body(),
                creationDate: oldNote.creationDate(),
                id: oldNote.id(),
                modificationDate: oldNote.modificationDate(),
                name: oldNote.name(),
            };
        })(this).then(function (newNote) { return new Note(newNote); });
    };
    Note.prototype.delete = function () {
        return osa(function (note) {
            var Notes = Application("Notes");
            var oldNote = Notes.notes.byId(note.id);
            return oldNote.delete();
        })(this);
    };
    return Note;
}());
exports.Note = Note;

"use strict";
exports.__esModule = true;
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
                name: n.name()
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
        this.creationDate = object.creationDate;
        this.modificationDate = object.modificationDate;
    }
    Note.prototype.update = function () {
        return osa(function (note) {
            var Notes = Application("Notes");
            var oldNote = Notes.notes.byId(note.id);
            oldNote.name = note.name;
            oldNote.body = note.body;
            oldNote.save();
            return {
                body: oldNote.body(),
                creationDate: oldNote.creationDate(),
                id: oldNote.id(),
                modificationDate: oldNote.modificationDate(),
                name: oldNote.name()
            };
        })(this).then(function (newNote) { return new Note(newNote); });
    };
    Note.prototype["delete"] = function () {
        return osa(function (note) {
            var Notes = Application("Notes");
            var oldNote = Notes.notes.byId(note.id);
            return oldNote["delete"]();
        })(this);
    };
    return Note;
}());
exports.Note = Note;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var osa = require("osa2");
var note_1 = require("./note");
function folders() {
    return osa(function () {
        var Notes = Application("Notes");
        return Notes.folders().map(function (f) {
            return {
                id: f.id(),
                name: f.name(),
            };
        });
    })().then(function (folders) {
        return folders.map(function (f) { return new Folder(f); });
    });
}
exports.folders = folders;
var Folder = (function () {
    function Folder(object) {
        this.id = object.id;
        this.name = object.name;
    }
    Folder.find = function (name) {
        return osa(function (query) {
            var Notes = Application("Notes");
            var folders = Notes.folders.where({
                name: query,
            });
            if (!folders.length) {
                throw new Error("Folder " + query + " note found");
            }
            return folders().map(function (f) {
                return {
                    id: f.id(),
                    name: f.name(),
                };
            });
        })(name).then(function (folders) {
            return folders.map(function (f) { return new Folder(f); });
        });
    };
    Folder.create = function (name, accountName) {
        return osa(function (query, accountName) {
            var Notes = Application("Notes");
            var defaultAccount = "iCloud";
            var account = accountName ? Notes.accounts[accountName] : Notes.accounts[defaultAccount];
            if (account.folders.name().includes(query)) {
                throw new Error("Folder " + query + " already exists");
            }
            var newFolder = Notes.Folder({ name: query });
            account.folders.push(newFolder);
            return {
                id: newFolder.id(),
                name: newFolder.name(),
            };
        })(name, accountName).then(function (folder) { return new Folder(folder); });
    };
    Folder.prototype.delete = function () {
        return osa(function (folderId) {
            var Notes = Application("Notes");
            return Notes.folders.byId(folderId).delete();
        })(this.id);
    };
    Folder.prototype.notes = function () {
        return osa(function (folderId) {
            var Notes = Application("Notes");
            var folder = Notes.folders.byId(folderId);
            return folder.notes().map(function (n) {
                return {
                    body: n.body(),
                    creationDate: n.creationDate(),
                    id: n.id(),
                    modificationDate: n.modificationDate(),
                    name: n.name(),
                };
            });
        })(this.id).then(function (notes) {
            return notes.map(function (note) { return new note_1.Note(note); });
        });
    };
    Folder.prototype.createNote = function (name) {
        var note = new note_1.Note({ name: name });
        return note.create(this.id);
    };
    return Folder;
}());
exports.Folder = Folder;

"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
lib_1.folders().then(function (fs) {
    console.log(fs);
    return lib_1.Folder.create("Test Folder");
}).then(function (folder) {
    var title = "Note " + new Date().toString();
    return new lib_1.Note({
        body: "<h1>Note Title</h1>",
        name: title
    }).create(folder.id);
}).then(function (note) {
    console.log(note);
    note.body = "<h1>I changed the Title</h1>";
    return note.update();
}).then(function (note) {
    console.log(note);
    return note["delete"]();
});

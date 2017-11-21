import { Folder, folders, Note } from "../lib";

folders().then((fs) => {
  console.log(fs);
  return Folder.create("Test Folder");
}).then((folder: Folder) => {
  const title = "Note " + new Date().toString();
  return new Note({
    body: "<h1>Note Title</h1>",
    name: title,
  }).create(folder.id);
}).then((note: Note) => {
  console.log(note);
  note.body = "<h1>I changed the Title</h1>";
  return note.update();
}).then((note: Note) => {
  console.log(note);
  return note.delete();
});

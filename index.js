import express from "express";
import bodyParser from "body-parser";

const app = express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let notes = [];

function generateUniqueId() {
    return new Date().getTime().toString(36) + Math.random().toString(36).substr(2);
}
//generatorul pentru unique ID

app.get("/", (req, res) =>{
    res.render("index.ejs", {notes} );
});
/* render the notes array */

app.post("/post-note", (req, res) => {
    const newNote = {
        id: generateUniqueId(),
        title: req.body.title,
        description: req.body.description
    };

    notes.push(newNote);

    res.redirect("/");
  });
// create the notes array and redirect to /

app.get("/edit-note/:id", (req, res) =>{
    const noteId = req.params.id;
    const noteToEdit = notes.find(note => note.id === noteId);

    if(!noteToEdit){
        res.status(404).send("Note not found!");
    } else{
        res.render("edit.ejs", {note: noteToEdit });
    }
});
//go to edit.ejs (edit window)

app.get("/home", (req, res) =>{
    res.redirect("/");
});
// return home page

app.post("/update-note/:id", (req, res) =>{
    const noteId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;

    const noteToUpdate = notes.find(note => note.id === noteId);

    if (!noteToUpdate){
        res.status(404).send("Note not found!");
    } else{
        noteToUpdate.title = updatedTitle;
        noteToUpdate.description = updatedDescription;
        res.redirect('/');
    }
});
//ia datele din edit.ejs si le pune in index.ejs in notes

app.post("/delete-note/:id", (req, res) =>{
    const noteId = req.params.id;

    const noteToDelete = notes.find(note => note.id === noteId);

    if(!noteToDelete){
        res.status(404).send("Note not found!");
    } else{
        notes = notes.filter(note => note.id !== noteId);
    }
    res.redirect("/");
});
//sterge note

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
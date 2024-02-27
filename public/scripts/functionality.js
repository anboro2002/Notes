document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addNoteButton").addEventListener("click", function(){
        var noteForm = document.getElementById("noteForm");
        if (noteForm.style.display === "none") {
            noteForm.style.display = "block";
        } else {
            noteForm.style.display = "none";
        }
    });
});
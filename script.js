"use strict";

var notes = document.querySelector(".notes");
var addBtn = document.querySelector(".add");
addBtn.addEventListener("click", function(){
    // Crates and appends to DOM new note
    createNote("");
});

// Crates and appends to DOM new note
function createNote(text){
    var newNote = document.createElement("div");
   newNote.classList.add("note");
   newNote.innerHTML =
   `
            <div class="tools">
                <button class="edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="text ${(text == "") ? "hidden":""}">${text}</div>
            <textarea class="${(text != "") ? "hidden":""}">${text}</textarea>
   `

   notes.prepend(newNote);
   editNotes();
   deleteNote();
}

function editNotes(){
    var editBtn = document.querySelector(".edit");
    var text = document.querySelector(".text");
    var textArea = document.querySelector("textarea");

    editBtn.addEventListener("click", function(){
        textArea.classList.toggle("hidden");
        text.classList.toggle("hidden");

    });

    window.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            textArea.classList.add("hidden");
            text.classList.remove("hidden");
        }
    })

    textArea.addEventListener("change", function(){
        text.innerText = textArea.value;

        // Update localstorage memory
        updateMemory();
    })
}

function deleteNote(){
    var deleteBtn = document.querySelector(".delete");
    deleteBtn.addEventListener("click", function(){
        this.parentNode.parentNode.remove();
        console.log(this.parentNode.parentNode);

        // Update localstorage memory
        updateMemory();
    });
}

function updateMemory(){
    var notesText = document.querySelectorAll(".text");
    var notesArray = [];

    notesText.forEach(x => {
        notesArray.unshift(x.innerText);
    });

    localStorage.setItem("notes-array", notesArray);
    console.log(localStorage.getItem("notes-array"));
}

// Load from localstorage memory
var notesFormMemmory = localStorage.getItem("notes-array").split(",");
console.log(notesFormMemmory);

if(notesFormMemmory){
    notesFormMemmory.forEach(x => {
        if(x != "") { 
            createNote(x);
        }
    });
}
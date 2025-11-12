const addBtn = document.getElementById("addBtn");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

let editIndex = null; // Güncellenecek notun indeksini tutar

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.classList.add("note");

        div.innerHTML = `
            <p>${note}</p>
            <div class="btns">
                <button onclick="editNote(${index})">Güncelle</button>
                <button onclick="deleteNote(${index})">Sil</button>
            </div>
        `;

        notesList.appendChild(div);
    });
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === "") return alert("Lütfen bir not yazın!");

    const notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Eğer düzenleme modundaysak mevcut notu güncelle
    if (editIndex !== null) {
        notes[editIndex] = noteText;
        editIndex = null;
        addBtn.textContent = "Not Ekle"; // Buton metnini eski haline döndür
    } else {
        // Yeni not ekle
        notes.push(noteText);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";
    loadNotes();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

function editNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    noteInput.value = notes[index];
    editIndex = index;
    addBtn.textContent = "Kaydet"; // Güncelleme modunu göstermek için buton metnini değiştir
}

addBtn.addEventListener("click", addNote);
loadNotes();

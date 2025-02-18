document.addEventListener("DOMContentLoaded", function () {
    loadScores();
    loadGames();
});

// ✅ Load scores from localStorage
function loadScores() {
    let storedScores = JSON.parse(localStorage.getItem("gcScores")) || {
        IT: 0, ENTC: 0, Civil: 0, Mechanical: 0, Electrical: 0
    };

    document.getElementById("itScore").textContent = storedScores.IT;
    document.getElementById("entcScore").textContent = storedScores.ENTC;
    document.getElementById("civilScore").textContent = storedScores.Civil;
    document.getElementById("mechScore").textContent = storedScores.Mechanical;
    document.getElementById("elecScore").textContent = storedScores.Electrical;
}

// ✅ Listen for real-time score updates
window.addEventListener("storage", function (event) {
    if (event.key === "gcUpdate") {
        console.log("📢 Scores updated by admin, reloading student scoreboard...");
        loadScores();
    }
});

// ✅ Function to register a student
document.getElementById("registerBtn").addEventListener("click", function () {
    let name = document.getElementById("studentName").value.trim();
    let branch = document.getElementById("branchSelect").value;
    let game = document.getElementById("gameSelect").value;

    if (!name || branch === "Select your branch" || !game) {
        alert("⚠️ Please enter your name, select a branch, and choose a game.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("registeredStudents")) || [];

    // ✅ Prevent duplicate registrations
    let isDuplicate = students.some(student => student.name === name);
    if (isDuplicate) {
        alert("⚠️ You have already registered!");
        return;
    }

    students.push({ name, branch, game });
    localStorage.setItem("registeredStudents", JSON.stringify(students));

    // ✅ Show success message with animation
    let msg = document.createElement("div");
    msg.classList.add("success-message");
    msg.textContent = `✅ ${name} registered for ${game}!`;
    document.body.appendChild(msg);

    setTimeout(() => msg.classList.add("fade-out"), 1500);
    setTimeout(() => msg.remove(), 2000);

    // ✅ Notify admin instantly
    localStorage.setItem("studentUpdate", Date.now());

    // ✅ Clear input fields
    document.getElementById("studentName").value = "";
    document.getElementById("branchSelect").selectedIndex = 0;
    document.getElementById("gameSelect").selectedIndex = 0;
});

// ✅ Function to load games dynamically
function loadGames() {
    let storedGames = JSON.parse(localStorage.getItem("gameList")) || [];
    let gameSelect = document.getElementById("gameSelect");
    gameSelect.innerHTML = "<option disabled selected>Choose a game</option>"; // Reset dropdown

    storedGames.forEach((game) => {
        let option = document.createElement("option");
        option.value = game;
        option.textContent = game;
        option.classList.add("fade-in"); // Add animation
        gameSelect.appendChild(option);
    });

    console.log("🎮 Games loaded for students:", storedGames);
}

// ✅ Listen for admin adding/removing games in real-time
window.addEventListener("storage", function (event) {
    if (event.key === "gameUpdate") {
        console.log("📢 New game added or removed, updating student dashboard...");
        loadGames();
    }
});

// ✅ Listen for real-time student removals
window.addEventListener("storage", function (event) {
    if (event.key === "studentUpdate") {
        console.log("📢 Student list updated by admin, refreshing student dashboard...");
    }
});



window.onload = function() {
    sortTableByScore();
}

function sortTableByScore() {
    const table = document.getElementById("scoreTable");
    const rows = Array.from(table.getElementsByTagName("tr"));

    // Sort the rows based on the second column (GC Points)
    rows.sort((rowA, rowB) => {
        const scoreA = parseInt(rowA.cells[1].textContent); // Get score of row A
        const scoreB = parseInt(rowB.cells[1].textContent); // Get score of row B
        return scoreB - scoreA; // Sort in descending order
    });

    // Reinsert the sorted rows back into the table body
    rows.forEach(row => table.appendChild(row));
}

// Show the modal when the user selects a branch or game
document.getElementById('branchSelect').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
    document.body.classList.add('modal-active'); // Disable background interaction
});

// Show the modal when the user selects a game
document.getElementById('gameSelect').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'flex';
    document.body.classList.add('modal-active'); // Disable background interaction
});

// Close the modal when the close button is clicked
document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
    document.body.classList.remove('modal-active'); // Enable background interaction
});


document.addEventListener("DOMContentLoaded", function () {
    loadScores();
    loadGames();
    loadStudents();
});
 
 
 
 
// ✅ Function to update scores and sync in real-time
function updateScore(branch, value) {
    let storedScores = JSON.parse(localStorage.getItem("gcScores")) || {
        IT: 0, ENTC: 0, Civil: 0, Mechanical: 0, Electrical: 0
    };

    let newScore = Math.max(parseInt(storedScores[branch] || 0) + value, 0);
    storedScores[branch] = newScore;

    localStorage.setItem("gcScores", JSON.stringify(storedScores));
    localStorage.setItem("gcUpdate", Date.now()); // ✅ Trigger real-time update

    loadScores(); // 🔥 Refresh scores in admin
    console.log(`✅ ${branch} Score Updated:`, newScore);
}








// ✅ Function to save scores in localStorage and trigger real-time updates
function saveScores() {
    let scores = {
        IT: document.getElementById("itScore").textContent,
        ENTC: document.getElementById("entcScore").textContent,
        Civil: document.getElementById("civilScore").textContent,
        Mechanical: document.getElementById("mechScore").textContent,
        Electrical: document.getElementById("elecScore").textContent
    };

    localStorage.setItem("gcScores", JSON.stringify(scores));
    localStorage.setItem("gcUpdate", Date.now());  // 🔥 Real-time update trigger
    console.log("✅ Scores saved:", scores);
}






// ✅ Function to load scores dynamically
function loadScores() {
    let storedScores = JSON.parse(localStorage.getItem("gcScores"));

    if (!storedScores) {
        storedScores = { IT: 0, ENTC: 0, Civil: 0, Mechanical: 0, Electrical: 0 };
        localStorage.setItem("gcScores", JSON.stringify(storedScores));
    }

    // ✅ Ensure admin scoreboard updates properly
    document.getElementById("itScore").textContent = storedScores.IT;
    document.getElementById("entcScore").textContent = storedScores.ENTC;
    document.getElementById("civilScore").textContent = storedScores.Civil;
    document.getElementById("mechScore").textContent = storedScores.Mechanical;
    document.getElementById("elecScore").textContent = storedScores.Electrical;

    console.log("✅ Admin Scores Loaded:", storedScores);
}


// ✅ Function to update scores and sync in real-time
function updateScore(branch, value) {
    let storedScores = JSON.parse(localStorage.getItem("gcScores")) || {
        IT: 0, ENTC: 0, Civil: 0, Mechanical: 0, Electrical: 0
    };

    let newScore = Math.max(parseInt(storedScores[branch] || 0) + value, 0);
    storedScores[branch] = newScore;

    localStorage.setItem("gcScores", JSON.stringify(storedScores));
    localStorage.setItem("gcUpdate", Date.now()); // ✅ Trigger real-time update

    loadScores(); // 🔥 Refresh scores in admin
    console.log(`✅ ${branch} Score Updated:`, newScore);
}

// ✅ Function to load scores dynamically and sort them
function loadScores() {
    let storedScores = JSON.parse(localStorage.getItem("gcScores")) || {
        IT: 0, ENTC: 0, Civil: 0, Mechanical: 0, Electrical: 0
    };

    // Sort scores in descending order
    let sortedScores = Object.entries(storedScores).sort((a, b) => b[1] - a[1]);

    // Get the score table body
    let scoreTableBody = document.getElementById("scoreTableBody");
    scoreTableBody.innerHTML = ""; // Clear existing rows

    // Create rows for each sorted branch score
    sortedScores.forEach(([branch, score]) => {
        let row = document.createElement("tr");

        // Create branch name cell
        let branchCell = document.createElement("td");
        branchCell.textContent = branch;

        // Create score cell
        let scoreCell = document.createElement("td");
        scoreCell.textContent = score;

        // Create action cell
        let actionCell = document.createElement("td");
        actionCell.innerHTML = `
            <button class="btn update-btn" onclick="updateScore('${branch}', 1)">+1</button>
            <button class="btn update-btn" onclick="updateScore('${branch}', -1)">-1</button>
        `;

        // Append cells to row
        row.appendChild(branchCell);
        row.appendChild(scoreCell);
        row.appendChild(actionCell);

        // Append row to the table body
        scoreTableBody.appendChild(row);
    });

    console.log("✅ Scores loaded and sorted:", sortedScores);
}

// Initially load and display the scores
loadScores();



// ✅ Function to add a new game
function addGame() {
    let gameName = document.getElementById("gameName").value.trim();

    if (!gameName) {
        alert("⚠️ Please enter a game name.");
        return;
    }

    let games = JSON.parse(localStorage.getItem("gameList")) || [];
    
    if (games.includes(gameName)) {
        alert("⚠️ This game is already added.");
        return;
    }

    games.push(gameName);
    localStorage.setItem("gameList", JSON.stringify(games));
    
    document.getElementById("gameName").value = ""; // Clear input

    // Notify student dashboard instantly
    localStorage.setItem("gameUpdate", Date.now());

    // Show animation for game added
    let msg = document.createElement("div");
    msg.classList.add("success-message");
    msg.textContent = `🎮 ${gameName} added successfully!`;
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add("fade-out"), 1500);
    setTimeout(() => msg.remove(), 2000);

    loadGames(); // Refresh the game list
}

// ✅ Function to remove a game
function removeGame(gameName) {
    let games = JSON.parse(localStorage.getItem("gameList")) || [];

    let updatedGames = games.filter(game => game !== gameName);
    localStorage.setItem("gameList", JSON.stringify(updatedGames));

    // Notify students that a game was removed
    localStorage.setItem("gameUpdate", Date.now());

    loadGames(); // Refresh the game list
}

// ✅ Function to load games in the admin panel
function loadGames() {
    let storedGames = JSON.parse(localStorage.getItem("gameList")) || [];
    let gameList = document.getElementById("gameList");
    gameList.innerHTML = ""; // Clear previous games

    storedGames.forEach((game) => {
        let li = document.createElement("li");
        li.classList.add("game-item"); // Apply boxy styling
        
        li.innerHTML = `
            <div class="game-info">
                🎮 <strong>${game}</strong>
            </div>
            <button class="remove-game" onclick="removeGame('${game}')"> Remove</button>
        `;

        gameList.appendChild(li);
    });

    console.log("✅ Games loaded for admin:", storedGames);
}


// ✅ Function to remove a student
function removeStudent(name) {
    let students = JSON.parse(localStorage.getItem("registeredStudents")) || [];

    let updatedStudents = students.filter(student => student.name !== name);
    localStorage.setItem("registeredStudents", JSON.stringify(updatedStudents));

    // Notify students that a student was removed
    localStorage.setItem("studentUpdate", Date.now());

    loadStudents(); // Refresh the student list
}
// ✅ Function to load registered students dynamically
function loadStudents() {
    let storedStudents = JSON.parse(localStorage.getItem("registeredStudents")) || [];
    let studentList = document.getElementById("studentList");
    studentList.innerHTML = ""; // Clear previous student list

    storedStudents.forEach((student) => {
        let li = document.createElement("li");
        li.innerHTML = `🥷🏻 <strong>${student.name}</strong> - <em>${student.branch}</em> - 🎮 ${student.game}
                        <button class="remove-student" onclick="removeStudent('${student.name}')">Remove</button>`;
        li.classList.add("student-item", "fade-in"); // Animation effect
        studentList.appendChild(li);
    });

    console.log("✅ Students loaded for admin:", storedStudents);
}

// ✅ Admin manually updates scores via buttons
document.querySelectorAll(".score-update-btn").forEach(button => {
    button.addEventListener("click", function () {
        let branch = this.dataset.branch;
        let value = parseInt(this.dataset.value, 10);
        updateScore(branch, value);
    });
});

// ✅ Listen for real-time updates in the student dashboard
window.addEventListener("storage", function (event) {
    if (event.key === "studentUpdate") {
        console.log("📢 A student registered or removed, updating admin dashboard...");
        loadStudents();
    }
    if (event.key === "gameUpdate") {
        console.log("📢 A new game was added or removed, updating admin dashboard...");
        loadGames();
    }
    if (event.key === "gcUpdate") {
        console.log("📢 Scores updated, reloading admin scoreboard...");
        loadScores();
    }
});
window.addEventListener("storage", function (event) {
    if (event.key === "gcUpdate") {
        console.log("📢 GC Scores updated in localStorage, reloading in Admin...");
        loadScores();
    }
});



function sortAndDisplayScores() {
    let scoreTable = document.querySelector(".scoreboard tbody");
    
    // Get all rows from the table
    let rows = Array.from(scoreTable.querySelectorAll("tr"));
    
    // Sort rows based on the score (assuming score is in the second column)
    rows.sort((a, b) => {
        let scoreA = parseInt(a.cells[1].textContent, 10) || 0;
        let scoreB = parseInt(b.cells[1].textContent, 10) || 0;
        return scoreB - scoreA; // Sorting in descending order
    });

    // Clear existing rows and append sorted rows
    scoreTable.innerHTML = "";
    rows.forEach(row => scoreTable.appendChild(row));
}

// Call function after updating scores dynamically
sortAndDisplayScores();






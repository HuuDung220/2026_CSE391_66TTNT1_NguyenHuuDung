let students = [];

let nameInput = document.getElementById("name");
let scoreInput = document.getElementById("score");
let addBtn = document.getElementById("addBtn");
let tbody = document.getElementById("tableBody");
let stats = document.getElementById("stats");

function classify(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7) return "Khá";
    if (score >= 5) return "Trung bình";
    return "Yếu";
}

function addStudent() {

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Dữ liệu không hợp lệ");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    renderTable();

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

function renderTable() {

    tbody.innerHTML = "";

    let total = 0;

    students.forEach((s, index) => {

        let tr = document.createElement("tr");

        if (s.score < 5) {
            tr.classList.add("weak");
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${s.name}</td>
            <td>${s.score}</td>
            <td>${classify(s.score)}</td>
            <td>
                <button data-index="${index}">Xóa</button>
            </td>
        `;

        tbody.appendChild(tr);

        total += s.score;
    });

    let avg = students.length ? (total / students.length).toFixed(2) : 0;

    stats.textContent =
        "Tổng sinh viên: " + students.length +
        " | Điểm trung bình: " + avg;
}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addStudent();
    }
});

tbody.addEventListener("click", function(e) {

    if (e.target.tagName === "BUTTON") {

        let index = e.target.getAttribute("data-index");

        students.splice(index, 1);

        renderTable();
    }
});

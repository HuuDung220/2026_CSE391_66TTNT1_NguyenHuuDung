let students = [];
let filteredStudents = [];

let nameInput = document.getElementById("name");
let scoreInput = document.getElementById("score");
let addBtn = document.getElementById("addBtn");

let searchInput = document.getElementById("search");
let filterRank = document.getElementById("filterRank");

let tbody = document.getElementById("tableBody");
let stats = document.getElementById("stats");

let sortScore = document.getElementById("sortScore");

let sortDirection = 1;

function classify(score){

    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";

}

function addStudent(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === "" || isNaN(score) || score < 0 || score > 10){

        alert("Dữ liệu không hợp lệ");
        return;

    }

    students.push({

        id: Date.now(),
        name: name,
        score: score

    });

    nameInput.value="";
    scoreInput.value="";

    nameInput.focus();

    applyFilters();

}

function applyFilters(){

    let keyword = searchInput.value.toLowerCase();
    let rank = filterRank.value;

    filteredStudents = students.filter(s=>{

        let matchName =
            s.name.toLowerCase().includes(keyword);

        let matchRank =
            rank === "all" || classify(s.score) === rank;

        return matchName && matchRank;

    });

    filteredStudents.sort((a,b)=>
        (a.score - b.score) * sortDirection
    );

    renderTable();

}

function renderTable(){

    tbody.innerHTML="";

    if(filteredStudents.length === 0){

        tbody.innerHTML=
        "<tr><td colspan='5'>Không có kết quả</td></tr>";

        stats.textContent="";
        return;

    }

    let total = 0;

    filteredStudents.forEach((s,index)=>{

        let tr = document.createElement("tr");

        if(s.score < 5){

            tr.classList.add("weak");

        }

        tr.innerHTML=`
        <td>${index+1}</td>
        <td>${s.name}</td>
        <td>${s.score}</td>
        <td>${classify(s.score)}</td>
        <td>
        <button data-id="${s.id}">Xóa</button>
        </td>
        `;

        tbody.appendChild(tr);

        total += s.score;

    });

    let avg = (total / filteredStudents.length).toFixed(2);

    stats.textContent =
        "Tổng sinh viên: " + filteredStudents.length +
        " | Điểm trung bình: " + avg;

}

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keydown",function(e){

    if(e.key === "Enter"){

        addStudent();

    }

});

searchInput.addEventListener("input",applyFilters);

filterRank.addEventListener("change",applyFilters);

sortScore.addEventListener("click",function(){

    sortDirection *= -1;

    sortScore.textContent =
        sortDirection === 1 ?
        "Điểm ▲" :
        "Điểm ▼";

    applyFilters();

});

tbody.addEventListener("click",function(e){

    if(e.target.tagName === "BUTTON"){

        let id = Number(e.target.dataset.id);

        students = students.filter(s=>s.id !== id);

        applyFilters();

    }

});

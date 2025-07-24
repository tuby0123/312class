console.log("자기소개 페이지가 정상적으로 로드되었습니다.");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 64;

const stages = [
  [
    ["W", "W", "W", "W", "W", "W"],
    ["W", "P", " ", " ", "W", "W"],
    ["W", " ", "W", "B", " ", "W"],
    ["W", " ", "B", " ", "W", "W"],
    ["W", "W", " ", " ", "G", "W"],
    ["W", "W", "W", "W", "W", "W"],
  ],
  [
    ["W", "W", "W", "W", "W", "W"],
    ["W", "P", "B", " ", " ", "W"],
    ["W", "W", "B", " ", " ", "W"],
    ["W", "G", " ", "B", "B", "W"],
    ["W", "W", "B", " ", "B", "W"],
    ["W", "W", "W", "W", "W", "W"],
  ],
  [
    ["W", "W", "W", "W", "W", "W"],
    ["W", "P", "B", " ", " ", "W"],
    ["W", " ", "B", " ", "B", "W"],
    ["W", " ", "B", " ", " ", "W"],
    ["W", " ", " ", "B", "G", "W"],
    ["W", "W", "W", "W", "W", "W"],
  ],
];

let currentStageIndex = 0;
let map = JSON.parse(JSON.stringify(stages[currentStageIndex]));

let playerPos = { x: 1, y: 1 };

function findPlayer() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "P") return { x, y };
    }
  }
}

function loadStage(index) {
  if (index >= stages.length) {
    alert("모든 스테이지를 클리어했습니다");
    return;
  }
  currentStageIndex = index;
  map = JSON.parse(JSON.stringify(stages[currentStageIndex]));
  playerPos = findPlayer();
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);

      switch (tile) {
        case "W":
          ctx.fillStyle = "#888";
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
          break;
        case "B":
          ctx.fillStyle = "#d4af37";
          ctx.fillRect(x * tileSize + 8, y * tileSize + 8, tileSize - 16, tileSize - 16);
          break;
        case "P":
          ctx.fillStyle = "#4a90e2";
          ctx.beginPath();
          ctx.arc(
            x * tileSize + tileSize / 2,
            y * tileSize + tileSize / 2,
            tileSize / 2.5,
            0,
            Math.PI * 2
          );
          ctx.fill();
          break;
        case "G":
          ctx.fillStyle = "#4caf50";
          ctx.beginPath();
          ctx.arc(
            x * tileSize + tileSize / 2,
            y * tileSize + tileSize / 2,
            tileSize / 2.5,
            0,
            Math.PI * 2
          );
          ctx.fill();
          break;
      }
    }
  }
}

function movePlayer(dx, dy) {
  const x = playerPos.x;
  const y = playerPos.y;
  const targetX = x + dx;
  const targetY = y + dy;
  const targetTile = map[targetY][targetX];

  if (targetTile === "W") return;

  if (targetTile === "B") {
    const boxTargetX = targetX + dx;
    const boxTargetY = targetY + dy;
    if (map[boxTargetY][boxTargetX] !== " ") return;

    map[boxTargetY][boxTargetX] = "B";
    map[targetY][targetX] = "P";
    map[y][x] = " ";
    playerPos = { x: targetX, y: targetY };
  } else if (targetTile === " " || targetTile === "G") {
    if (targetTile === "G") {
      alert(`🎉 스테이지 ${currentStageIndex + 1} 클리어! 다음 스테이지로 이동합니다.`);
      loadStage(currentStageIndex + 1);
      return;
    }
    map[targetY][targetX] = "P";
    map[y][x] = " ";
    playerPos = { x: targetX, y: targetY };
  }

  draw();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
});

loadStage(0);
const pythonWords = [
  "print()",
  "def",
  "for",
  "while",
  "if",
  "elif",
  "else",
  "import",
  "from",
  "as",
  "return",
  "in",
  "range()",
  "len()",
  "str()",
  "int()",
  "float()",
  "input()",
  "open()",
  "with",
  "try",
  "except",
  "class",
  "self"
];

let currentWord = "";
let score = 0;

function showNewWord() {
  currentWord = pythonWords[Math.floor(Math.random() * pythonWords.length)];
  document.getElementById("python-word").textContent = currentWord;
  document.getElementById("user-input").value = "";
  document.getElementById("typing-result").textContent = "";
}

function checkTyping() {
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput === currentWord) {
    score++;
    document.getElementById("typing-result").textContent = "정답";
  } else {
    document.getElementById("typing-result").textContent = "오답";
  }
  document.getElementById("typing-score").textContent = score;
  showNewWord();
}

window.addEventListener("load", showNewWord);


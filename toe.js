const board = document.getElementById("board");
const status = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (cells[index].textContent !== "" || gameOver) return;

  cells[index].textContent = currentPlayer;
  cells[index].style.color = currentPlayer === "X" ? "#d81b60" : "#1e88e5";

  if (checkWin()) {
    status.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell.textContent !== "")) {
    status.textContent = "🤝 It's a Draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      return true;
    }
  }
  return false;
}

function restartGame() {
  currentPlayer = "X";
  gameOver = false;
  status.textContent = "Player X's turn";
  createBoard();
}

// Initialize the game
createBoard();

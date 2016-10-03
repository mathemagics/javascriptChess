
// MOVE PIECE

// ENPASSANT - maybe with move history?
// CASTLING
// UNDER ATTACK SQs - available king moves
// CHECK & CHECKMATE -
// PAWN PROMOTION

// GAME LOGIC

//  BUGS
//  selecting the same piece.  --  FIXED
//  reset colors gets wonky sometimes. bishops? white rooks? white knight?>
// maybe back row pieces? -- FIXED

//REFACTOR
// Castling code to use a function to move rook


var board = [];
var table;

var checkmate=false;
var turn="white";


var availMoves=[];

var thisPiece;
var pRow;
var pCol;
var sRow;
var sCol;

function movePiece () {

  // checking if castle
  if(thisPiece.constructor.name==="King" && thisPiece.initial){
      // checking which rook to swap
      if(sRow===0 && sCol===6){
        board[0][5]=board[0][7];
        board[0][7]=null;
        table.rows[0].cells[5].innerHTML = board[0][5].code;
        table.rows[0].cells[7].innerHTML ="";
      } else if(sRow===0 && sCol===2) {
        board[0][3]=board[0][0];
        board[0][0]=null;
        table.rows[0].cells[3].innerHTML = board[0][3].code;
        table.rows[0].cells[0].innerHTML ="";
      } else if(sRow===7 && sCol===6) {
        board[7][5]=board[7][7];
        board[7][7]=null;
        table.rows[7].cells[5].innerHTML = board[7][5].code;
        table.rows[7].cells[7].innerHTML ="";
      } else if(sRow===7 && sCol===2) {
        board[7][3]=board[7][0];
        board[7][0]=null;
        table.rows[7].cells[3].innerHTML = board[7][3].code;
        table.rows[7].cells[0].innerHTML ="";
      }
  }
  // setting real board
  board[sRow][sCol]=board[pRow][pCol];
  board[pRow][pCol]=null;
  //setting html board
  table.rows[sRow].cells[sCol].innerHTML = thisPiece.code;
  table.rows[pRow].cells[pCol].innerHTML ="";

}
function checkCheck() {
   var movesArr = board[sRow][sCol].movement(sRow,sCol);

   for(var i=0,n=movesArr.length;i<n;i++) {
     atkd=board[movesArr[i][0]][movesArr[i][1]];
     if(atkd && atkd instanceof King && atkd.color!=thisPiece.color){
       console.log("CHECK");
         return true;
     }
   }
}


// check piece that moved and any teammate bishop, rook, queen for revealed checks


function checkCheckmate() {
// check if king has any availMoves by removing under attack squares

}

function startBoard() {

  for ( var i = 0; i < 8; i++ ) {
      board[i] = [];
  }

  for (var i=0;i<8;i++) {
      board[1][i]=new Pawn("white");
      board[6][i]= new Pawn("black");
  }
  board[0][0]=new Rook("white");
  board[0][1]=new Knight("white");
  board[0][2]=new Bishop("white");
  board[0][3]=new Queen("white");
  board[0][4]=new King("white");
  board[0][5]=new Bishop("white");
  board[0][6]=new Knight("white");
  board[0][7]=new Rook("white");
  board[7][0]=new Rook("black");
  board[7][1]=new Knight("black");
  board[7][2]=new Bishop("black");
  board[7][3]=new Queen("black");
  board[7][4]=new King("black");
  board[7][5]=new Bishop("black");
  board[7][6]=new Knight("black");
  board[7][7]=new Rook("black");

  return board;

}

function drawBoard() {
  table = document.getElementById("chessboard");
  if (table != null) {
      for (var i = 0; i < table.rows.length; i++) {
          for (var j = 0; j < table.rows[i].cells.length; j++)
          if (board[i][j]) {
            unicode=board[i][j].code;
          table.rows[i].cells[j].innerHTML += unicode;
        }
      }
  }

}

function setClick() {
    table = document.getElementById("chessboard");

    if (table != null) {
        for (var i = 0; i < table.rows.length; i++) {
            for (var j = 0; j < table.rows[i].cells.length; j++)
            table.rows[i].cells[j].onclick = function () {
                getMoves(this);
            }
        }
    }
}

function getMoves(tableCell) {

  //setting selected piece
  sRow=tableCell.parentNode.rowIndex;
  sCol=tableCell.cellIndex;

  //  if clicked square is not in availMoves, set new availMoves
  if (!isCoordInArr([sRow,sCol],availMoves)) {

    if(pRow || pRow===0){
      resetColors(pRow, pCol);
    }
    // choosing your own piece
    if((thisPiece=board[sRow][sCol])&&thisPiece.color===turn) {
      setColors(sRow,sCol);
    }
    //setting previous position
    pRow=sRow;
    pCol=sCol;

  } else {

    resetColors(pRow,pCol);
    movePiece(sRow,sCol);
    if(checkCheck()){
      console.log("CHECK!");
    }
    reset();

  }
}

// set the bg color of possible attacks from the piece at row,col
function setColors(row,col) {

  if (board[row][col]){
  table.rows[row].cells[col].style.background="green"
  availMoves=thisPiece.movement(row,col)
    for(var i=0, n=availMoves.length;i<n;i++) {
      table.rows[availMoves[i][0]].cells[availMoves[i][1]].style.background="#00cc99"
    }
  }
}
// resets ths bg color of the previous selection
function resetColors(resetRow,resetCol) {
  console.log("resetting: "+ resetRow + ", " + resetCol);
  var resetCell=table.rows[resetRow].cells[resetCol];
  resetCell.style.background=resetCell.className==="whitesq"? "#99ccff": "#0099ff"
  for(var i=0, n=availMoves.length;i<n;i++) {
    resetCell=table.rows[availMoves[i][0]].cells[availMoves[i][1]];
    resetCell.style.background=resetCell.className==="whitesq"? "#99ccff": "#0099ff"
  }
}

function isCoordInArr(coord,arr) {
      for (var i = 0, n=arr.length; i < n ; i++) {
          if (arr[i][0] == coord[0] && arr[i][1] == coord[1]) {
              return true;
          }
      }
      return false;

}

function reset() {
availMoves=[];
thisPiece=null;
turn = turn=="white" ? "black" : "white"
}

startBoard();
drawBoard();
setClick();

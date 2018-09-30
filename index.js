'use strict';

// Enter your js code Here

var SQUARE_BLANK = 0;
var SQUARE_RED = 1;
var SQUARE_BLUE = 2;

var columns;
var rows;

var numInARow;  // number of checkers in a row needed to win
var boardSize;
var SQUARE_SIZE = 50;  // pixel size of individual squares
var squares;          // use squares for formatting of square only, not data storage
var board = document.getElementById("board");  // only 1 board, use ID

var squareData = new Array;   // data structure to hold square data - Red, Blue, Blank

var PLAYER1 = 1;
var PLAYER2 = 2;
var currentTurn = PLAYER1;

var arrayOfWinners = new Array;

// ------ Start Button Code -----------------------------------------------

var startGameButton = document.getElementById("startGameButton");

startGameButton.addEventListener('click', function(e)
{
    currentTurn = PLAYER1;
    columns = Number(document.getElementById("columnsInputBox").value);
    rows = Number(document.getElementById("rowsInputBox").value);
    numInARow = Number(document.getElementById("numInARowInputBox").value);

    boardSize = columns * (rows+1);

    // reset data if button pressed again
    squareData = new Array;
    arrayOfWinners = new Array;

    // console.log("Columns is " + columns + "  Rows is " + rows + "  Boardsize is " + boardSize);

    createBoard();

    // change the message
    document.getElementById("message1").innerHTML = "Game Started.";

});


// -----------------------------------------------------------------------
// simple reusable code to make board

function createBoard()
{
    // get the board
    board.innerHTML = "";

    //  set the width and height styles to the number of pixels
    board.style.width = (columns*SQUARE_SIZE) + "px";
    board.style.height = ((rows+1)*SQUARE_SIZE) + "px";

    var i;
    // Create the squares
    for (i=0;i<boardSize;i++)
    {
      // console.log("i is " + i);
      board.innerHTML = board.innerHTML + '<div class="square" id ="' + i + '"></div>';

      squareData.push(SQUARE_BLANK);
    }

    // hard coding data tests
    // squareData[48] = SQUARE_RED;
    // squareData[37] = SQUARE_BLUE;
    // squareData[44] = SQUARE_BLUE;

    squares = document.querySelectorAll('.square');

    for (i=0;i<columns;i++)
    {
      squares[i].style.backgroundColor = "green";
    }

}

// --------------------------------------

board.addEventListener('click', function(e)
{
  if (e.target.id > (columns-1))
   return;

  console.log("Move Started");
  var foundSpot = false;
  var i = 0;

  while ((foundSpot == false) && (i < rows))
  {
    // console.log("You clicked on square : " + e.target.id + "  i = " + i + "  rows is " + rows + "  columns is " + columns);

    var tempCellNum = ((rows*columns)-(i*columns)) + Number(e.target.id);

    // console.log("tempCellNum is " + tempCellNum);

    if (squareData[tempCellNum] == SQUARE_BLANK)
    {
      // console.log("Cell is blank");
      foundSpot = true;
      // put down red or blue checker

      squareData[tempCellNum] = currentTurn;

      if (currentTurn == PLAYER1)
      {
        squares[tempCellNum].style.backgroundColor = "red";
      }
      else {
        squares[tempCellNum].style.backgroundColor = "blue";
      }

    }
    else
    {
      i++;
    }
      // if ((squares[(rows*columns)].style.backgroundColor == "red") !! (squares[(rows*columns)].style.backgroundColor == "red"))
  }

  if (foundSpot == true)
  {
    // console.log("Found a spot! It is cell " + tempCellNum);

    var check = checkForWinner(tempCellNum);

    if (check == true)
    {
      var i;
      for (i=0; i<arrayOfWinners.length; i++)
        squares[arrayOfWinners[i]].innerHTML = "X";

      alert("Player " + currentTurn + " is the winner!");
    }

    if (currentTurn == PLAYER1)
      currentTurn = PLAYER2;
    else
      currentTurn = PLAYER1;
  }

}); // end function board listener

// -------------------------------------------

function checkForWinner(cellNum)
{
    if (checkRow(cellNum) == true)
      return true;

    if (checkCol(cellNum) == true)
       return true;

    if (checkLeftDiag(cellNum) == true)
      return true;

    if (checkRightDiag(cellNum) == true)
       return true;

    return false;
}

// --------------------------------------------

function checkRow(cellNum)
{
  var keepChecking = true;
  var foundWinner = false;
  var i = 0;
  var j = 0;
  var tempNumInARow = 1;  // always have yourself as 1

  var currCol = Number(cellNum % columns);
  var currRow = Number(Math.trunc(cellNum / columns));
  var tempCurr = cellNum;

  arrayOfWinners = [];
  arrayOfWinners.push(cellNum);

  // check to the right first

  console.log("cellNum is " + cellNum + "  currCol is " + currCol + "  currRow is " + currRow);

  while (keepChecking == true)
  {
      if (currCol == (columns - 1))
      {
        console.log("Right col, stop looking");
        keepChecking = false;
      }
      else
      {
          tempCurr++;
          currCol++;

          console.log("tempCurr is " + tempCurr + "  currCol is " + currCol + "  currRow is " + currRow);

          if (squareData[tempCurr] == currentTurn)
          {
            console.log("Found a match to the right");

            arrayOfWinners.push(tempCurr);
            tempNumInARow++;
            if (tempNumInARow == numInARow)
            {
              console.log("Found a winnnnnner");

              foundWinner = true;
              keepChecking = false;
            }   // end if found num in a row

          }   // found if a match
          else {  // no match
            keepChecking = false;
          }

      } // end else not in rightmost col or bottom row

  } // end down right check while

  if (foundWinner == true)
    return foundWinner;

  console.log("Finished looking right, no winner -----------------");

  // If no winner yet, keep checking left, reset back to cell num passed in

  keepChecking = true;
  currCol = Number(cellNum % columns);
  currRow = Number(Math.trunc(cellNum / columns));
  tempCurr = cellNum;

  while (keepChecking == true)
  {
      if (currCol == 0)
      {
        console.log("Left col, stop looking");
        keepChecking = false;
      }
      else
      {
          tempCurr--;
          currCol--;

          console.log("tempCurr is " + tempCurr + "  currCol is " + currCol + "  currRow is " + currRow);

          if (squareData[tempCurr] == currentTurn)
          {
            console.log("Found a match down to the left");

            arrayOfWinners.push(tempCurr);
            tempNumInARow++;
            if (tempNumInARow == numInARow)
            {
              console.log("Found a winnnnnner");

              foundWinner = true;
              keepChecking = false;
            }   // end if found num in a row

          }   // found if a match
          else {  // no match
            keepChecking = false;
          }

      } // end else not in leftmost col or top row

  } // end up left check while

  return foundWinner;

  // old checkRow code
    //
    // var outerLoop = false;
    // var i = 0;
    //
    // var innerLoop = true;
    // var j = 0;
    //
    // var currRow = Number(Math.trunc(cellNum / columns));
    //
    // // outer loop is the starting point for each check - start at left and work to the right
    // while ((outerLoop == false) && (i<(columns - numInARow + 1)))
    // {
    //   // now do inner loop - Checking numInARow checkers, assume a winner, flip to false if fail
    //   while ((innerLoop == true) && (j < numInARow))
    //   {
    //       console.log("Checking square " + Number((currRow*columns)+j+i) + "  outer is " + i + "  inner is " + j);
    //
    //       if (squareData[Number((currRow*columns)+j+i)] != currentTurn)
    //         innerLoop = false;
    //       else
    //       {
    //         j++;
    //       }
    //   }
    //
    //   console.log("----------------");
    //   if (innerLoop == false)
    //   {
    //     i++;
    //     innerLoop = true;
    //     j = 0;
    //   }
    //   else
    //   {
    //     outerLoop = true;
    //   }
    //
    // } // end outer while loop
    //
    // return outerLoop;
}

// ----------------------

function checkCol(cellNum)
{
    var keepChecking = true;
    var foundWinner = false;
    var i = 0;
    var j = 0;

    var tempNumInARow = 1;  // always have yourself as 1
    var currCol = Number(cellNum % columns);
    var currRow = Number(Math.trunc(cellNum / columns));
    var tempCurr = cellNum;

    arrayOfWinners = [];
    arrayOfWinners.push(cellNum);

    while (keepChecking == true)
      {
          if (currRow == rows)
          {
            console.log("Bottom row, stop looking");
            keepChecking = false;
          }
          else
          {
              tempCurr = tempCurr + columns;
              currCol = Number(tempCurr % columns);
              currRow = Number(Math.trunc(tempCurr / columns));

              console.log("tempCurr is " + tempCurr + "  currCol is " + currCol + "  currRow is " + currRow);

              if (squareData[tempCurr] == currentTurn)
              {
                console.log("Found a match down one");

                arrayOfWinners.push(tempCurr);
                tempNumInARow++;
                if (tempNumInARow == numInARow)
                {
                  console.log("Found a winnnnnner");

                  foundWinner = true;
                  keepChecking = false;
                }   // end if found num in a row

              }   // found if a match
              else {  // no match
                keepChecking = false;
              }

          } // end else not inbottom row

      } // end down check while

    return foundWinner;

} // end checkCol

// --------------------------------------------

function checkLeftDiag(cellNum)
{
  var keepChecking = true;
  var foundWinner = false;
  var i = 0;
  var j = 0;
  var tempNumInARow = 1;  // always have yourself as 1

  var currCol = Number(cellNum % columns);
  var currRow = Number(Math.trunc(cellNum / columns));
  var tempCurr = cellNum;

  arrayOfWinners = [];
  arrayOfWinners.push(cellNum);

  // check down to the right first

  console.log("cellNum is " + cellNum + "  currCol is " + currCol + "  currRow is " + currRow);

  while (keepChecking == true)
  {
      if ((currCol == (columns - 1)) || (currRow == rows))
      {

        console.log("Right col or bottom row, stop looking");
        keepChecking = false;
      }
      else
      {
          tempCurr = tempCurr + (columns+1);
          currCol = Number(tempCurr % columns);
          currRow = Number(Math.trunc(tempCurr / columns));

          console.log("tempCurr is " + tempCurr + "  currCol is " + currCol + "  currRow is " + currRow);

          if (squareData[tempCurr] == currentTurn)
          {
            console.log("Found a match down to the right");

            arrayOfWinners.push(tempCurr);
            tempNumInARow++;
            if (tempNumInARow == numInARow)
            {
              console.log("Found a winnnnnner");

              foundWinner = true;
              keepChecking = false;
            }   // end if found num in a row

          }   // found if a match
          else {  // no match
            keepChecking = false;
          }

      } // end else not in rightmost col or bottom row

  } // end down right check while

  if (foundWinner == true)
    return foundWinner;

  console.log("Finished looking down right, no winner -----------------");

  // If no winner yet, keep checking up and left, reset back to cell num passed in

  keepChecking = true;
  currCol = Number(cellNum % columns);
  currRow = Number(Math.trunc(cellNum / columns));
  tempCurr = cellNum;

  while (keepChecking == true)
  {
      if ((currCol == 0) || (currRow == 1))   // remember row 0 is the "buttons"
      {
        console.log("Left col or top row, stop looking");
        keepChecking = false;
      }
      else
      {
          tempCurr = tempCurr - (columns+1);
          currCol = Number(tempCurr % columns);
          currRow = Number(Math.trunc(tempCurr / columns));

          console.log("tempCurr is " + tempCurr + "  currCol is " + currCol + "  currRow is " + currRow);

          if (squareData[tempCurr] == currentTurn)
          {
            console.log("Found a match down to the right");

            arrayOfWinners.push(tempCurr);
            tempNumInARow++;
            if (tempNumInARow == numInARow)
            {
              console.log("Found a winnnnnner");

              foundWinner = true;
              keepChecking = false;
            }   // end if found num in a row

          }   // found if a match
          else {  // no match
            keepChecking = false;
          }

      } // end else not in leftmost col or top row

  } // end up left check while

  return foundWinner;

} // end function

// ---------------------------------------------------------------

function checkRightDiag(cellNum)
{
  var keepChecking = true;
  var foundWinner = false;
  var tempNumInARow = 1;  // always have yourself as 1

  var currCol = Number(cellNum % columns);
  var currRow = Number(Math.trunc(cellNum / columns));
  var tempCurr = cellNum;

  arrayOfWinners = [];
  arrayOfWinners.push(cellNum);

  // check down to the left first

  console.log("cellNum is " + cellNum + "  currCol is " + currCol + "  currRow is " + currRow);

  while (keepChecking == true)
  {
      if ((currCol == 0) || (currRow == rows))
      {

        console.log("Left col or bottom row, stop looking");
        keepChecking = false;
      }
      else
      {
          tempCurr = tempCurr + (columns-1);
          currCol = Number(tempCurr % columns);
          currRow = Number(Math.trunc(tempCurr / columns));

          console.log("tempCurr is " + tempCurr + "  currCol is " + currCol + "  currRow is " + currRow);

          if (squareData[tempCurr] == currentTurn)
          {
            console.log("Found a match down to the left");

            arrayOfWinners.push(tempCurr);
            tempNumInARow++;
            if (tempNumInARow == numInARow)
            {
              console.log("Found a winnnnnner");

              foundWinner = true;
              keepChecking = false;
            }   // end if found num in a row

          }   // found if a match
          else {  // no match
            keepChecking = false;
          }

      } // end else not in rightmost col or bottom row

  } // end down right check while

  if (foundWinner == true)
    return foundWinner;

  console.log("Finished looking down left, no winner -----------------");

  // If no winner yet, keep checking up and left, reset back to cell num passed in

  keepChecking = true;
  currCol = Number(cellNum % columns);
  currRow = Number(Math.trunc(cellNum / columns));
  tempCurr = cellNum;

  while (keepChecking == true)
  {
      if ((currCol == (columns-1)) || (currRow == 1))   // remember row 0 is the "buttons"
      {
        console.log("Right col or top row, stop looking");
        keepChecking = false;
      }
      else
      {
          tempCurr = (tempCurr - columns) + 1;
          currCol = Number(tempCurr % columns);
          currRow = Number(Math.trunc(tempCurr / columns));

          console.log("tempCurr is " + tempCurr + "  currCol is " + currCol + "  currRow is " + currRow);

          if (squareData[tempCurr] == currentTurn)
          {
            console.log("Found a match up to the right");

            arrayOfWinners.push(tempCurr);
            tempNumInARow++;
            if (tempNumInARow == numInARow)
            {
              console.log("Found a winnnnnner");

              foundWinner = true;
              keepChecking = false;
            }   // end if found num in a row

          }   // found if a match
          else {  // no match
            keepChecking = false;
          }

      } // end else not in rightmost col or top row

  } // end up right check while

  return foundWinner;
}


// --------------------------------------------
//
//
// function oldCheckLeftDiag(cellNum)
// {
//     var outerLoop = false;
//     var i = 0;
//
//     var innerLoop = true;
//     var j = 0;
//
//     var currCol = Number(cellNum % columns);
//     var currRow = Number(Math.trunc(cellNum / columns));
//     var startingCell = cellNum;
//     var nextSquareCheck;
//
//     while ((currCol != 0) && (currRow != 1))
//     {
//       startingCell = startingCell - columns - 1;
//       currCol--;
//       currRow--;
//     }
//
//     console.log("Starting cell is " + startingCell);
//
//     // outer loop is the starting point for each check, start at top left and work down right
//     while ((outerLoop == false) && (???))
//     {
//       // now do inner loop - Checking numInARow checkers, assume a winner, flip to false if fail
//       while ((innerLoop == true) && (j < numInARow))
//       {
//           nextSquareCheck = startingCell + columns + 1;
//           var nextCol = Number(nextSquareCheck % columns);
//           var nextRow = Number(Math.trunc(nextSquareCheck / columns));
//
//           // only check if you haven't hit wall
//           if ((nextCol == currCol+1) && (nextRow == currRow+1))
//           {
//               // console.log("Checking square " + Number((columns*rows)+currCol-(j*columns)-(i*columns)) + "  outer is " + i + "  inner is " + j);
//               if (squareData[startingCell] != currentTurn)
//                 innerLoop = false;
//               else
//               {
//                 j++;
//                 startingCell = nextSquareCheck;
//                 currCol = nextCol;
//                 currRow = nextRow;
//               }
//           }
//           else
//           {
//             innerLoop = false;
//           }
//
//       } // end inner while loop
//
//       console.log("----------------");
//       if (innerLoop == false)
//       {
//         i++;
//         innerLoop = true;
//         j = 0;
//       }
//       else
//       {
//         outerLoop = true;
//       }
//
//     } // end outer while loop
//
//     return outerLoop;
//
// } // end checkCol

/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // initialize board object
  var board = new Board({n:n});

  var addPiece = function(row){
    //if we are trying to add more pieces then there are rows we know we have a solution
    if(row >= n){ return true; }
    // Loop through the first row
    for(var col = 0; col < n; col++){
      // Check if placing a piece at the current index is valid
      board.togglePiece(row,col);
      if(!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()){
        // If it is: place the piece, move on to the next row
        if(addPiece(row+1)){
          // Next row returns true? Return true
          return true;
        } else{
          // Next row returns false? Continue to the next column in this loop
          board.togglePiece(row,col);
          continue;
        } 
      }else{
        board.togglePiece(row,col);
      }
    }
    
    return false;
  }

  addPiece(0);
  // Retrieve solution from board state and return it
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // initialize board object
  var board = new Board({n:n});

  var solutionCount = 0;

  /*var addPiece = function(row){
    //if we are trying to add more pieces then there are rows we know we have a solution
    if(row >= n){ 
      solutionCount++;
      return true; 
    }
    // Loop through the first row
    for(var col = 0; col < n; col++){
      // Check if placing a piece at the current index is valid
      board.togglePiece(row,col);
      if(!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()){
        // If it is: place the piece, move on to the next row
        addPiece(row+1); 
      }
      board.togglePiece(row,col);
    }
  }*/

  // For purposes of making our tests not take forever
  var factSol = 1;
  for (var i = 2; i <= n; i++) {
    factSol = factSol*i;
  }
  return factSol;

  addPiece(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // initialize board object
  var board = new Board({n:n});

  var addPiece = function(row){
    //if we are trying to add more pieces then there are rows we know we have a solution
    if(row >= n){ return true; }
    // Loop through the first row
    for(var col = 0; col < n; col++){
      // Check if placing a piece at the current index is valid
      board.togglePiece(row,col);
      if(!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !board.hasAnyMinorDiagonalConflicts() && !board.hasAnyMajorDiagonalConflicts()){
        // If it is: place the piece, move on to the next row
        if(addPiece(row+1)){
          // Next row returns true? Return true
          return true;
        } else{
          // Next row returns false? Continue to the next column in this loop
          board.togglePiece(row,col);
          continue;
        } 
      }else{
        board.togglePiece(row,col);
      }
    }
    
    return false;
  }

  addPiece(0);
  // Retrieve solution from board state and return it
  var solution = board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // initialize board object
  var board = new Board({n:n});

  var solutions = [];

  var addPiece = function(row){
    //if we are trying to add more pieces then there are rows we know we have a solution
    if(row >= n){ 
      solutions.push(board.rows());
      return true; 
    }
    // Loop through the first row
    for(var col = 0; col < n; col++){
      // Check if placing a piece at the current index is valid
      board.togglePiece(row,col);
      if(!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !board.hasAnyMinorDiagonalConflicts() && !board.hasAnyMajorDiagonalConflicts()){
        // If it is: place the piece, move on to the next row
        addPiece(row+1); 
      }
      board.togglePiece(row,col);
    }
  }

  addPiece(0);
  var solutionCount = solutions.length; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.bitwiseCountNQueens = function(n){

  // For counting num solutions
  var solutions = 0;

  // Create a number with all 1s, representing the 'done' state of cols
  var done = Math.pow(2,n)-1;

  var addPiece = function(ld, cols, rd) {
    // If all columns are filled, we have reached successful soln
    if (cols === done) {
      solutions++;
      return;
    }

    // Find all positions we can place a queen into
    var poss = ~(ld | cols | rd);

    // While there's anywhere we can add a queen (otherwise will exit)
    while (poss & done) {
      // Pick a position to place the queen into (from right)
      var bit = poss & -poss;

      // Remove that position as an 'empty' space in poss
      poss = poss - bit;

      addPiece((ld|bit)>>1, (cols|bit),(rd|bit)<<1);
    }
  }

  addPiece(0,0,0);
  return solutions;
}

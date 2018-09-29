module.exports = function solveSudoku(matrix) {
  let countCells = 0; 
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9]; 
        countCells++;
      }
    }
  }

  //search in column
  let searchCol = (m, j) => {
    for (let i = 0; i < 9; i++) {
      if (!(matrix[i][j] instanceof Array)) {
        if (matrix[m][j].indexOf(matrix[i][j]) !== -1) 
        matrix[m][j].splice(matrix[m][j].indexOf(matrix[i][j]), 1);
      }
    }
  }

  //search in row
  let searchRow = (i, n) => {
    for (let j = 0; j < 9; j++) {
      if (!(matrix[i][j] instanceof Array)) {
        if (matrix[i][n].indexOf(matrix[i][j]) !== -1) 
        matrix[i][n].splice(matrix[i][n].indexOf(matrix[i][j]), 1);
      }
    }
  }

  //search in block
  let searchBlock = (i, j) => {
    let start_i = 0,
        start_j = 0,
        end_i = 0,
        end_j = 0;
    if (i < 3 && j < 3) { //1
      start_i = 0;
      start_j = 0;
      end_i = 2;
      end_j = 2;
    } else if (i < 3 && (j > 2 && j < 6)) { //2
      start_i = 0;
      start_j = 3;
      end_i = 2;
      end_j = 5;
    } else if (i < 3 && (j > 5 && j < 9)) { //3
      start_i = 0;
      start_j = 6;
      end_i = 2;
      end_j = 8;
    } else if ((i > 2 && i < 6) && (j < 3)) { //4
      start_i = 3;
      start_j = 0;
      end_i = 5;
      end_j = 2;
    } else if ((i > 2 && i < 6) && (j > 2 && j < 6)) { //5
      start_i = 3;
      start_j = 3;
      end_i = 5;
      end_j = 5;
    } else if ((i > 2 && i < 6) && (j > 5 && j < 9)) { //6
      start_i = 3;
      start_j = 6;
      end_i = 5;
      end_j = 8;
    } else if ((i > 5 && i < 9) && j < 3) { //7
      start_i = 6;
      start_j = 0;
      end_i = 8;
      end_j = 2;
    } else if ((i > 5 && i < 9) && (j > 2 && j < 6)) { //8
      start_i = 6;
      start_j = 3;
      end_i = 8;
      end_j = 5;
    } else if ((i > 5 && i < 9) && (j > 5 && j < 9)) { //9
      start_i = 6;
      start_j = 6;
      end_i = 8;
      end_j = 8;
    }

    for (let m = start_i; m <= end_i; m++) {
      for (let n = start_j; n <= end_j; n++) {
        if (!(matrix[m][n] instanceof Array)) {
          if (matrix[i][j].indexOf(matrix[m][n]) !== -1) matrix[i][j].splice(matrix[i][j].indexOf(matrix[m][n]), 1);
        }
      }
    }
  }

  //search pair in row
  let pairSearchRow = (i, j) => {
    let indexArr = [j],
        indexArrTr = [j];
    for (let k = j + 1; k < 9; k++) {
      if (matrix[i][k] instanceof Array) {
        if (JSON.stringify(matrix[i][j]) === JSON.stringify(matrix[i][k]))
          indexArr[indexArr.length] = k;
        if (matrix[i][k].length === 2) indexArrTr[indexArrTr.length] = k;
      }
    }
    if (indexArr.length > 1) {
      for (let k = 0; k < 9; k++) {
        if ((matrix[i][k] instanceof Array) && 
          indexArr.indexOf(k) === -1) {
          if (matrix[i][k].indexOf(matrix[i][j][0]) !== -1) 
            matrix[i][k].splice(matrix[i][k].indexOf(matrix[i][j][0]), 1);
          if (matrix[i][k].indexOf(matrix[i][j][1]) !== -1) 
            matrix[i][k].splice(matrix[i][k].indexOf(matrix[i][j][1]), 1);  
        }
      }
    } 
    if (indexArrTr.length === 3) {
      if ((JSON.stringify(matrix[i][indexArrTr[0]]) !== JSON.stringify(matrix[i][indexArrTr[1]])) &&
      (JSON.stringify(matrix[i][indexArrTr[0]]) !== JSON.stringify(matrix[i][indexArrTr[2]])) &&
      (JSON.stringify(matrix[i][indexArrTr[1]]) !== JSON.stringify(matrix[i][indexArrTr[2]]))) {
        let tripleArr = [];
        matrix[i][indexArrTr[0]].concat(matrix[i][indexArrTr[1]], matrix[i][indexArrTr[2]]).forEach(item => {
          if (tripleArr.indexOf(item) == -1) tripleArr.push(item);
        });
        if (tripleArr.length === 3) {
          for (let m = 0; m < 9; m++) {
            if ((matrix[i][m] instanceof Array) &&
              indexArrTr.indexOf(m) === -1) {
              for (let n = 0; n < 3; n++) {
                if (matrix[i][m].indexOf(tripleArr[n]) !== -1) 
                  matrix[i][m].splice(matrix[i][m].indexOf(tripleArr[n]), 1);
              }
            }
          }
        }
      }    
    }
  }

  //search pair in column
  let pairSearchCol = (i, j) => {
    let indexArr = [i],
      indexArrTr = [i];
    for (let k = i + 1; k < 9; k++) {
      if (matrix[k][j] instanceof Array) {
        if (JSON.stringify(matrix[i][j]) === JSON.stringify(matrix[k][j])) {
          indexArr[indexArr.length] = k;
        }
        if (matrix[k][j].length === 2) indexArrTr[indexArrTr.length] = k;
      }
    }
    if (indexArr.length > 1) {
      for (let k = 0; k < 9; k++) {
        if ((matrix[k][j] instanceof Array) &&
          indexArr.indexOf(k) === -1) {
          if (matrix[k][j].indexOf(matrix[i][j][0]) !== -1) 
            matrix[k][j].splice(matrix[k][j].indexOf(matrix[i][j][0]), 1);
          if (matrix[k][j].indexOf(matrix[i][j][1]) !== -1) 
            matrix[k][j].splice(matrix[k][j].indexOf(matrix[i][j][1]), 1);  
        }
      }
    }
    if (indexArrTr.length === 3) {
      if ((JSON.stringify(matrix[indexArrTr[0]][j]) !== JSON.stringify(matrix[indexArrTr[1]][j])) &&
      (JSON.stringify(matrix[indexArrTr[0]][j]) !== JSON.stringify(matrix[indexArrTr[2]][j])) &&
      (JSON.stringify(matrix[indexArrTr[1]][j]) !== JSON.stringify(matrix[indexArrTr[2]][j]))) {
        let tripleArr = [];
        matrix[indexArrTr[0]][j].concat(matrix[indexArrTr[1]][j], matrix[indexArrTr[2]][j]).forEach(item => {
          if (tripleArr.indexOf(item) == -1) tripleArr.push(item);
        });
        if (tripleArr.length === 3) {
          for (let m = 0; m < 9; m++) {
            if ((matrix[m][j] instanceof Array) &&
              indexArrTr.indexOf(m) === -1) {
              for (let n = 0; n < 3; n++) {
                if (matrix[m][j].indexOf(tripleArr[n]) !== -1) 
                  matrix[m][j].splice(matrix[m][j].indexOf(tripleArr[n]), 1);
              }
            }
          }
        }
      }    
    }
  }

  //search pair in block
  let pairSearchBlock = (i, j) => {
    let indexArrRow = [i],
        indexArrCol = [j];
    let start_i = 0,
        start_j = 0,
        end_i = 0,
        end_j = 0;
    if (i < 3 && j < 3) { //1
      start_i = 0;
      start_j = 0;
      end_i = 2;
      end_j = 2;
    } else if (i < 3 && (j > 2 && j < 6)) { //2
      start_i = 0;
      start_j = 3;
      end_i = 2;
      end_j = 5;
    } else if (i < 3 && (j > 5 && j < 9)) { //3
      start_i = 0;
      start_j = 6;
      end_i = 2;
      end_j = 8;
    } else if ((i > 2 && i < 6) && (j < 3)) { //4
      start_i = 3;
      start_j = 0;
      end_i = 5;
      end_j = 2;
    } else if ((i > 2 && i < 6) && (j > 2 && j < 6)) { //5
      start_i = 3;
      start_j = 3;
      end_i = 5;
      end_j = 5;
    } else if ((i > 2 && i < 6) && (j > 5 && j < 9)) { //6
      start_i = 3;
      start_j = 6;
      end_i = 5;
      end_j = 8;
    } else if ((i > 5 && i < 9) && j < 3) { //7
      start_i = 6;
      start_j = 0;
      end_i = 8;
      end_j = 2;
    } else if ((i > 5 && i < 9) && (j > 2 && j < 6)) { //8
      start_i = 6;
      start_j = 3;
      end_i = 8;
      end_j = 5;
    } else if ((i > 5 && i < 9) && (j > 5 && j < 9)) { //9
      start_i = 6;
      start_j = 6;
      end_i = 8;
      end_j = 8;
    }
    for (let m = i; m <= end_i; m++) {
      for (let n = j + 1; n <= end_j; n++) {
        if (matrix[m][n] instanceof Array) {
          if (JSON.stringify(matrix[i][j]) === JSON.stringify(matrix[m][n])) {
            indexArrRow[indexArrRow.length] = m;
            indexArrRow[indexArrRow.length] = n;
          }
        }
      }
    }
    for (let m = start_i; m <= end_i; m++) {
      for (let n = start_j; n <= end_j; n++) {
        if ((matrix[m][n] instanceof Array) && 
        indexArrRow.length > 1 &&
        indexArrCol.length > 1 &&
        (indexArrRow.indexOf(m) === -1 || 
        indexArrCol[indexArrRow.indexOf(m)] !== n)) {
          if (matrix[m][n].indexOf(matrix[i][j][0]) !== -1) 
            matrix[m][n].splice(matrix[m][n].indexOf(matrix[i][j][0]), 1);
          if (matrix[m][n].indexOf(matrix[i][j][1]) !== -1) 
            matrix[m][n].splice(matrix[m][n].indexOf(matrix[i][j][1]), 1);
        }
      }
    }
  }

  //search threeSome in row
  let threeSomeRow = (i, j) => {
    let indexArr = [], 
        tripleArr = [];
    for (let k = 0; k < 9; k++) {
      if (matrix[i][k] instanceof Array) {
        if (matrix[i][k].length == 2) {
          indexArr[indexArr.length] = k;
        }
      }
    }
    if (indexArr.length == 2) {
      if (JSON.stringify(matrix[i][indexArr[0]]) !== JSON.stringify(matrix[i][indexArr[1]])) {
        matrix[i][j].concat(matrix[i][indexArr[0]], matrix[i][indexArr[1]]).forEach(item => {
          if (tripleArr.indexOf(item) == -1) tripleArr.push(item);
        });
      }
    }
    if (tripleArr.length === 3) {
      for (let m = 0; m < 9; m++) {
        if ((matrix[i][m] instanceof Array) &&
        indexArr.indexOf(m) === -1 &&
        m !== j) {
          for (let n = 0; n < 3; n++) {
            if (matrix[i][m].indexOf(tripleArr[n]) !== -1) 
              matrix[i][m].splice(matrix[i][m].indexOf(tripleArr[n]), 1);
          }
        }
      }
    }
  }

  //search threeSome in column
  let threeSomeCol = (i, j) => {
    let indexArr = [], 
        tripleArr = [];
    for (let k = 0; k < 9; k++) {
      if (matrix[k][j] instanceof Array) {
        if (matrix[k][j].length == 2) {
          indexArr[indexArr.length] = k;
        }
      }
    }
    if (indexArr.length == 2) {
      if (JSON.stringify(matrix[indexArr[0]][j]) !== JSON.stringify(matrix[indexArr[1]][j])) {
        matrix[i][j].concat(matrix[indexArr[0]][j], matrix[indexArr[1]][j]).forEach(item => {
            if (tripleArr.indexOf(item) == -1) tripleArr.push(item);
        });
      }
    }
    if (tripleArr.length === 3) {
      for (let m = 0; m < 9; m++) {
        if ((matrix[m][j] instanceof Array) &&
        indexArr.indexOf(m) === -1 &&
        m !== i) {
          for (let n = 0; n < 3; n++) {
            if (matrix[m][j].indexOf(tripleArr[n]) !== -1) 
              matrix[m][j].splice(matrix[m][j].indexOf(tripleArr[n]), 1);
          }
        }
      }
    }
  }

  for (let count = 0; count < countCells; count++) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] instanceof Array) {
          searchRow(i, j);
          searchCol(i, j);
          searchBlock(i, j);
          if (matrix[i][j].length === 1) matrix[i][j] = matrix[i][j][0];
          if (matrix[i][j].length === 2) {
            pairSearchRow(i, j);
            pairSearchCol(i, j);
            pairSearchBlock(i, j);
          }
          if (matrix[i][j].length === 3) {
            threeSomeRow(i, j);
            threeSomeCol(i, j);
          }
        }
      }
    }
  }

  return matrix;
}

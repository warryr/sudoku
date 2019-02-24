module.exports = function solveSudoku(matrix) {
    const temp = new Array(9);
    for (let i = 0; i < 9; ++i) {
        temp[i] = new Array(9);
    }

    fillTemp(matrix, temp);
    solve(matrix, temp, i = 0, j = 0);
    return matrix;

    function solve(A, B, i, j){
        if (isGivenCondition(A, i, j)) {
            if (isLast(A, i, j)){
                return true;
            } else {
                if (j === A.length - 1) {
                    return solve(A, B, i + 1, 0);
                } else {
                    return solve(A, B, i, j + 1);
                }
            }
        } else {
            let values = B[i][j];
            for (let num in values) {
                A[i][j] = values[num];
                if (!hasBroken(A, i, j)) {
                    if (isLast(A, i, j)) {
                        return true;
                    }
                    let result;
                    if (j === A.length - 1) {
                        result = solve(A, B, i + 1, 0);
                    } else {
                        result = solve(A, B, i, j + 1);
                    }
                    if (result) {
                        return true;
                    }
                }
            }
            A[i][j] = 0;
            return false;
        }
    }

    function isGivenCondition(A, i, j) {
        return A[i][j] !== 0;
    }

    function isLast(A, i, j) {
        return i === A.length - 1 && j === A.length - 1;
    }

    function hasBroken(A, indI, indJ) {
        let inserted = A[indI][indJ];
        for (let k = 0; k < indJ; k++) {
            if (A[indI][k] === inserted) {
                return true;
            }
        }
        for (let k = 0; k < indI; k++) {
            if (A[k][indJ] === inserted) {
                return true;
            }
        }
        let k = Math.floor(indI / 3) * 3 + Math.floor(indJ / 3);
        for (let i = Math.floor(k / 3) * 3; i < Math.floor(k / 3) * 3 + 3; i++) {
            for (let j = (k % 3) * 3; j < (k % 3) * 3 + 3; j++) {
                if (A[i][j] === inserted && indI !== i && indJ !== j) {
                    return true;
                }
            }
        }
        return false;
    }

    function fillTemp(A, B) {
        const len = A.length;
        for (let i = 0; i < len; i++) {
            const notEx = [];
            for (let n = 0; n <= len; n++) {
                if (A[i].indexOf(n) === -1) {
                    notEx.push(n);
                }
            }
            for (let j = 0; j < len; j++) {
                if (A[i][j] === 0) {
                    B[i][j] = notEx;
                }
            }
        }
        for (let j = 0; j < len; j++) {
            const notEx = [];
            for (let n = 1; n <= len; n++) {
                let found = false;
                for (let i = 0; i < len; i++) {
                    if (A[i][j] === n) {
                        found = true;
                    }
                }
                if (!found) {
                    notEx.push(n);
                }
            }
            for (let i = 0; i < len; i++) {
                if (A[i][j] === 0){
                    B[i][j] = B[i][j].filter(value => -1 !== notEx.indexOf(value));
                }
            }
        }
        for (let k = 0; k < len; k++) {
            const notEx = [];
            for (let n = 1; n <= len; n++) {
                let found = false;
                for (let i = Math.floor(k / 3) * 3; i < Math.floor(k / 3) * 3 + 3; i++) {
                    for (let j = (k % 3) * 3; j < (k % 3) * 3 + 3; j++) {
                        if (A[i][j] === n) {
                            found = true;
                        }
                    }
                }
                if (!found) {
                    notEx.push(n);
                }
            }
            for (let i = Math.floor(k / 3) * 3; i < Math.floor(k / 3) * 3 + 3; i++) {
                for (let j = (k % 3) * 3; j < (k % 3) * 3 + 3; j++) {
                    if (A[i][j] === 0) {
                        B[i][j] = B[i][j].filter(value => -1 !== notEx.indexOf(value));
                    }
                }
            }
        }
    }
};

/* *************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
  if (num % 15 === 0) return 'FizzBuzz';
  if (num % 3 === 0) return 'Fizz';
  if (num % 5 === 0) return 'Buzz';
  return num;
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
  if (n === 1) return 1;
  const m = n * getFactorial(n - 1);
  return m;
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
  const n = n2 - n1 + 1;
  const arithmetcSum = (n * (n1 + n2)) / 2;
  return arithmetcSum;
}


/**
 * Returns true, if a triangle can be built with the specified sides a, b, c
 * and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a, b, c) { //  npm test test/07-conditions-n-loops-tests
  if (a <= 0 || b <= 0 || c <= 0) return false;
  if ((a + b <= c) || (a + c <= b) || (b + c <= a)) return false;
  return true;
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
  const rect1Right = rect1.left + rect1.width;
  const rect1Bottom = rect1.top + rect1.height;

  const rect2Right = rect2.left + rect2.width;
  const rect2Bottom = rect2.top + rect2.height;

  const totalWidth = (rect1.left < rect2.left) ? rect2Right - rect1.left : rect1Right - rect2.left;
  const totalHeight = (rect1.top < rect2.top) ? rect2Bottom - rect1.top : rect1Bottom - rect2.top;

  if (totalWidth > rect1.width + rect2.width) return false;
  if (totalHeight > rect1.height + rect2.height) return false;
  return true;
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle({ center: { x: x0, y: y0 }, radius }, point) {
  // circle equation (x - x0)^2 + (y - y0)^2 <= R^2
  if ((point.x - x0) ** 2 + (point.y - y0) ** 2 < radius * radius) return true;
  return false;
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  const strArr = str.split('');
  const unicChars = strArr.find((element, index) => {
    const isUnic = strArr.lastIndexOf(element) === index
    && strArr.indexOf(element) === index;
    return isUnic;
  });
  return unicChars || null; // undefined
}


/**
 * Returns the string representation of math interval,
 * specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  const [c, d] = (b < a) ? [b, a] : [a, b]; // swap the numbers by destructuring
  const leftBrace = (isStartIncluded) ? '[' : '(';
  const rightBrace = (isEndIncluded) ? ']' : ')';
  return `${leftBrace}${c}, ${d}${rightBrace}`;
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
  const digitsArrReversed = `${num}`.split('').reverse();
  return +digitsArrReversed.join('');
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
  // If ccn length is even, mutate even positions in cnn (0, 2, 4...)
  // the control digit is at odd position in this case.
  // Else mutate odd positions (1, 3, 5...)
  const strCCN = `${ccn}`;
  const isLastOddPosition = strCCN.length % 2 === 0;
  const indexMod2 = isLastOddPosition ? 0 : 1;

  const checksum = strCCN.split('').reduce((sum, digit, index) => {
    let current2xDigit = +digit;
    if (index % 2 === indexMod2) {
      current2xDigit = (digit * 2 > 9) ? digit * 2 - 9 : digit * 2;
    }
    const newsum = sum + current2xDigit;
    return newsum;
  }, 0);
  return checksum % 10 === 0;
}

/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  if (num < 10) return num;
  const digits = `${num}`.split('');
  const stepSum = digits.reduce((sum, digit) => sum + (+digit), 0);
  return getDigitalRoot(stepSum);
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  const parens = str.split('');
  const closingParens = [']', ')', '>', '}'];
  const openingParens = ['[', '(', '<', '{'];
  let isBalanced = true;

  const stackOfIncorrectParens = parens.reduce((stackOfParens, paren) => {
    if (openingParens.includes(paren)) stackOfParens.push(paren);
    if (closingParens.includes(paren)) {
      const previousParen = stackOfParens.pop() || '';
      if (closingParens.indexOf(paren) !== openingParens.indexOf(previousParen)) isBalanced = false;
    }
    return stackOfParens;
  }, []);
  return isBalanced && (stackOfIncorrectParens.length < 1);
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n <= 10)
 * representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  return num.toString(n);
}


/**
 * Returns the common directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/verbalizer/logs'] => '/'
 */
function splitWithSavedSplitter(str, splitter = '/') {
  const chars = str.split('');
  const chainsWithSplitters = chars.reduce((chainIn, char, index) => {
    const chains = chainIn;
    if (char === splitter && index === 0) {
      chains[0] = splitter;
      if (chars.length > index + 1) chains.push('');
      return chains;
    }
    if (char === splitter) {
      chains.push(splitter);
      if (index !== chars.length - 1) chains.push('');
    } else {
      chains[chains.length - 1] += char;
    }
    return chains;
  }, ['']);
  return chainsWithSplitters;
}
function comparePaths(path1, path2) { // expect strings
  const directories1 = splitWithSavedSplitter(path1, '/');
  const directories2 = splitWithSavedSplitter(path2, '/');

  const firstUncommon = directories1.findIndex((dir, index) => {
    const isSameIndex = directories2.indexOf(dir, index) !== index;
    return isSameIndex;
  });

  if (firstUncommon < 0) return directories1.join('');
  const commonStr = directories1.slice(0, firstUncommon).join('');
  return commonStr;
}
function getCommonDirectoryPath(paths) { // expect array of strings
  if (paths.length === 1) return paths[0];
  if (paths.length === 2) return comparePaths(...paths);

  let commonStr = comparePaths(paths[0], paths[1]);
  commonStr = comparePaths(commonStr, paths[2]);

  return commonStr;
}


/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
  // m1(mRow x n) * m2(n x kCol) = result (mRow x kCol)
  const mRow = m1.length;
  const kCol = m2[0].length;
  const resultTemplate = new Array(mRow).fill(new Array(kCol).fill(0));

  const result = resultTemplate.map((row, rowIndex) => {
    const newRow = row.map((resultElem, colIndex) => {
      const resultij = m1[rowIndex].reduce((sum, m1Elem, nIndex) => {
        const rowSum = sum + m1Elem * m2[nIndex][colIndex];
        return rowSum;
      }, 0);
      return resultij;
    });
    return newRow;
  });
  return result;
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(positions) {
  const checkLine = (char1, char2, char3) => {
    if (char1 === char2 && char2 === char3) return char1;
    return undefined;
  };
  let winner;
  const diagonalLT = [];
  const diagonalLB = [];
  for (let i = 0; i < positions.length; i += 1) {
    const column = positions.map((row, index) => positions[index][i]);
    const rowWin = checkLine(...positions[i]);
    const colWin = checkLine(...column);
    winner = undefined || rowWin || colWin;
    diagonalLT.push(positions[i][i]);
    diagonalLB.push(positions[positions.length - 1 - i][i]);
    if (winner !== undefined) break;
  }

  return winner || checkLine(...diagonalLB) || checkLine(...diagonalLT);
}


module.exports = {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition,
};

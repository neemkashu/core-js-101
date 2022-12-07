/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) { // npm test test/06-promises-tests
  return new Promise((resolve, reject) => {
    if (typeof isPositiveAnswer !== 'boolean') {
      reject(new Error('Wrong parameter is passed! Ask her again.'));
    } else {
      const answer = (isPositiveAnswer) ? 'Hooray!!! She said "Yes"!' : 'Oh no, she said "No".';
      resolve(answer);
    }
  });
}


/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  return Promise.all(array);
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  return Promise.race(array);
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */
async function chainPromises(array, action) {
  let accumInit;
  let accumFinal;
  // let extraAccum;
  return array[0]
    .then(
      async (value0) => {
        accumInit = value0;
        array.shift();
        accumFinal = await array.reduce(async (accum, promise, index) => {
          // console.log('INDEX IS ', index);
          // console.log('how is accum?', await accum);
          const accumNew = await promise
            .then(
              async (value) => {
                // console.log('INSIDE OF OK: accum, value!', await accum, value);
                const newAccum = action(await accum, value);
                return newAccum;
              },
              async () => {
                // console.log('INSIDE REJECTED accum is', await accum);
                if (index === array.length - 1) {
                  // extraAccum = await accum;
                  // console.log(extraAccum);
                }
                return accum;
              },
            );
          return accumNew;
        }, accumInit);
        return accumFinal;
      },
      async () => {
        array.shift();
        return chainPromises(array, action);
      },
    );
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};

const fnNumberAsync = ideal.toBeNumber((a = 6, b = 8) => {
    return new Promise(resolve => {
        resolve(ideal.toBeNumber(a) + ideal.toBeNumber(b));
    });
}, {
    async: true
});

const fnNumber = ideal.toBeNumber(a => {
    console.log('flubber', a);
    return a;
}, {
    promise: true
});


const num = fnNumberAsync(30, 50);

console.log(num, num instanceof Promise, typeof num === 'function');
num.then(result => {
    console.log(result);
});


const numPromise = new Promise(resolve => {
    setTimeout(() => {
        resolve(5);
    }, 2500);
});

console.log(numPromise);

// const numPromiseResult = fnNumber(numPromise);
// console.log(numPromiseResult);
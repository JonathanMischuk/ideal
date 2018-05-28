const ideal = require('../src');

const fnNumberAsync = ideal.toBeNumberAsync((a, b) => {
    return new Promise(resolve => {
        resolve(ideal.toBeNumber(a) + ideal.toBeNumber(b));
    });
});

const fnNumber = ideal.toBeNumber((a, b) => {
    return ideal.toBeNumber(a) + ideal.toBeNumber(b);
});


const numPromise = fnNumberAsync(30, 50);
const num = fnNumber(35, 65);

numPromise.then(result => {
    console.log(result);
});

console.log(num);
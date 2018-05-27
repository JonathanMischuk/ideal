const fnString = validate.toBeString(function fnString (more) {
    return 'this is a string' + more;
});

const fnNumber = validate.toBeNumber(function (a = 5, b = 6) {
    return validate.toBeNumber(a) + validate.toBeNumber(b);
});

const fnPromise = validate.toBeNumber(function fnPromise () {
    return new Promise(resolve => {
        resolve(5);
    });
}, true);

const result01 = fnString(', plus much, much more!');
const result02 = fnNumber(15, 12);
const result03 = fnPromise();

console.log(result01);
console.log(result02);

result03.then(result => {
    console.log(result);
});
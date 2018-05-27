const fnNumber = validate.toBeNumber(function fnNumber (a = 6, b = 8) {
    return a + b;
});

const num = fnNumber();

console.log(num);
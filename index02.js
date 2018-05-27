const fnNumber = validate.toBeNumber(function (a = 6, b = 8) {
    return validate.toBeNumber(a) + validate.toBeNumber(b);
});

const justNum = validate.toBeNumber(5);

const num = fnNumber(30, 50);

console.log(num);
console.log(justNum);
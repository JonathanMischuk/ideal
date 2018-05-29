module.exports = (name, type, value, error) => {
    error.name = 'TypeError';
    error.message = `Function '${name || "anonymous"}' must return type '${type}', not type '${typeof value}'`;
    throw error.stack;
};

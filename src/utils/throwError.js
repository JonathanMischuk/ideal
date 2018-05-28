module.exports = (type, value, error) => {
    error.name = 'TypeError';
    error.message = `Value ${value} must be of type '${type}', not type '${typeof value}'`;
    throw error.stack;
};

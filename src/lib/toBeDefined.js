const { idealDefineFunction } = require('../core');

module.exports = idealDefineFunction({
    type: 'any',
    condition: value => value !== undefined && value !== null,
    defaultOptions: { contextType: 'normal' }
});

const { idealDefineFunction } = require('../core');

module.exports = idealDefineFunction({
    type: 'string',
    condition: (value, type) => typeof value === type,
    defaultOptions: { contextType: 'normal' }
});

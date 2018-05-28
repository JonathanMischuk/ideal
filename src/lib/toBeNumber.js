const { idealDefineFunction } = require('../core');

module.exports = idealDefineFunction({
    type: 'number',
    condition: (value, type) => typeof value === type,
    defaultOptions: { contextType: 'normal' }
});

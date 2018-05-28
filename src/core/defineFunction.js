const contextTypeMethods = require('../contextTypeMethods');

/**
 * returns function that accepts a function or primitive value to be processed by ideal
 *
 * @param {string} type
 * @param {function} condition
 * @param {object} defaultOptions
 * @returns {function}
 * @private
 */
module.exports = ({ type, condition, defaultOptions }) => {
    /**
     * @param ctx - function or primitive value
     * @param {object} customOptions
     */
    return function (ctx, customOptions) {
        const options = { ...defaultOptions, ...customOptions };

        if (!Object.keys(options).length) options.contextType = 'default';

        return contextTypeMethods[options.contextType](ctx, condition, type, options);
    }
};

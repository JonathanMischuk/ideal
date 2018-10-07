const state = {
    _store: {
        plan: {
            target: {
                dmas: {
                    name: 'California',
                    state: 'California'
                }
            }
        }
    },
    _previousStore: null,

    getState (name) {
        return Object.assign({}, this._recurse(this._splitName(name)));
    },

    update (name, obj) {
        Object.assign(this._recurse(this._splitName(name)), obj)
    },

    _splitName (name) {
        return name.split('.');
    },

    _recurse (arr, context) {
        let obj = context || this._store;

        if (!arr.length) return obj;

        const o = obj[arr[0]];
        arr.shift();
        return this._recurse(arr, o);
    }
};

const dmas = state.getState('plan.target.dmas');

setTimeout(() => {
    dmas.name = 'Son of a bitch';
    state.update('plan.target.dmas', dmas);
    console.log(state.getState('plan'));
}, 5000);

console.log(state.getState('plan'));

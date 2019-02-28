export default {
    namespace: 'home',
    state: {
        name: 'xx',
    },
    reducers: {
        update(state, { payload }) {
            return Object.assign({}, state, {
                name: payload.name,
            });
        },
    },
    effects: {},
};

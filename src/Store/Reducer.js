import initialState from './InitialState';

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'SET_WS':
            return {
                ...state,
                ws: action.payload,
            };
        case 'SET_ACTIVE_PLAYLIST':
            return {
                ...state,
                activePlaylist: action.payload,
            };
        case 'RESET_STATE':
            return {
                ...state,
                user: initialState.user,
            };
        default:
            return state;
    }
};

export default Reducer;

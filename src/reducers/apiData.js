export function apiDataHasErrored(state = false, action) {
    switch (action.type) {
        case 'API_DATA_HAS_ERRORED':
            return action.dataHasErrored;

        default:
            return state;
    }
}

export function apiDataIsLoading(state = false, action) {
    switch (action.type) {
        case 'API_DATA_IS_LOADING':
            return action.dataIsLoading;

        default:
            return state;
    }
}
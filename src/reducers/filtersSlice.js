const initialState = {
    filters: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle'
};

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return { ...state, filters: action.payload, filtersLoadingStatus: 'idle' };
        case 'FILTERS_FETCHING_ERROR':
            return { ...state, filtersLoadingStatus: 'error' };
        case 'FILTER_SELECTED':
            return { ...state, activeFilter: action.payload };
        default:
            return state;
    }
};

export default filters;

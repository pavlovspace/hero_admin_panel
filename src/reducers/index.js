import { combineReducers } from 'redux'
import heroes from './heroesSlice'
import filters from './filtersSlice'

const rootReducer = combineReducers({
    heroes,
    filters,
})

export default rootReducer

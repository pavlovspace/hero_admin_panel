import { useHttp } from '../../hooks/http.hook'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filtersFetched, filtersFetchingError, filterSelected } from '../../actions'


const HeroesFilters = () => {
    const { filters, activeFilter } = useSelector((state) => state.filters)
    const dispatch = useDispatch()
    const { request } = useHttp()


    // FILTERS_FETCHED
    useEffect(() => {
        request('http://localhost:3001/filters')
            .then((filter) => dispatch(filtersFetched(filter)))
            .catch(() => dispatch(filtersFetchingError()))
    }, [])

    const handleFilterClick = (filter) => {
        dispatch(filterSelected(filter))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by element</p>
                <div className="btn-group">
                    {filters.map((filter) => {
                        const btnClass =
                            filter === 'all'
                                ? 'btn-outline-dark'
                                : filter === 'fire'
                                ? 'btn-danger'
                                : filter === 'water'
                                ? 'btn-primary'
                                : filter === 'wind'
                                ? 'btn-success'
                                : filter === 'earth'
                                ? 'btn-secondary'
                                : ''

                        return (
                            <button key={filter} className={`btn ${btnClass} ${activeFilter === filter ? 'active'
                             : ''}`} onClick={() => handleFilterClick(filter)}>
                                {filter}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters

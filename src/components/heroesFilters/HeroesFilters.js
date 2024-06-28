import { useHttp } from '../../hooks/http.hook'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDelete, filtersFetched, filtersFetchingError, filterSelected } from '../../actions'
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active


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
                <p className="card-text">Отфильтруйте героев по элементам</p>
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

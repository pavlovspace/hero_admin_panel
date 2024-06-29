import { useHttp } from '../../hooks/http.hook'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { heroesFetched, heroesFetchingError, heroesDelete } from '../../actions'
import HeroesListItem from '../heroesListItem/HeroesListItem'
import Spinner from '../spinner/Spinner'

const HeroesList = () => {
    const { heroes, heroesLoadingStatus } = useSelector((state) => state.heroes)
    const { activeFilter } = useSelector((state) => state.filters)
    const dispatch = useDispatch()
    const { request } = useHttp()

    useEffect(() => {
        request('http://localhost:3001/heroes')
            .then((data) => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }, [dispatch, request])

    if (heroesLoadingStatus === 'loading') {
        return <Spinner />
    } else if (heroesLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">loading error</h5>
    }

    const filteredHeroes = heroes.filter((hero) => activeFilter === 'all' || hero.element === activeFilter)

    const handleDelete = async (heroId) => {
        try {
            await request(` http://localhost:3001/heroes/${heroId} `, 'DELETE')
            dispatch(heroesDelete(heroId))
            window.location.reload(); 
        } catch (e) {
            console.log(heroesDelete(heroId))
            console.error('Failed to delete hero:', e)
        }
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">No heroes yet</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} {...props} onDelete={() => handleDelete(id)} />
        })
    }

    const elements = renderHeroesList(filteredHeroes)
    return <ul>{elements}</ul>
}

export default HeroesList

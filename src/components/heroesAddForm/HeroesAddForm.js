import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { heroesAdd } from '../../actions'
import { v4 as uuidv4 } from 'uuid'
import { useHttp } from '../../hooks/http.hook'

const HeroesAddForm = () => {
    const { filters } = useSelector((state) => state.filters)
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        element: '',    
    })

    const dispatch = useDispatch()
    const { request } = useHttp()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newHero = {
            id: uuidv4(),
            name: formState.name,
            description: formState.description,
            element: formState.element,
        }

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then((data) => {
                console.log('Successfully added:', data)
                dispatch(heroesAdd(newHero))
            })
            .catch((err) => {
                console.error('Error adding hero:', err)
            })

        // Сбрасываем форму
        setFormState({
            name: '',
            description: '',
            element: '',
        })
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Имя нового героя
                </label>
                <input required type="text" name="name" className="form-control" id="name" placeholder="Как меня зовут?" value={formState.name} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">
                    Описание
                </label>
                <textarea
                    required
                    name="description"
                    className="form-control"
                    id="description"
                    placeholder="Что я умею?"
                    style={{ height: '130px' }}
                    value={formState.description}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                Select hero
                </label>
                <select required className="form-select" id="element" name="element" value={formState.element} onChange={handleInputChange}>
                    <option value="">I own the element...</option>
                    {filters.map((filter) => (
                        <option key={filter} value={filter}>
                            {filter}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
            Create
            </button>
        </form>
    )
}

export default HeroesAddForm

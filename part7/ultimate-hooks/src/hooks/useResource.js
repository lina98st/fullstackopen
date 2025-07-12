import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios.get(baseUrl).then(response => {
            setResources(response.data)
        })
    }, [baseUrl])

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources(resources.concat(response.data))
    }


    const update = async (id, newResource) => {
        const response = await axios.put(`${baseUrl}/${id}`, newResource)
        setResources(resources.map(r => r.id === id ? response.data : r))
    }

    return [
        resources,
        { create, update }
    ]
}

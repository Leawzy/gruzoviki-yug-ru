import axios from 'axios'

const GruzovikiAPI = axios.create({
    baseURL: ''
})

export const getGruzoviki = async() => {
    const response = await GruzovikiAPI.get("")
    return response.data
}

export const addGruzoviki = async() => {
    return await GruzovikiAPI.post('', )
}
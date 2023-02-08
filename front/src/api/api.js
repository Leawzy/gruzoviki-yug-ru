import axios from 'axios'

const GruzovikiAPI = axios.create({
    baseURL: 'http://localhost:3000/card'
})

export const getGruzoviki = async() => {
    const response = await GruzovikiAPI.get("/card")
    return response.data
}

export const addGruzoviki = async() => {
    return await GruzovikiAPI.post('', )
}
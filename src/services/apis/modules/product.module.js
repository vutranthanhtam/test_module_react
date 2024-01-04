import axios from 'axios'
import utils from '@utils'

export default {
    findAll: async function() {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/products`)
    },
    create: async function(data) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/products`, data)
    },
    delete: async function (data) {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/products/${data}`)
    },
}   
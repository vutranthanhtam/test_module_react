import axios from 'axios'
import utils from '@utils'
export default {
    register: async function(user) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users`, user)
    },
    findByEmailOrUserName: async function(loginId) {
        if(utils.validate.isEmail(loginId)) {
            return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/users?email=${loginId}`)
        }else {
            return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/users?userName=${loginId}`)
        }
    },
    update: async function(userId, data) {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/users/${userId}`, {
            ...data,
            updateAt: String(Date.now())
        })
    },
    findReceiptByUserId: async function(userId) {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/receipts?userId=${userId}`)
    },
    createReceipt: async function(newReceipt) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/receipts`, newReceipt)
    },
    addToCart: async function(receiptId, patchData) {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/receipts/${receiptId}`, patchData)
    }
}
const { httpService } = require('./http.service.js')
const Axios = require('axios')
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})


export const userService = {
    checkLogin,
    logout,
    signup,
    getUser
}


function checkLogin(user) {
    return httpService.post(`auth/login`, user)
}

function logout() {
    return httpService.post(`auth/logout`)
}

function signup(user) {
    return httpService.post(`auth/signup`, user)
}

async function getUser(userId) {
    const user = await Axios.get(`${BASE_URL}user/${userId}`)
    return user
}
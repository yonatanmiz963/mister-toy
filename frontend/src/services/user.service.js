const { httpService } = require('./http.service.js')

export const userService = {
    checkLogin,
    logout,
    signup
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
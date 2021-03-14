import { userService } from '../services/user.service.js'

export const userStore = {
    state: {
        currLoggedUser: null
    },
    getters: {
        loggedUser(state) {
            return state.currLoggedUser
        },
        admin(state) {
            if (!state.currLoggedUser) return false
            else return state.currLoggedUser.isAdmin
        }
    },
    mutations: {
        setUser(state, { user }) {
            console.log(user);
            state.currLoggedUser = user
        },
        logout(state) {
            state.currLoggedUser = null
        },
    },
    actions: {
        async login(context, { userToLogin }) {
            try {
                const loggedInUser = await userService.checkLogin(userToLogin)
                console.log('loggedInUser:', loggedInUser)
                context.commit({ type: 'setUser', user: loggedInUser })
                return loggedInUser
            } catch (err) {
                console.log(err);
                throw err
            }
        },
        async logout(context) {
            try {
                await userService.logout()
                context.commit({ type: 'logout' })
            } catch (err) {
                console.log(err);
            }
        },
        async signup(context, { newUser }) {
            try {
                const signedUpUser = await userService.signup(newUser)
                context.commit({ type: 'setUser', user: signedUpUser })
            } catch (err) {
                console.log(err);
            }
        },
    },
}
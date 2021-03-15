import Vue from 'vue'
import Vuex from 'vuex'
import { toyStore } from '../store/toy-store.js'
import { userStore } from '../store/user-store.js'
import { reviewStore } from '../store/review-store.js'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    toyStore,
    userStore,
    reviewStore
    
  },
})

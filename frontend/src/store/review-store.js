import { reviewService } from '../services/review.service.js'

export const reviewStore = {
    state: {
        reviews: null
    },
    getters: {
        reviewsForDisplay(state) {
            return state.reviews
        }
    },
    mutations: {
        setReviews(state, { reviews }) {
            state.reviews = reviews
        }
    },
    actions: {
        async loadReviews({ commit }, { filterBy }) {
            try {
                const reviews = await reviewService.query(filterBy)
                commit({ type: 'setReviews', reviews })
                return reviews
            } catch (err) {
                console.log(err);
                throw err
            }
        },
        async addReview(context, { review }) {
            const reviewdToy = await reviewService.add(review)
            return reviewdToy
        }
    },
}
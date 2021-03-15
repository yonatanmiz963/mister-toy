import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import {userService} from './user.service'

const Axios = require('axios')
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})


export const reviewService = {
  add,
  query,
  remove
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

async function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?searchStr=${filterBy.searchStr}&toyId=${filterBy.toyId}&userId=${filterBy.userId}`
  var queryStr = (!filterBy) ? '' : `?searchStr=${filterBy.searchStr}&toyId=${filterBy.toyId}&userId=${filterBy.userId}`
  // return httpService.get(`review${queryStr}`)

  const res = await Axios.get(`${BASE_URL}review${queryStr}`)
  return res.data
  // return httpService.get(`review`, { params: filterBy } )
  // return storageService.query('review')
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`)
  // return storageService.delete('review', reviewId)

}


async function add(review) {
  console.log('review:', review)
  const addedReview = await httpService.post(`review`, review)

  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = storageService.post('review', review)
  
  return addedReview
}

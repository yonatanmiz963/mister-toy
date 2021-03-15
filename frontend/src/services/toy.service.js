
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// const KEY = 'toysDB';
const Axios = require('axios')
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})
import { httpService } from './http.service.js'


export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptytoy,
    addMsg
}

function addMsg(toyId, msg) {
    return httpService.post(`toy/${toyId}/msg`, msg)
}

// set query params for all filters?
function query(filterBy) {
    return httpService.get('toy', {params: filterBy})
    // return httpService.get('toy', filterBy)
    // return Axios.get(`${BASE_URL}toy/filterBy=${filterBy}`)
    // `${BASE_URL}toy?name=${filterBy.name}&price=${filterBy.price}` // req.query
}

function getById(id) {
    return httpService.get(`toy/${id}`)
}

function remove(id) {
    return httpService.delete(`toy/${id}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post(`toy`, toy)
    }
}

function getEmptytoy() {
    return Promise.resolve({
            "name": '',
            "price": null,
            "type": '',
            "createdAt": null,
            "inStock": true
    })
}

function _createtoys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    if (!toys || !toys.length) {
        toys = [
            _createtoy('Lego'),
            _createtoy('Robots'),
            _createtoy('Racing cars'),
        ]
        localStorage.setItem(KEY, JSON.stringify(toys))
    }
    return toys;
}

function _createtoy(name) {
    return {
        "_id": utilService.makeId(),
        name,
        "price": 123,
        "type": "Funny",
        "createdAt": Date.now(),
        "inStock": true
        }
    }

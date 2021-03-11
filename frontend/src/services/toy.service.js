
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// const KEY = 'toysDB';
const axios = require('axios')

const TOY_URL = (process.env.NODE_ENV !== 'development')
? '/api/toy'
: '//localhost:3000/api/toy';


export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptytoy,
}


function query(filterBy) {
    return axios.get(TOY_URL, { params: filterBy })
    .then(res => res.data)
    // return storageService.query(KEY)
    //     .then(toys => {
    //         if (!toys || !toys.length) return _createtoys()
    //         return toys
    //     })
}

function getById(id) {
    return axios.get(TOY_URL + `/` + id).then(res => res.data)
    // return storageService.get(KEY, id)
}

function remove(id) {
    return axios.delete(TOY_URL + `/` + id).then(res => res.data)
    // return storageService.remove(KEY, id)
}

function save(toy) {
    if (toy._id) {
        return axios.put(TOY_URL + `/` + toy._id, toy).then(res => res.data)
    } else {
        return axios.post(TOY_URL, toy).then(res => res.data)
    }
    // const savedtoy = (toy._id) ? storageService.put(KEY, toy) : storageService.post(KEY, toy)
    // return savedtoy;
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

const gToys = require('../../data/Toy.json')



module.exports = {
    query,
    getById,
    save,
    remove
}

// split to sort and filter funcs and remove pagination



function query(filterBy = { searchStr: '', status: 'All', type: 'All',  sortBy: 'Name' }) {
    var toys = JSON.parse(JSON.stringify(gToys));
    toys = filterToys(toys, filterBy)
    toys = sortToys(toys, filterBy)
    return Promise.resolve(toys);
}

function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function save(toy) {
    if (toy._id) {
        const idx = gToys.findIndex(t => t._id === toy._id)
        if (idx < 0) return Promise.reject('No such Toy', toy._id)
        gToys.splice(idx, 1, toy)
    } else {
        toy.createdAt = Date.now()
        toy._id = _makeId()
        gToys.unshift(toy)
    }
    return _saveToysToFile()
        .then(() => toy)
}

function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = gToys[idx];
    gToys.splice(idx, 1)
    return _saveToysToFile();
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const fs = require('fs')
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}


function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function filterToys(toys, filterBy) {
    if (filterBy.searchStr) {
        const regex = new RegExp(filterBy.searchStr, 'i')
        toys = toys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.status === 'In stock') {
        toys = toys.filter(toy => toy.inStock)
    }
    
    if (filterBy.status === 'Out of stock') {
        toys = toys.filter(toy => !toy.inStock)
    }
    if (filterBy.type !== 'All') {
        toys = toys.filter(toy => toy.type === filterBy.type)
    }
    return toys
}

function sortToys(toys, filterBy) {
    if (filterBy.sortBy === 'Name') {
        toys.sort((toy1, toy2) => {
            if(toy1.name.toLowerCase() < toy2.name.toLowerCase()) { return -1; }
            if(toy1.name.toLowerCase() > toy2.name.toLowerCase()) { return 1; }
            return 0;
        })
    }
    if (filterBy.sortBy === 'Price') {
        toys.sort((toy1, toy2) => {
            return toy2.price - toy1.price
        })
    }
    return toys
}
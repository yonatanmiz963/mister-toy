
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
// const reviewService = require('../review/review.service')

module.exports = {
    query,
    getById,
    getBytoyname,
    remove,
    update,
    add,
    addMsg
    
}


async function addMsg(toyId, msg) {
    try {
        const toy = await getById(toyId)
        msg.id = makeId()
        toy.msgs.push(msg)
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toy._id }, { $set: toy })
        return toy;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    console.log('criteria:', criteria)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function getBytoyname(toyname) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ toyname })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyname}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = { _id: ObjectId(toy._id), name: toy.name, price: toy.price, type: toy.type, inStock: toy.inStock, reviews: toy.reviews }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const toyToAdd = { msgs: [], name: toy.name, price: toy.price, type: toy.type, createdAt: toy.createdAt, inStock: toy.inStock, reviews: [] }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.searchStr) {
        const txtCriteria = { $regex: filterBy.searchStr, $options: 'i' }
        criteria.$or = [
            {
                name: txtCriteria
            }
        ]
    }
    // // if (filterBy.minBalance) {
    // //     criteria.balance = { $gte: filterBy.minBalance }
    // // }
    // if (filterBy.status !== 'All') {
    //     criteria.status = { $gte: filterBy.status }
    // }

    // if (filterBy.type !== 'All') {
    //     toys = toys.filter(toy => toy.type === filterBy.type)
    //     criteria.type = { $gte: filterBy.type }
    // }

    return criteria
}



function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

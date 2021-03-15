const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const filter = buildFilter(filterBy)
        const collection = await dbService.getCollection('review')
        var reviews = await collection.aggregate([
            {
                $match: filter
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup:
                {
                    from: 'toy',
                    localField: 'toyId',
                    foreignField: '_id',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.toy = { _id: review.toy._id, name: review.toy.name, price: review.toy.price }
            review.user = { _id: review.user._id, nickname: review.user.fullname }
            delete review.byUserId
            delete review.toyId
            return review
        })

        console.log('reviews in service:', reviews)
        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { userId, isAdmin } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const query = { _id: ObjectId(reviewId) }
        if (!isAdmin) query.byUserId = ObjectId(userId)
        await collection.deleteOne(query)
        // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        // peek only updatable fields!
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            toyId: ObjectId(review.toyId),
            content: review.content
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd;
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function buildFilter(filterBy) {
    const filter = {}
    if (filterBy.searchStr) {
        filterBy.searchStr = filterBy.searchStr
    }
    if (filterBy.toyId) {
        filter.toyId = ObjectId(filterBy.toyId)
    }
    if (filterBy.userId) {
        filter.byUserId = ObjectId(filterBy.userId)
    }
    return filter
}

module.exports = {
    query,
    remove,
    add
}



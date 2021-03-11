const express = require('express')
const toyService = require('./services/toy.service')


const router = express.Router()


// Get toys list
router.get('/', (req, res) => {
    toyService.query(req.query)
        .then(toys => {
            // console.log('toys:', toys)
            res.json(toys)
        })
})


// Get a single toy by id
router.get('/:toyId', (req, res) => {
    const { toyId } = req.params
    console.log('toyId:', toyId)
    toyService.getById(toyId)
        .then(toy => {
            console.log('toy:', toy)
            res.json(toy)
        })
})


// Add a toy 
router.post('/', (req, res) => {
    // const loggedinUser = req.session.theUser
    // if (!loggedinUser) return res.status(401).send('Please login')

    // const { name, price, type, inStock } = req.body
    // const toy = { name, price, type, inStock }
    toyService.save(req.body)
        .then((savedtoy) => {
            console.log('Added toy:', savedtoy);
            res.json(savedtoy)
        })
})


// Update a toy
router.put('/:toyId', (req, res) => {
    // const { _id, name, price, type, createdAt, inStock } = req.body

    // const loggedinUser = req.session.theUser
    // if (!loggedinUser) return res.status(403).send('Can not edit, not your toy!')

    // const toy = { _id, name, price, type, createdAt, inStock }
    toyService.save(req.body)
        .then((savedtoy) => {
            console.log('Updated toy:', savedtoy);
            res.json(savedtoy)
        })
})


// remove toy by id
router.delete('/:toyId', (req, res) => {
    // const loggedinUser = req.session.theUser
    // if (!loggedinUser) return res.status(401).send('Please login')

    const {toyId} = req.params
    toyService.remove(toyId)
        .then(() => {
            res.json('Deleted...')
        })
        .catch((err) => {
            console.log('Cannot remove toy', err)
            res.status(401).send('Cannot remove toy')
        })
})


module.exports = router
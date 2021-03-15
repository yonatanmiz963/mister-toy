const express = require('express')
const toyService = require('./toy.service')
const logger = require('../../services/logger.service')

const router = express.Router()


module.exports = {
    getToy,
    getToys,
    deleteToy,
    updateToy,
    addToy,
    addMsg
    
}

async function addMsg(req, res) {
    try {
        const toy =  await toyService.addMsg(req.params.toyId, req.body)
        console.log('toy in controller:', toy)
        res.send(toy)
    } catch(err) {
        logger.error('Failed to add msg', err)
        res.status(500).send({ err: 'Failed to add msg' }) 
    }
}


async function getToys(req, res) {
    try {
        console.log(req.query);
        const toys = await toyService.query(req.query)
        res.send(toys)
    } catch (err) {
        logger.error('Failed to get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function getToy(req, res) {
    try {
        const toy = await toyService.getById(req.params.toyId)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}


async function addToy(req, res) {
    try {
        const toy = req.body
        const savedToy = await toyService.add(req.body)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update Toy', err)
        res.status(500).send({ err: 'Failed to update Toy' })
    }
}

async function updateToy(req, res) {
    try {
        const toy = req.body
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update Toy', err)
        res.status(500).send({ err: 'Failed to update Toy' })
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.toyId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

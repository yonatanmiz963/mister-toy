const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addMsg, getToy, addToy, getToys, deleteToy, updateToy} = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/:toyId', getToy)
router.put('/:toyId', requireAdmin, updateToy)
router.post('/', requireAdmin, addToy)
router.delete('/:toyId', requireAdmin, deleteToy)
router.post('/:toyId/msg', requireAuth, addMsg)

module.exports = router